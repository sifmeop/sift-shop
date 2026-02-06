import { HttpException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { v4 as uuidv4 } from 'uuid'

import { MailService } from '~/common/libs/mail/mail.service'
import { PrismaService } from '~/common/libs/prisma/prisma.service'
import { Token, TokenType } from '~/generated/prisma/client'
import { UserService } from '~/modules/user/user.service'

import {
  ForgotPasswordInput,
  ResetPasswordInput
} from '../dto/password-recovery.input'
import { SuccessEntity } from '../entities/auth.entity'

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  async forgotPassword(input: ForgotPasswordInput): Promise<SuccessEntity> {
    const user = await this.userService.findByEmail(input.email)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const token = await this.generatePasswordResetToken(input.email)

    await this.mailService.sendResetPasswordLink(user.email, token.token)

    return { success: true }
  }

  async resetPassword(input: ResetPasswordInput): Promise<SuccessEntity> {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: input.token,
        type: TokenType.PASSWORD_RESET
      }
    })

    if (!existingToken) {
      throw new HttpException('Token not found', 404)
    }

    const hasExpired = existingToken.expiresAt < new Date()

    if (hasExpired) {
      throw new HttpException('Token has expired', 400)
    }

    const user = await this.userService.findByEmail(existingToken.email)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const newPassword = await hash(input.password)

    if (user.password === newPassword) {
      throw new HttpException('New password is the same as the old one', 400)
    }

    await Promise.all([
      this.prismaService.token.delete({
        where: {
          id: existingToken.id
        }
      }),
      this.userService.updatePassword(user.id, input.password)
    ])

    return { success: true }
  }

  private async generatePasswordResetToken(email: string): Promise<Token> {
    const token = uuidv4()
    const expiresAt = new Date(Date.now() + 3600 * 1000)

    const passwordResetToken = await this.prismaService.token.upsert({
      where: {
        email_type: {
          email,
          type: TokenType.PASSWORD_RESET
        }
      },
      update: {
        token,
        expiresAt
      },
      create: {
        email,
        token,
        type: TokenType.PASSWORD_RESET,
        expiresAt
      }
    })

    return passwordResetToken
  }
}
