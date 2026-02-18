import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Recaptcha } from '@nestlab/google-recaptcha'
import { Request } from 'express'

import { GraphQLContext } from '~/common/types/graphql-context'

import { EmailConfirmationInput } from '../dto/email-confirmation.input'
import { SignInInput } from '../dto/sign-in.input'
import { SignUpInput } from '../dto/sign-up.input'
import { AuthEntity, SuccessEntity } from '../entities/auth.entity'
import { LogoutEntity } from '../entities/logout.entity'
import { AuthGuard } from '../guards/auth.guard'
import { TwoFactorGuard } from '../guards/two-factor.guard'
import { CredentialsService } from '../services/credentials.service'
import { EmailConfirmationService } from '../services/email-confirmation.service'

@Resolver(() => AuthEntity)
export class CredentialsResolver {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Mutation(() => SuccessEntity)
  @Recaptcha()
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

  @Query(() => AuthEntity)
  @UseGuards(AuthGuard)
  verifySession(@Context('req') req: Request): AuthEntity {
    return req.user as AuthEntity
  }

  @Mutation(() => AuthEntity)
  async emailConfirmation(
    @Context('req') req: Request,
    @Args('input', { type: () => EmailConfirmationInput })
    input: EmailConfirmationInput
  ) {
    return await this.emailConfirmationService.emailConfirmation(
      req,
      input.token
    )
  }
}
