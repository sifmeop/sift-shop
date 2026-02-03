import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'

export const getRecaptchaConfig = (
  configService: ConfigService
): GoogleRecaptchaModuleOptions => ({
  secretKey: configService.getOrThrow<string>('RECAPTCHA_SECRET_KEY'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  response: (req) => req.headers.recaptcha
})
