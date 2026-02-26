import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { verify } from 'otplib'

import { TwoFactorAuthService } from '~/modules/two-factor-auth/two-factor-auth.service'
import { UserService } from '~/modules/user/user.service'

import { SignInInput } from '../dto/sign-in.input'

@Injectable()
export class TwoFactorGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly twoFactorAuthService: TwoFactorAuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { input } = ctx.getArgs<{ input: SignInInput }>()

    const user = await this.userService.findByEmail(input.email)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    if (!user.isVerified || !user.isTwoFactorEnabled || !user.twoFactorSecret) {
      return true
    }

    if (!input.code) {
      throw new GraphQLError('2FA code is required', {
        extensions: {
          code: 'TWO_FACTOR_REQUIRED'
        }
      })
    }

    const decryptedSecret = this.twoFactorAuthService.decryptSecret(
      user.twoFactorSecret
    )

    const { valid } = await verify({
      secret: decryptedSecret,
      token: input.code
    })

    if (!valid) {
      throw new HttpException('Invalid 2FA code', 401)
    }

    return true
  }
}
