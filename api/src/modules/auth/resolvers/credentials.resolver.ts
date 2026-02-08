import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'

import { GraphQLContext } from '~/common/types/graphql-context'

import { SignInInput } from '../dto/sign-in.input'
import { SignUpInput } from '../dto/sign-up.input'
import { AuthEntity, SuccessEntity } from '../entities/auth.entity'
import { LogoutEntity } from '../entities/logout.entity'
import { AuthGuard } from '../guards/auth.guard'
import { TwoFactorGuard } from '../guards/two-factor.guard'
import { CredentialsService } from '../services/credentials.service'

@Resolver(() => AuthEntity)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Query(() => String)
  async schema(): Promise<void> {}

  @Mutation(() => SuccessEntity)
  // @Recaptcha()
  async signUp(
    @Args('input', { type: () => SignUpInput }) input: SignUpInput
  ): Promise<SuccessEntity> {
    return await this.credentialsService.signUp(input)
  }

  @Mutation(() => AuthEntity)
  @UseGuards(TwoFactorGuard)
  async signIn(
    @Context('req') req: Request,
    @Args('input', { type: () => SignInInput }) input: SignInInput
  ): Promise<AuthEntity> {
    return await this.credentialsService.signIn(req, input)
  }

  @Mutation(() => LogoutEntity)
  @UseGuards(AuthGuard)
  async signOut(@Context() ctx: GraphQLContext): Promise<LogoutEntity> {
    return await this.credentialsService.signOut(ctx.req, ctx.res)
  }
}
