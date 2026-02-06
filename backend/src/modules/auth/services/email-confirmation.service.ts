import { HttpException, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { MailService } from '~/common/libs/mail/mail.service'
import { PrismaService } from '~/common/libs/prisma/prisma.service'
import { Token } from '~/generated/prisma/client'
import { TokenType } from '~/generated/prisma/enums'
import { UserService } from '~/modules/user/user.service'

import { EmailConfirmationDto } from '../dto/email-confirmation.dto'

import { SessionsService } from './sessions.service'

@Injectable()
export class EmailConfirmationService {
  private readonly EXPIRATION_TIME = 3600

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly sessionService: SessionsService
  ) {}

  async emailConfirmation(req: Request, body: EmailConfirmationDto) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: body.token,
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
      this.prismaService.token.delete({
        where: {
          id: existingToken.id
        }
      }),
      this.prismaService.user.update({
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

    const verificationToken = await this.prismaService.token.upsert({
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
