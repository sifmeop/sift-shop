import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'
import { Resend } from 'resend'

import { EmailConfirmationTemplate } from './templates/email-confirmation.template'
import { OrderCardPendingTemplate } from './templates/order-card-pending.template'
import { OrderCashPlacedTemplate } from './templates/order-cash-placed.template'
import { OrderMailData } from './templates/order-mail.types'
import { OrderPaymentFailedTemplate } from './templates/order-payment-failed.template'
import { OrderPaymentSuccessTemplate } from './templates/order-payment-success.template'
import { ResetPasswordTemplate } from './templates/reset-password.template'
import { TwoFactorDisabledTemplate } from './templates/two-factor-disabled.template'
import { TwoFactorEnabledTemplate } from './templates/two-factor-enabled.template'

@Injectable()
export class MailService {
  private readonly resend: Resend

  constructor(readonly configService: ConfigService) {
    this.resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_API_KEY')
    )
  }

  async sendConfirmationLink(email: string, token: string): Promise<void> {
    const domain = this.configService.getOrThrow<string>('ORIGIN')
    const html = await render(EmailConfirmationTemplate({ domain, token }))

    await this.sendMail(email, 'Confirm your email', html)
  }

  async sendResetPasswordLink(email: string, token: string): Promise<void> {
    const domain = this.configService.getOrThrow<string>('ORIGIN')
    const html = await render(ResetPasswordTemplate({ domain, token }))

    await this.sendMail(email, 'Reset your password', html)
  }

  async sendCashOrderPlacedEmail(
    email: string,
    order: OrderMailData
  ): Promise<void> {
    const html = await render(
      OrderCashPlacedTemplate({
        order,
        ordersUrl: this.getOrdersUrl()
      })
    )

    await this.sendMail(email, `Order #${order.orderNumber} placed`, html)
  }

  async sendCardOrderPendingEmail(
    email: string,
    order: OrderMailData,
    paymentUrl: string
  ): Promise<void> {
    const html = await render(
      OrderCardPendingTemplate({
        order,
        paymentUrl,
        ordersUrl: this.getOrdersUrl()
      })
    )

    await this.sendMail(
      email,
      `Payment pending for order #${order.orderNumber}`,
      html
    )
  }

  async sendPaymentSuccessEmail(
    email: string,
    order: OrderMailData
  ): Promise<void> {
    const html = await render(
      OrderPaymentSuccessTemplate({
        order,
        ordersUrl: this.getOrdersUrl()
      })
    )

    await this.sendMail(
      email,
      `Payment successful for order #${order.orderNumber}`,
      html
    )
  }

  async sendPaymentFailedEmail(
    email: string,
    order: OrderMailData
  ): Promise<void> {
    const html = await render(
      OrderPaymentFailedTemplate({
        order,
        ordersUrl: this.getOrdersUrl()
      })
    )

    await this.sendMail(
      email,
      `Payment failed for order #${order.orderNumber}`,
      html
    )
  }

  async sendTwoFactorEnabledEmail(email: string): Promise<void> {
    const html = await render(
      TwoFactorEnabledTemplate({
        securityUrl: this.getSecurityUrl()
      })
    )

    await this.sendMail(email, 'Two-factor authentication enabled', html)
  }

  async sendTwoFactorDisabledEmail(email: string): Promise<void> {
    const html = await render(
      TwoFactorDisabledTemplate({
        securityUrl: this.getSecurityUrl(),
        signInUrl: this.getSignInUrl()
      })
    )

    await this.sendMail(email, 'Two-factor authentication disabled', html)
  }

  private getOrdersUrl(): string {
    const domain = this.configService.getOrThrow<string>('ORIGIN')
    return `${domain}/profile/orders`
  }

  private getSecurityUrl(): string {
    const domain = this.configService.getOrThrow<string>('ORIGIN')
    return `${domain}/profile/two-factor-auth`
  }

  private getSignInUrl(): string {
    const domain = this.configService.getOrThrow<string>('ORIGIN')
    return `${domain}/auth/sign-in`
  }

  private async sendMail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: 'Sift-Shop@sift-shop.xyz',
      to: [to],
      subject,
      html
    })

    if (error) {
      Logger.error(
        `[Mail] Failed to send email: ${error.name}: ${error.message}`
      )
      throw new HttpException('Failed to send email', 500)
    }
  }
}
