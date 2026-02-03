import { HttpException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { User } from '~/generated/prisma/client'
import { AuthMethod } from '~/generated/prisma/enums'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
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
  ): Promise<User> {
    const hashedPassword = method === 'CREDENTIALS' ? await hash(password) : ''

    const user = await this.prismaService.user.create({
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

  async updatePassword(id: string, password: string): Promise<User> {
    const hashedPassword = await hash(password)

    const user = await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        password: hashedPassword
      }
    })

    return user
  }
}
