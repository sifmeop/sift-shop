import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ThrottlerGuard } from '@nestjs/throttler'

import { GraphQLContext } from '../types/graphql-context'

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext): GraphQLContext {
    const gqlCtx = GqlExecutionContext.create(context)
    const { req, res } = gqlCtx.getContext<GraphQLContext>()
    return { req, res }
  }
}
