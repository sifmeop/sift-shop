import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { GraphQLContext } from '~/common/types/graphql-context'
import { UserService } from '~/modules/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
