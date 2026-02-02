import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'

import { getRecaptchaConfig } from '~/common/config/recaptcha.config'

import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { CredentialsService } from './services/credentials.service'
import { EmailConfirmationService } from './services/email-confirmation.service'
import { OAuthService } from './services/oauth.service'
import { GoogleStrategy } from './strategies/google.strategy'

@Module({
  imports: [
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getRecaptchaConfig,
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthResolver,
    CredentialsService,
    OAuthService,
    EmailConfirmationService,
    GoogleStrategy
  ]
})
export class AuthModule {}
