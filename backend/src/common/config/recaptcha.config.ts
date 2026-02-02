import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'

export const getRecaptchaConfig = (
  configService: ConfigService
): GoogleRecaptchaModuleOptions => ({
  secretKey: configService.getOrThrow<string>('RECAPTCHA_SECRET_KEY'),
  response: (req) => req.headers.recaptcha
})
