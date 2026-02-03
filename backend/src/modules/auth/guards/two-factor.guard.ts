import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as speakeasy from 'speakeasy'

import { UserService } from '~/modules/user/user.service'

import { SignInInput } from '../dto/sign-in.input'

@Injectable()
export class TwoFactorGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { input } = ctx.getArgs<{ input: SignInInput }>()

    const user = await this.userService.findByEmail(input.email)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    if (!user.isTwoFactorEnabled || !user.twoFactorSecret) {
      return true
    }

    if (!input.code) {
      throw new HttpException('2FA code is required', 400)
    }

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: input.code,
      window: 1
    })

    if (!isValid) {
      throw new HttpException('Invalid 2FA code', 401)
    }

    return true
  }
}
