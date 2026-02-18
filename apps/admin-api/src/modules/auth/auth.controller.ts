import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { User } from '@sift-shop/database'
import { type Request, Response } from 'express'

import { Authorized } from '~/common/decorators/authorized.decorator'
import { Public } from '~/common/decorators/public.decorator'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify-session')
  verifySession(@Authorized() user: User): User {
    return user
  }

  @Public()
  @Post('login')
  async login(@Req() req: Request, @Body() dto: LoginDto): Promise<User> {
    return await this.authService.login(req, dto)
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<boolean> {
    return await this.authService.logout(req, res)
  }
}
