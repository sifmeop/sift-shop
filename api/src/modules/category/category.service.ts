import { Injectable } from '@nestjs/common'

import { PrismaService } from '~/common/libs/prisma/prisma.service'

import { CategoryEntity } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async categories(): Promise<CategoryEntity[]> {
    const categories = await this.prismaService.category.findMany({
      include: {
        subcategories: true
      }
    })

    return categories
  }
}
