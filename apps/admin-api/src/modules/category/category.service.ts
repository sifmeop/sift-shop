import { BadRequestException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { CreateCategoryDto } from './dto/create-category.dto'

@Injectable()
export class CategoryService {
  async getCategories() {
    const categories = await prisma.category.findMany({})

    const promise = categories.map(async (category) => {
      const subcategoriesCount = await prisma.subcategory.count({
        where: {
          categoryId: category.id
        }
      })

      const productsCount = await prisma.product.count({
        where: {
          subcategory: {
            categoryId: category.id
          }
        }
      })

      return {
        ...category,
        subcategoriesCount,
        productsCount
      }
    })

    const result = await Promise.all(promise)

    return result
  }

  async getSubcategories(categoryId: string) {
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

  async createCategory(dto: CreateCategoryDto) {
    const category = await prisma.category.findFirst({
      where: {
        OR: [{ name: dto.name }, { slug: dto.slug }]
      }
    })

    if (category) {
      throw new BadRequestException({
        code: 'CATEGORY_ALREADY_EXISTS',
        message: 'Category already exists'
      })
    }

    return await prisma.category.create({
      data: dto
    })
  }

  async updateCategory(id: string, dto: CreateCategoryDto) {
    return await prisma.category.update({
      where: {
        id
      },
      data: dto
    })
  }

  async deleteCategory(id: string) {
    return await prisma.category.delete({
      where: {
        id
      }
    })
  }
}
