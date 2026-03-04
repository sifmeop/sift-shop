import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler'

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

  protected async handleRequest(
    requestProps: ThrottlerRequest
  ): Promise<boolean> {
    const { context } = requestProps
    const { res } = this.getRequestResponse(context)

    if (!res) return true

    return super.handleRequest(requestProps)
  }
}
