import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'

import { getRecaptchaConfig } from '~/common/config/recaptcha.config'

import { AuthController } from './auth.controller'
import { CredentialsResolver } from './resolvers/credentials.resolver'
import { PasswordRecoveryResolver } from './resolvers/password-recovery.resolver'
import { CredentialsService } from './services/credentials.service'
import { EmailConfirmationService } from './services/email-confirmation.service'
import { OAuthService } from './services/oauth.service'
import { PasswordRecoveryService } from './services/password-recovery.service'
import { SessionsService } from './services/sessions.service'
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
    CredentialsResolver,
    PasswordRecoveryResolver,
    CredentialsService,
    OAuthService,
    EmailConfirmationService,
    PasswordRecoveryService,
    SessionsService,
    GoogleStrategy
  ]
})
export class AuthModule {}
