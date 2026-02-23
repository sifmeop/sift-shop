import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { UserService } from '~/modules/user/user.service'

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { GraphQLContext } from '../types/graphql-context'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext<GraphQLContext>()

    const userId = req.session?.userId

    if (!userId) {
      throw new HttpException('Unauthorized', 401)
    }

    const user = await this.userService.findById(userId)

    req.user = user

    return true
  }
}
