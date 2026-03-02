import { Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { SearchEntity } from './entities/search.entity'

@Injectable()
export class SearchService {
  async search(q: string): Promise<SearchEntity[]> {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive'
        }
      }
    })
  }
}
