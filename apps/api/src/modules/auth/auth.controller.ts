import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { Public } from '~/common/decorators/public.decorator'

import { OAuthService } from './services/oauth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly oAuthService: OAuthService) {}

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async google(): Promise<void> {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    await this.oAuthService.googleCallback(req, res)
  }
}
