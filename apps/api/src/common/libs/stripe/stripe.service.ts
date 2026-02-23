import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OrderStatus, prisma } from '@sift-shop/database'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  readonly stripe: Stripe

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.getOrThrow<string>('STRIPE_SECRET_KEY')
    )
  }

  async createCheckoutSession(
    items: Stripe.Checkout.SessionCreateParams.LineItem[]
  ): Promise<Stripe.Checkout.Session> {
    const origin = this.configService.getOrThrow<string>('ORIGIN')

    return this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
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

        const order = await prisma.order.update({
          where: { sessionId: session.id },
          data: { status: OrderStatus.PAID }
        })

        await prisma.cartItem.deleteMany({
          where: {
            cart: {
              userId: order.userId
            }
          }
        })

        break
      }
      case 'checkout.session.expired': {
        const session = event.data.object

        await prisma.order.update({
          where: { sessionId: session.id },
          data: { status: OrderStatus.CANCELLED }
        })

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
