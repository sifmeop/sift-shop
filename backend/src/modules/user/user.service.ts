import { HttpException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { AuthMethod } from '~/generated/prisma/enums'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        accounts: true
      }
    })

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        accounts: true
      }
    })

    return user
  }

  async create(
    email: string,
    password: string,
    fullName: string,
    method: AuthMethod,
    isVerified: boolean
  ) {
    const hashedPassword = method === 'CREDENTIALS' ? await hash(password) : ''

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        method,
        isVerified
      }
    })

    return user
  }
}
