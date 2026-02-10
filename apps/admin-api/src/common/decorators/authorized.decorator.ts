import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@sift-shop/database'
import { Request } from 'express'

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>()

    return data ? req.user?.[data] : req.user
  }
)
