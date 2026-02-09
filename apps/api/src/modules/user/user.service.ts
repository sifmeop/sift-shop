import { HttpException, Injectable } from '@nestjs/common'
import { prisma, User } from '@sift-shop/database'
import { AuthMethod } from '@sift-shop/database'
import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor() {}

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
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
    const user = await prisma.user.findUnique({
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

    const user = await prisma.user.create({
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

    const user = await prisma.user.update({
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
