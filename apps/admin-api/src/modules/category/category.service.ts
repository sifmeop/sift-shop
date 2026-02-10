import { Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

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
        isActive: true,
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
        isActive: true,
        productsCount
      }
    })

    const result = await Promise.all(promise)

    return result
  }
}
