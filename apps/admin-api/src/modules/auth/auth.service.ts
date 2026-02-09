import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
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
      throw new UnauthorizedException({
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      })
    }

    const isValidPassword = await verify(user.password, dto.password)

    if (!isValidPassword) {
      throw new UnauthorizedException({
        code: 'INVALID_PASSWORD',
        message: 'Invalid password'
      })
    }

    if (!user.isVerified) {
      throw new UnauthorizedException({
        code: 'USER_NOT_VERIFIED',
        message: 'User is not verified'
      })
    }

    return this.saveSession(req, user)
  }

  async saveSession(req: Request, user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException({
              code: 'SESSION_SAVE_FAILED',
              message: 'Failed to save session'
            })
          )
        }

        resolve(user)
      })
    })
  }
}
