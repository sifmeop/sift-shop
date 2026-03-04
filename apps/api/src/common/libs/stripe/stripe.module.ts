import { Global, Module } from '@nestjs/common'

import { MailModule } from '../mail/mail.module'

import { StripeController } from './stripe.controller'
import { StripeResolver } from './stripe.resolver'
import { StripeService } from './stripe.service'

@Global()
@Module({
  imports: [MailModule],
  controllers: [StripeController],
  providers: [StripeResolver, StripeService],
  exports: [StripeService]
})
export class StripeModule {}
