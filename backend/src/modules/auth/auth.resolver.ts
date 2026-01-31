import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Request } from 'express'

import { AuthGuard } from '~/common/guards/auth.guard'
import { GraphQLContext } from '~/common/types/graphql-context'

import { AuthService } from './auth.service'
import { SignInInput } from './dto/sign-in.input'
import { SignUpInput } from './dto/sign-up.input'
import { AuthEntity } from './entities/auth.entity'
import { LogoutEntity } from './entities/logout.entity'

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthEntity)
  async me() {}

  @Mutation(() => AuthEntity)
  async signUp(@Context('req') req: Request, @Args('body') body: SignUpInput) {
    return await this.authService.signUp(req, body)
  }

  @Mutation(() => AuthEntity)
  async signIn(@Context('req') req: Request, @Args('body') body: SignInInput) {
    return await this.authService.signIn(req, body)
  }

  @Mutation(() => LogoutEntity)
  @UseGuards(AuthGuard)
  async signOut(@Context() ctx: GraphQLContext) {
    return await this.authService.signOut(ctx.req, ctx.res)
  }
}
