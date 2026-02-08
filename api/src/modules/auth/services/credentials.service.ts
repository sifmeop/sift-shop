import { HttpException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { PrismaService } from '~/common/libs/prisma/prisma.service'
import { AuthMethod } from '~/generated/prisma/client'
import { UserService } from '~/modules/user/user.service'

import { SignInInput } from '../dto/sign-in.input'
import { SignUpInput } from '../dto/sign-up.input'
import { AuthEntity, SuccessEntity } from '../entities/auth.entity'
import { LogoutEntity } from '../entities/logout.entity'

import { EmailConfirmationService } from './email-confirmation.service'
import { SessionsService } from './sessions.service'

@Injectable()
export class CredentialsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly configService: ConfigService,
    private readonly sessionService: SessionsService
  ) {}

  async signUp(input: SignUpInput): Promise<SuccessEntity> {
    const isExist = await this.userService.findByEmail(input.email)

    if (isExist) {
      throw new HttpException('User already exists', 400)
    }

    const newUser = await this.userService.create(
      input.email,
      input.password,
      input.fullName,
      AuthMethod.CREDENTIALS,
      false
    )

    await this.emailConfirmationService.sendConfirmationLink(newUser.email)

    return { success: true }
  }

  async signIn(req: Request, input: SignInInput): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(input.email)

    if (!user) {
      throw new HttpException('User not found', 404, {
        cause: 'USER_NOT_FOUND'
      })
    }

    const isValidPassword = await verify(user.password, input.password)

    if (!isValidPassword) {
      throw new HttpException('Invalid password', 401, {
        cause: 'INVALID_PASSWORD'
      })
    }

    if (!user.isVerified) {
      await this.emailConfirmationService.sendConfirmationLink(user.email)

      throw new HttpException('User is not verified', 401, {
        cause: 'USER_NOT_VERIFIED'
      })
    }

    return this.sessionService.saveSession(req, user)
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
}
