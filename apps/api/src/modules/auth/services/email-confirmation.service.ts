import { HttpException, Injectable } from '@nestjs/common'
import { prisma, Token, TokenType } from '@sift-shop/database'
import { Request } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { MailService } from '~/common/libs/mail/mail.service'
import { UserService } from '~/modules/user/user.service'

import { AuthEntity } from '../entities/auth.entity'

import { SessionsService } from './sessions.service'

@Injectable()
export class EmailConfirmationService {
  private readonly EXPIRATION_TIME = 3600

  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly sessionService: SessionsService
  ) {}

  async emailConfirmation(req: Request, token: string): Promise<AuthEntity> {
    const existingToken = await prisma.token.findUnique({
      where: {
        token,
        type: TokenType.VERIFICATION
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

    await Promise.all([
      prisma.token.delete({
        where: {
          id: existingToken.id
        }
      }),
      prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          isVerified: true
        }
      })
    ])

    return this.sessionService.saveSession(req, user)
  }

  async sendConfirmationLink(email: string): Promise<void> {
    const token = await this.createVerificationToken(email)

    await this.mailService.sendConfirmationLink(token.email, token.token)
  }

  private async createVerificationToken(email: string): Promise<Token> {
    const token = uuidv4()
    const expiresAt = new Date(Date.now() + this.EXPIRATION_TIME * 1000)

    const verificationToken = await prisma.token.upsert({
      where: {
        email_type: {
          email,
          type: TokenType.VERIFICATION
        }
      },
      update: {
        token,
        expiresAt
      },
      create: {
        email,
        token,
        type: TokenType.VERIFICATION,
        expiresAt
      }
    })

    return verificationToken
  }
}
