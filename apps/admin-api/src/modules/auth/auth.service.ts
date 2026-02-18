import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from '@sift-shop/database'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { UserService } from '../user/user.service'

import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async login(req: Request, dto: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(dto.email)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const isValidPassword = await verify(user.password, dto.password)

    if (!isValidPassword) {
      throw new HttpException('Invalid password', 400)
    }

    if (!user.isVerified) {
      throw new HttpException('User is not verified', 400)
    }

    return this.saveSession(req, user)
  }

  async logout(req: Request, res: Response): Promise<boolean> {
    return new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          Logger.error(`Failed to sign out: ${error}`)
          return reject(new HttpException('Failed to sign out', 500))
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))
        resolve(true)
      })
    })
  }

  async saveSession(req: Request, user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save((error) => {
        if (error) {
          return reject(new HttpException('Failed to save session', 500))
        }

        resolve(user)
      })
    })
  }
}
