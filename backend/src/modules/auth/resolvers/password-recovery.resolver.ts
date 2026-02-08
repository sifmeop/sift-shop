import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import {
  ForgotPasswordInput,
  ResetPasswordInput
} from '../dto/password-recovery.input'
import { SuccessEntity } from '../entities/auth.entity'
import { PasswordRecoveryService } from '../services/password-recovery.service'

@Resolver(() => SuccessEntity)
export class PasswordRecoveryResolver {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService
  ) {}

  @Query(() => String)
  async schema(): Promise<void> {}

  @Mutation(() => SuccessEntity)
  // @Recaptcha()
  async forgotPassword(
    @Args('input', { type: () => ForgotPasswordInput })
    input: ForgotPasswordInput
  ): Promise<SuccessEntity> {
    return await this.passwordRecoveryService.forgotPassword(input)
  }

  @Mutation(() => SuccessEntity)
  async resetPassword(
    @Args('input', { type: () => ResetPasswordInput }) input: ResetPasswordInput
  ): Promise<SuccessEntity> {
    return await this.passwordRecoveryService.resetPassword(input)
  }
}
