import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { MailService } from '~/common/libs/mail/mail.service'
import { User } from '~/generated/prisma/client'
import { TokenType } from '~/generated/prisma/enums'
import { UserService } from '~/modules/user/user.service'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class EmailConfirmationService {
  private readonly EXPIRATION_TIME = 3600

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService
  ) {}

  async sendConfirmationLink(user: User) {}

  private async createVerificationToken(email: string) {
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
  }
}
