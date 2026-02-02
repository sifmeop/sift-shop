import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

import { isDev } from '../utils/is-dev'

export const getMailerConfig = (
  configService: ConfigService
): MailerOptions => ({
  transport: {
    host: configService.getOrThrow<string>('MAIL_HOST'),
    port: configService.getOrThrow<number>('MAIL_PORT'),
    secure: !isDev(configService),
    auth: {
      user: configService.getOrThrow<string>('MAIL_USER'),
      password: configService.getOrThrow<string>('MAIL_PASSWORD')
    }
  },
  defaults: {
    from: `"Sift-Shop" <${configService.getOrThrow<string>('MAIL_USER')}>`
  }
})
