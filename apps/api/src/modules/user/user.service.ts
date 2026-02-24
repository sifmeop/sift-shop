import { HttpException, Injectable } from '@nestjs/common'
import { AuthMethod, prisma, User } from '@sift-shop/database'
import { hash } from 'argon2'

import { AccountDetailsEntity } from './entities/account-details.entity'
import { UpdateAccountDetailsInput } from './inputs/update-account-details.input'

@Injectable()
export class UserService {
  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        accountDetails: true
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
        accountDetails: true
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
        isVerified,
        cart: {
          create: {}
        }
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

  async updateAccountDetails(
    userId: string,
    input: UpdateAccountDetailsInput
  ): Promise<AccountDetailsEntity> {
    return await prisma.accountDetail.upsert({
      where: {
        userId
      },
      update: input,
      create: {
        ...input,
        userId
      }
    })
  }
}
