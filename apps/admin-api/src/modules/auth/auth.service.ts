import { HttpException, Injectable } from '@nestjs/common'
import { User } from '@sift-shop/database'
import { verify } from 'argon2'
import { Request } from 'express'

import { UserService } from '../user/user.service'

import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(req: Request, dto: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(dto.email)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const isValidPassword = await verify(user.password, dto.password)

    if (!isValidPassword) {
      throw new HttpException('Invalid password', 400)
    }

    if (!user.isVerified) {
      throw new HttpException('User is not verified', 400)
    }

    return this.saveSession(req, user)
  }

  async saveSession(req: Request, user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save((error) => {
        if (error) {
          return reject(new HttpException('Failed to save session', 500))
        }

        resolve(user)
      })
    })
  }
}
