import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { prisma, UserRole } from '@sift-shop/database'
import { Request } from 'express'

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()

    const userId = request.session.userId

    if (!userId) {
      return false
    }

    const user = await prisma.user.findUnique({
      where: {
        id: request.session.userId
      }
    })

    if (!user || user.role !== UserRole.ADMIN) {
      return false
    }

    request.user = user

    return true
  }
}
