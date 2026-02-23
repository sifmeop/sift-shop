import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'
import Stripe from 'stripe'

import { StripeService } from '~/common/libs/stripe/stripe.service'

import { CreateOrderEntity } from './entities/create-order.entity'
import { OrderEntity } from './entities/order.entity'
import { CreateOrderInput } from './inputs/create-order.input'

@Injectable()
export class OrderService {
  constructor(private readonly stripeService: StripeService) {}

  async getOrderBySession(sessionId: string): Promise<OrderEntity> {
    const order = await prisma.order.findFirst({
      where: { sessionId },
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

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name
          },
          unit_amount: item.product.price.mul(100).toNumber()
        },
        quantity: item.quantity
      }))

    const session = await this.stripeService.createCheckoutSession(lineItems)

    if (!session.url) {
      throw new HttpException('Failed to create checkout session', 500)
    }

    await prisma.order.create({
      data: {
        ...input,
        sessionId: session.id,
        userId,
        items: {
          createMany: {
            data: cart.items.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        }
      }
    })

    return { url: session.url }
  }
}
