import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NotificationType, OrderStatus, prisma } from '@sift-shop/database'
import Stripe from 'stripe'

import { PusherService } from '../pusher'

@Injectable()
export class StripeService {
  readonly stripe: Stripe

  constructor(
    private configService: ConfigService,
    private readonly pusherService: PusherService
  ) {
    const secretKey = this.configService.getOrThrow<string>('STRIPE_SECRET_KEY')
    this.stripe = new Stripe(secretKey)
  }

  async createCheckoutSession(
    items: Stripe.Checkout.SessionCreateParams.LineItem[],
    shipping: Stripe.Checkout.SessionCreateParams.ShippingOption[]
  ): Promise<Stripe.Checkout.Session> {
    const origin = this.configService.getOrThrow<string>('ORIGIN')

    return this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items,
      currency: 'usd',
      locale: 'en',
      payment_method_types: ['card'],
      success_url: `${origin}/checkout/success?payment_id={CHECKOUT_SESSION_ID}`,
      shipping_options: shipping
    })
  }

  async processWebhookEvent(rawBody: Buffer, signature: string): Promise<void> {
    let event: Stripe.Event

    try {
      event = this.constructWebhookEvent(rawBody, signature)
    } catch {
      throw new HttpException(`Webhook signature verification failed`, 400)
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        if (session.payment_status !== 'paid') break

        const order = await prisma.order.findFirst({
          where: { paymentId: session.id }
        })

        if (!order) break

        const userId = order.userId

        const [orderUpdate] = await Promise.all([
          prisma.order.update({
            where: {
              id: order.id
            },
            data: {
              status: OrderStatus.PAID,
              currency: session.currency?.toUpperCase()
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
              orderId: orderUpdate.id,
              orderNumber: String(orderUpdate.number),
              totalAmount: orderUpdate.totalAmount
            },
            type: NotificationType.ORDER_PLACED,
            userId
          }
        })

        this.pusherService.trigger(
          `user-${userId}`,
          'notification',
          notification
        )

        break
      }
      case 'checkout.session.expired': {
        const session = event.data.object

        const order = await prisma.order.findFirst({
          where: { paymentId: session.id }
        })

        if (!order) break

        await prisma.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.CANCELLED }
        })

        const userId = order.userId

        const notification = await prisma.notification.create({
          data: {
            data: {
              orderId: order.id,
              orderNumber: String(order.number),
              totalAmount: order.totalAmount
            },
            type: NotificationType.ORDER_CANCELLED,
            userId
          }
        })

        this.pusherService.trigger(
          `user-${userId}`,
          'notification',
          notification
        )

        break
      }
    }
  }

  constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET')
    )
  }
}
