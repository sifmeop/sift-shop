import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import {
  NotificationType,
  Order,
  OrderStatus,
  PaymentMethod,
  Prisma,
  prisma
} from '@sift-shop/database'
import dayjs from 'dayjs'
import Decimal from 'decimal.js'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'

import { PaginationInput } from '~/common/inputs/pagination.input'
import { MailService } from '~/common/libs/mail/mail.service'
import { OrderMailData } from '~/common/libs/mail/templates/order-mail.types'
import { PusherService } from '~/common/libs/pusher'
import { StripeService } from '~/common/libs/stripe/stripe.service'

import { CreateOrderEntity } from './entities/create-order.entity'
import { OrderEntity } from './entities/order.entity'
import { OrdersEntity } from './entities/orders.entity'
import { CreateOrderInput } from './inputs/create-order.input'

@Injectable()
export class OrderService {
  private readonly DELIVERY_PRICE = new Decimal(10)
  private readonly TAX_RATE = new Decimal(0.1)

  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
    private readonly pusherService: PusherService,
    private readonly mailService: MailService
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handlePendingOrders(): Promise<void> {
    const expiryThreshold = dayjs().subtract(30, 'minute').toDate()

    const result = await prisma.order.updateMany({
      where: {
        status: OrderStatus.PENDING,
        createdAt: {
          lte: expiryThreshold
        }
      },
      data: {
        status: OrderStatus.CANCELLED
      }
    })

    if (result.count > 0) {
      Logger.log(`Cancelled ${result.count} orders`)
    }
  }

  async getOrderByPaymentId(paymentId: string): Promise<OrderEntity> {
    const order = await prisma.order.findFirst({
      where: {
        paymentId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!order) {
      throw new HttpException('Order not found', 404)
    }

    return order
  }

  async getOrders(
    userId: string,
    input: PaginationInput
  ): Promise<OrdersEntity> {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        },
        skip: input.skip,
        take: input.take
      }),
      prisma.order.count({
        where: { userId }
      })
    ])

    return {
      orders,
      total
    }
  }

  async create(
    userId: string,
    input: CreateOrderInput
  ): Promise<CreateOrderEntity> {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart) {
      throw new HttpException('Cart not found', 404)
    }

    if (cart.items.length === 0) {
      throw new HttpException('Cart is empty', 400)
    }

    const outOfStockItems = cart.items.filter(
      (item) => item.product.stock < item.quantity
    )

    if (outOfStockItems.length > 0) {
      throw new HttpException('Some items are out of stock', 400)
    }

    const subtotalAmount = cart.items.reduce(
      (acc, item) => acc.add(item.product.price.mul(item.quantity)),
      new Decimal(0)
    )

    const deliveryAmount = subtotalAmount.greaterThanOrEqualTo(100)
      ? new Decimal(0)
      : this.DELIVERY_PRICE

    const discountAmount = cart.items.reduce((acc, item) => {
      if (item.discountedPrice) {
        return acc.add(item.price.sub(item.discountedPrice).mul(item.quantity))
      }
      return acc
    }, new Decimal(0))

    const taxAmount = subtotalAmount
      .add(deliveryAmount)
      .sub(discountAmount)
      .mul(this.TAX_RATE)

    const totalAmount = subtotalAmount
      .add(deliveryAmount)
      .sub(discountAmount)
      .add(taxAmount)

    const orderData: Omit<Prisma.OrderCreateInput, 'paymentId' | 'user'> & {
      userId: string
    } = {
      ...input,
      currency: 'USD',
      taxAmount,
      subtotalAmount,
      deliveryAmount,
      discountAmount,
      totalAmount,
      userId,
      items: {
        createMany: {
          data: cart.items.map((item) => {
            const { id, price, name } = item.product
            return {
              productName: name,
              productId: id,
              quantity: item.quantity,
              price,
              totalPrice: price.mul(item.quantity)
            }
          })
        }
      }
    }

    if (input.method === PaymentMethod.CASH) {
      const [order] = await Promise.all([
        prisma.order.create({
          data: {
            ...orderData,
            paymentId: uuidv4(),
            status: OrderStatus.PROCESSING
          },
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        }),
        prisma.cartItem.deleteMany({
          where: {
            cart: {
              userId
            }
          }
        })
      ])

      const notification = await prisma.notification.create({
        data: {
          data: {
            orderId: order.id,
            orderNumber: String(order.number),
            totalAmount: order.totalAmount
          },
          type: NotificationType.ORDER_PLACED,
          userId
        }
      })

      this.pusherService.trigger(`user-${userId}`, 'notification', notification)
      this.pusherService.trigger(`user-${userId}`, 'order', order)
      await this.sendOrderEmailSafely(
        () =>
          this.mailService.sendCashOrderPlacedEmail(
            order.email,
            this.toOrderMailData(order)
          ),
        `cash order email for order #${order.number}`
      )

      const origin = this.configService.getOrThrow<string>('ORIGIN')

      return { url: `${origin}/checkout/success?payment_id=${order.paymentId}` }
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.product.name },
          unit_amount: item.product.price.mul(100).toNumber()
        },
        quantity: item.quantity
      }))

    if (taxAmount.greaterThan(0)) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tax' },
          unit_amount: taxAmount.mul(100).toNumber()
        },
        quantity: 1
      })
    }

    const shipping: Stripe.Checkout.SessionCreateParams.ShippingOption[] = []
    if (deliveryAmount.greaterThan(0)) {
      shipping.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: deliveryAmount.mul(100).toNumber(),
            currency: 'usd'
          },
          display_name: 'Delivery'
        }
      })
    }

    const session = await this.stripeService.createCheckoutSession(
      lineItems,
      shipping
    )

    if (!session.url) {
      throw new HttpException('Failed to create checkout session', 500)
    }

    const order = await prisma.order.create({
      data: {
        ...orderData,
        paymentId: session.id,
        status: OrderStatus.PENDING
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    this.pusherService.trigger(`user-${userId}`, 'order', order)
    await this.sendOrderEmailSafely(
      () =>
        this.mailService.sendCardOrderPendingEmail(
          order.email,
          this.toOrderMailData(order),
          session.url!
        ),
      `card pending email for order #${order.number}`
    )

    return { url: session.url }
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return await prisma.order.create({ data })
  }

  private toOrderMailData(
    order: Prisma.OrderGetPayload<{
      include: {
        items: true
      }
    }>
  ): OrderMailData {
    return {
      orderNumber: order.number,
      paymentId: order.paymentId,
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      country: order.country,
      city: order.city,
      state: order.state,
      address: order.address,
      zipCode: order.zipCode,
      currency: order.currency,
      subtotalAmount: order.subtotalAmount.toString(),
      discountAmount: order.discountAmount.toString(),
      taxAmount: order.taxAmount.toString(),
      deliveryAmount: order.deliveryAmount.toString(),
      totalAmount: order.totalAmount.toString(),
      items: order.items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.price.toString(),
        totalPrice: item.totalPrice.toString()
      }))
    }
  }

  private async sendOrderEmailSafely(
    send: () => Promise<void>,
    context: string
  ): Promise<void> {
    try {
      await send()
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      Logger.error(`[Mail] Failed to send ${context}: ${message}`)
    }
  }
}
