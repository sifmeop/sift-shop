import { HttpException, Injectable } from '@nestjs/common'
import { Request } from 'express'

import { User } from '~/generated/prisma/client'

import { AuthEntity } from '../entities/auth.entity'

@Injectable()
export class SessionsService {
  async saveSession(req: Request, user: User): Promise<AuthEntity> {
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
