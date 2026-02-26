import { Global, Module } from '@nestjs/common'

import { TwoFactorAuthResolver } from './two-factor-auth.resolver'
import { TwoFactorAuthService } from './two-factor-auth.service'

@Global()
@Module({
  providers: [TwoFactorAuthResolver, TwoFactorAuthService],
  exports: [TwoFactorAuthService]
})
export class TwoFactorAuthModule {}
