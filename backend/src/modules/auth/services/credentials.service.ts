import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { AuthMethod, User } from '~/generated/prisma/client'
import { UserService } from '~/modules/user/user.service'
import { PrismaService } from '~/prisma/prisma.service'

import { SignInInput } from '../dto/sign-in.input'
import { SignUpInput } from '../dto/sign-up.input'
import { AuthEntity, SuccessEntity } from '../entities/auth.entity'
import { LogoutEntity } from '../entities/logout.entity'

import { EmailConfirmationService } from './email-confirmation.service'

@Injectable()
export class CredentialsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly configService: ConfigService
  ) {}

  async signUp(req: Request, body: SignUpInput): Promise<SuccessEntity> {
    const isExist = await this.userService.findByEmail(body.email)

    if (isExist) {
      throw new HttpException('User already exists', 400)
    }

    const newUser = await this.userService.create(
      body.email,
      body.password,
      body.fullName,
      AuthMethod.CREDENTIALS,
      false
    )

    await this.emailConfirmationService.sendConfirmationLink(newUser)

    return { success: true }
  }

  async signIn(req: Request, body: SignInInput): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(body.email)

    if (!user) {
      throw new HttpException('User not found', 404, {
        cause: 'USER_NOT_FOUND'
      })
    }

    const isValidPassword = await verify(user.password, body.password)

    if (!isValidPassword) {
      throw new HttpException('Invalid password', 401, {
        cause: 'INVALID_PASSWORD'
      })
    }

    return this.saveSession(req, user)
  }

  async signOut(req: Request, res: Response): Promise<LogoutEntity> {
    return new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          Logger.error(`Failed to sign out: ${error}`)
          return reject(new HttpException('Failed to sign out', 500))
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))
        resolve({ success: true })
      })
    })
  }

  private async saveSession(req: Request, user: User): Promise<AuthEntity> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save((error) => {
        if (error) {
          Logger.error(`Failed to save session: ${error}`)
          return reject(new HttpException('Failed to save session', 500))
        }

        resolve(user)
      })
    })
  }
}
