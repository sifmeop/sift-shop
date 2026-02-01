import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { User } from '~/generated/prisma/client'
import { PrismaService } from '~/prisma/prisma.service'

import { UserService } from '../user/user.service'

import { SignInInput } from './dto/sign-in.input'
import { SignUpInput } from './dto/sign-up.input'
import { AuthEntity } from './entities/auth.entity'
import { LogoutEntity } from './entities/logout.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly configServe: ConfigService
  ) {}

  async signUp(req: Request, body: SignUpInput) {
    const isExist = await this.userService.findByEmail(body.email)

    if (isExist) {
      throw new HttpException('User already exists', 400)
    }

    const newUser = await this.userService.create(
      body.email,
      body.password,
      body.fullName,
      'CREDENTIALS',
      false
    )

    return this.saveSession(req, newUser)
  }

  async signIn(req: Request, body: SignInInput): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(body.email)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const isValidPassword = await verify(user.password, body.password)

    if (!isValidPassword) {
      throw new HttpException('Invalid password', 401)
    }

    return this.saveSession(req, user)
  }

  async signOut(req: Request, res: Response): Promise<LogoutEntity> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          Logger.error(`Failed to sign out: ${err}`)
          return reject(new HttpException('Failed to sign out', 500))
        }

        res.clearCookie(this.configServe.getOrThrow<string>('SESSION_NAME'))
        resolve({ success: true })
      })
    })
  }

  private async saveSession(req: Request, user: User): Promise<AuthEntity> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save((err) => {
        if (err) {
          Logger.error(`Failed to save session: ${err}`)
          return reject(new HttpException('Failed to save session', 500))
        }

        resolve(user)
      })
    })
  }
}
