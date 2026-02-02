import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Recaptcha } from '@nestlab/google-recaptcha'
import { Request } from 'express'

import { AuthGuard } from '~/common/guards/auth.guard'
import { GraphQLContext } from '~/common/types/graphql-context'

import { SignInInput } from './dto/sign-in.input'
import { SignUpInput } from './dto/sign-up.input'
import { AuthEntity, SuccessEntity } from './entities/auth.entity'
import { LogoutEntity } from './entities/logout.entity'
import { CredentialsService } from './services/credentials.service'

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Query(() => AuthEntity)
  async me() {}

  @Mutation(() => SuccessEntity)
  @Recaptcha()
  async signUp(
    @Context('req') req: Request,
    @Args('input') body: SignUpInput
  ): Promise<SuccessEntity> {
    return await this.credentialsService.signUp(req, body)
  }

  @Mutation(() => AuthEntity)
  async signIn(
    @Context('req') req: Request,
    @Args('input') body: SignInInput
  ): Promise<AuthEntity> {
    return await this.credentialsService.signIn(req, body)
  }

  @Mutation(() => LogoutEntity)
  @UseGuards(AuthGuard)
  async signOut(@Context() ctx: GraphQLContext): Promise<LogoutEntity> {
    return await this.credentialsService.signOut(ctx.req, ctx.res)
  }
}
