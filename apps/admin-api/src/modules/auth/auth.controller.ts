import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { User } from '@sift-shop/database'
import { type Request } from 'express'

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
}
