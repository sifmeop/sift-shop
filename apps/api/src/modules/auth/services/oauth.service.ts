import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthMethod } from '@sift-shop/database'
import { Request, Response } from 'express'

import { UserService } from '~/modules/user/user.service'

import { SessionsService } from './sessions.service'

@Injectable()
export class OAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionsService,
    private readonly configService: ConfigService
  ) {}

  async googleCallback(req: Request, res: Response): Promise<void> {
    const body = req.user as { email: string; name: string }

    let user = await this.userService.findByEmail(body.email)

    if (!user) {
      user = await this.userService.create(
        body.email,
        '',
        body.name,
        AuthMethod.GOOGLE,
        true
      )
    }

    await this.sessionService.saveSession(req, user)

    res.redirect(this.configService.getOrThrow<string>('ORIGIN') + '/')
  }
}
