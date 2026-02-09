import { Injectable, UnauthorizedException } from '@nestjs/common'
import { prisma, User } from '@sift-shop/database'

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
      throw new UnauthorizedException({
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      })
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
}
