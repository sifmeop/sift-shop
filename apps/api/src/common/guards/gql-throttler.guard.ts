import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ThrottlerGuard } from '@nestjs/throttler'

import { GraphQLContext } from '../types/graphql-context'

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext): GraphQLContext {
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext<GraphQLContext>()

    if (!ctx?.req) {
      const http = context.switchToHttp()
      return { req: http.getRequest(), res: http.getResponse() }
    }

    return { req: ctx.req, res: ctx.res }
  }
}
