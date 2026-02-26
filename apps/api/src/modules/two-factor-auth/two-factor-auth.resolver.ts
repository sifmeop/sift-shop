import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'

import { TwoFactorSetupOutputEntity } from './entities/two-factor-setup-output.entity'
import { TwoFactorAuthService } from './two-factor-auth.service'

@Resolver()
export class TwoFactorAuthResolver {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @Query(() => TwoFactorSetupOutputEntity)
  async generateTwoFactorSecret(
    @Authorized('id') userId: string,
    @Authorized('email') email: string
  ): Promise<TwoFactorSetupOutputEntity> {
    return this.twoFactorAuthService.generateTwoFactorSecret(userId, email)
  }

  @Mutation(() => Boolean)
  async enableTwoFactorAuth(
    @Authorized('id') userId: string,
    @Args('code', { type: () => String }) code: string
  ): Promise<boolean> {
    return this.twoFactorAuthService.enableTwoFactorAuth(userId, code)
  }

  @Mutation(() => Boolean)
  async disableTwoFactorAuth(
    @Authorized('id') userId: string,
    @Args('code', { type: () => String }) code: string
  ): Promise<boolean> {
    return this.twoFactorAuthService.disableTwoFactorAuth(userId, code)
  }
}
