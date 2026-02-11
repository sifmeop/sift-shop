import { BadRequestException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { CreateSubcategoryDto } from './dto/create-subcategory.dto'

@Injectable()
export class SubcategoryService {
  async getSubcategories(categoryId?: string) {
    const subcategories = await prisma.subcategory.findMany({
      where: {
        categoryId
      }
    })

    const promise = subcategories.map(async (subcategory) => {
      const productsCount = await prisma.product.count({
        where: {
          subcategory: {
            id: subcategory.id
          }
        }
      })

      return {
        ...subcategory,
        productsCount
      }
    })

    const result = await Promise.all(promise)

    return result
  }

  async createSubcategory(categoryId: string, dto: CreateSubcategoryDto) {
    const subcategory = await prisma.subcategory.findFirst({
      where: {
        OR: [{ name: dto.name }, { slug: dto.slug }]
      }
    })

    if (subcategory) {
      throw new BadRequestException({
        code: 'CATEGORY_ALREADY_EXISTS',
        message: 'Category already exists'
      })
    }

    return await prisma.subcategory.create({
      data: {
        ...dto,
        categoryId
      }
    })
  }

  async updateSubcategory(id: string, dto: CreateSubcategoryDto) {
    return await prisma.subcategory.update({
      where: {
        id
      },
      data: dto
    })
  }

  async deleteSubcategory(id: string) {
    return await prisma.subcategory.delete({
      where: {
        id
      }
    })
  }
}
