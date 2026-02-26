import { HttpException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NotificationType, prisma } from '@sift-shop/database'
import crypto from 'node:crypto'
import { generateSecret, generateURI, verify } from 'otplib'

import { PusherService } from '~/common/libs/pusher'

import { UserService } from '../user/user.service'

import { TwoFactorSetupOutputEntity } from './entities/two-factor-setup-output.entity'

@Injectable()
export class TwoFactorAuthService {
  private readonly algorithm = 'aes-256-ctr'
  private readonly key: string

  constructor(
    readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly pusherService: PusherService
  ) {
    const secretKey = this.configService.getOrThrow<string>('TWO_FA_SECRET_KEY')

    this.key = crypto
      .createHash('sha512')
      .update(secretKey)
      .digest('hex')
      .substring(0, 32)
  }

  async generateTwoFactorSecret(
    userId: string,
    email: string
  ): Promise<TwoFactorSetupOutputEntity> {
    const secret = generateSecret()
    const otpAuthUrl = generateURI({
      issuer: 'Sift-Shop',
      label: email,
      secret
    })

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        twoFactorSecret: this.encryptSecret(secret)
      }
    })

    return { secret, otpAuthUrl }
  }

  async enableTwoFactorAuth(userId: string, code: string): Promise<boolean> {
    const user = await this.userService.findById(userId)

    if (!user.twoFactorSecret) {
      throw new HttpException('Secret not generated', 400)
    }

    const secret = this.decryptSecret(user.twoFactorSecret)
    const { valid } = await verify({ secret, token: code })

    if (!valid) {
      throw new HttpException('Invalid code', 400)
    }

    const [, notification] = await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: { isTwoFactorEnabled: true }
      }),
      prisma.notification.create({
        data: {
          type: NotificationType.TWO_FACTOR_ENABLED,
          userId
        }
      })
    ])

    this.pusherService.trigger(`user-${userId}`, 'notification', notification)

    return true
  }

  async disableTwoFactorAuth(userId: string, code: string): Promise<boolean> {
    const user = await this.userService.findById(userId)

    if (!user.twoFactorSecret) {
      throw new HttpException('Secret not generated', 400)
    }

    const secret = this.decryptSecret(user.twoFactorSecret)
    const { valid } = await verify({ secret, token: code })

    if (!valid) {
      throw new HttpException('Invalid code', 400)
    }

    const [, notification] = await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: { isTwoFactorEnabled: false, twoFactorSecret: null }
      }),
      prisma.notification.create({
        data: {
          type: NotificationType.TWO_FACTOR_DISABLED,
          userId
        }
      })
    ])

    this.pusherService.trigger(`user-${userId}`, 'notification', notification)

    return true
  }

  encryptSecret(secret: string) {
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      iv
    )

    let encrypted = cipher.update(secret, 'utf-8', 'hex')
    encrypted += cipher.final('hex')

    return iv.toString('hex') + encrypted
  }

  decryptSecret(payload: string) {
    const inputIV = payload.slice(0, 32)
    const encrypted = payload.slice(32)
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.key),
      Buffer.from(inputIV, 'hex')
    )

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')
    return decrypted
  }
}
