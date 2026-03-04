import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  NotificationType,
  OrderStatus,
  Prisma,
  prisma
} from '@sift-shop/database'
import Stripe from 'stripe'

import { MailService } from '../mail/mail.service'
import { OrderMailData } from '../mail/templates/order-mail.types'
import { PusherService } from '../pusher'

@Injectable()
export class StripeService {
  readonly stripe: Stripe

  constructor(
    private configService: ConfigService,
    private readonly pusherService: PusherService,
    private readonly mailService: MailService
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
          where: { paymentId: session.id },
          include: {
            items: true
          }
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
        await this.sendOrderEmailSafely(
          () =>
            this.mailService.sendPaymentSuccessEmail(
              orderUpdate.email,
              this.toOrderMailData({
                ...order,
                status: orderUpdate.status,
                currency: orderUpdate.currency
              })
            ),
          `payment success email for order #${order.number}`
        )

        break
      }
      case 'checkout.session.expired': {
        const session = event.data.object

        const order = await prisma.order.findFirst({
          where: { paymentId: session.id },
          include: {
            items: true
          }
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
        await this.sendOrderEmailSafely(
          () =>
            this.mailService.sendPaymentFailedEmail(
              order.email,
              this.toOrderMailData(order)
            ),
          `payment failed email for order #${order.number}`
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
