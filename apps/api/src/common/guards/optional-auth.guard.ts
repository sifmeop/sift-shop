import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { prisma } from '@sift-shop/database'

import { GraphQLContext } from '../types/graphql-context'

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext<GraphQLContext>()

    const userId = req.session?.userId

    if (!userId) return true

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (user) req.user = user

    return true
  }
}
