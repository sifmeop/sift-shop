import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { OAuthService } from './services/oauth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly oAuthService: OAuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async google(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    await this.oAuthService.googleCallback(req, res)
  }
}
