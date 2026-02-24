import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  Order,
  OrderStatus,
  PaymentMethod,
  Prisma,
  prisma
} from '@sift-shop/database'
import Decimal from 'decimal.js'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'

import { StripeService } from '~/common/libs/stripe/stripe.service'

import { CreateOrderEntity } from './entities/create-order.entity'
import { OrderEntity } from './entities/order.entity'
import { CreateOrderInput } from './inputs/create-order.input'

@Injectable()
export class OrderService {
  private readonly DELIVERY_PRICE = new Decimal(10)
  private readonly TAX_RATE = new Decimal(0.1)

  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService
  ) {}

  async getOrderByPaymentId(paymentId: string): Promise<OrderEntity> {
    const order = await prisma.order.findFirst({
      where: { paymentId },
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

  async getOrder(id: string): Promise<OrderEntity> {
    const order = await prisma.order.findUnique({
      where: { id },
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

  async getOrders(userId: string): Promise<OrderEntity[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return orders
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
        return acc.add(item.discountedPrice.mul(item.quantity))
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

    const orderData = {
      ...input,
      userId,
      currency: 'USD',
      taxAmount,
      subtotalAmount,
      deliveryAmount,
      discountAmount,
      totalAmount,
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
      const order = await prisma.order.create({
        data: {
          ...orderData,
          paymentId: uuidv4(),
          status: OrderStatus.AWAITING_PAYMENT
        }
      })

      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId
          }
        }
      })

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

    await prisma.order.create({
      data: {
        ...orderData,
        paymentId: session.id,
        status: OrderStatus.PENDING
      }
    })

    return { url: session.url }
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return await prisma.order.create({ data })
  }
}
