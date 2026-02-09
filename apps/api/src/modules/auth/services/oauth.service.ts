import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class OAuthService {
  constructor() {}

  async googleCallback(req: Request, res: Response): Promise<void> {
    console.debug('user', req.user)
  }
}
