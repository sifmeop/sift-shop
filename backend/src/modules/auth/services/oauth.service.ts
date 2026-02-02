import { Injectable } from '@nestjs/common'

import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class OAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async googleCallback(req: Request, res: Response): Promise<void> {
    console.debug('user', req.user)
  }
}
