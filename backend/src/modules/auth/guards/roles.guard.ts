import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

import { User } from '~/generated/prisma/client'
import { UserRole } from '~/generated/prisma/enums'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass()
    ])

    if (!roles) return true

    const ctx = GqlExecutionContext.create(context)

    const user = ctx.getContext<{ req: Request }>().req.user as User

    if (!user) return false

    if (!roles.includes(user.role)) {
      throw new HttpException('Forbidden', 403)
    }

    return true
  }
}
