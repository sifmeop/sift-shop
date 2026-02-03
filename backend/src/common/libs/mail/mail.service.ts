import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'
import { Resend } from 'resend'

import { EmailConfirmationTemplate } from './templates/email-confirmation.template'
import { ResetPasswordTemplate } from './templates/reset-password.template'

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
      throw new HttpException('Failed to send email', 500)
    }
  }
}
