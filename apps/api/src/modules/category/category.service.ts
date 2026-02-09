import { Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { CategoryEntity } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor() {}

  async categories(): Promise<CategoryEntity[]> {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true
      }
    })

    return categories
  }
}
