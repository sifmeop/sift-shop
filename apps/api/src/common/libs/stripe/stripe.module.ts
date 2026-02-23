import { Global, Module } from '@nestjs/common'

import { StripeController } from './stripe.controller'
import { StripeResolver } from './stripe.resolver'
import { StripeService } from './stripe.service'

@Global()
@Module({
  controllers: [StripeController],
  providers: [StripeResolver, StripeService],
  exports: [StripeService]
})
export class StripeModule {}
