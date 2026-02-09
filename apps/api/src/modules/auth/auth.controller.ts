import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { EmailConfirmationDto } from './dto/email-confirmation.dto'
import { EmailConfirmationService } from './services/email-confirmation.service'
import { OAuthService } from './services/oauth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly oAuthService: OAuthService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

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

  @Post('email-confirmation')
  async emailConfirmation(
    @Req() req: Request,
    @Body() body: EmailConfirmationDto
  ): Promise<void> {
    await this.emailConfirmationService.emailConfirmation(req, body)
  }
}
