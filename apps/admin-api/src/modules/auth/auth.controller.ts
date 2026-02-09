import { Body, Controller, Post, Req } from '@nestjs/common'
import { User } from '@sift-shop/database'
import { type Request } from 'express'

import { Public } from '~/common/decorators/public.decorator'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Req() req: Request, @Body() dto: LoginDto): Promise<User> {
    return await this.authService.login(req, dto)
  }
}
