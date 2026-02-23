import {
  Controller,
  Headers,
  HttpCode,
  Post,
  RawBodyRequest,
  Req
} from '@nestjs/common'

import { Public } from '~/common/decorators/public.decorator'

import { StripeService } from './stripe.service'

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Public()
  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string
  ): Promise<void> {
    if (!req.rawBody) {
      return
    }

    await this.stripeService.processWebhookEvent(req.rawBody, signature)
  }
}
