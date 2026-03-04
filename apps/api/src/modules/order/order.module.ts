import { Module } from '@nestjs/common'

import { MailModule } from '~/common/libs/mail/mail.module'

import { OrderResolver } from './order.resolver'
import { OrderService } from './order.service'

@Module({
  imports: [MailModule],
  providers: [OrderResolver, OrderService]
})
export class OrderModule {}
