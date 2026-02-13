import { BadRequestException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { optimizationImage } from '~/common/utils/optimizationImage'
import { S3Service } from '~/infrastructure/s3/s3.service'

import { CreateSubcategoryDto } from './dto/create-subcategory.dto'

@Injectable()
export class SubcategoryService {
  constructor(private readonly s3Service: S3Service) {}

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

  async createSubcategory(
    categoryId: string,
    file: Express.MulterFile,
    dto: CreateSubcategoryDto
  ) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId
      }
    })

    if (!category) {
      throw new BadRequestException({
        code: 'CATEGORY_NOT_FOUND',
        message: 'Category not found'
      })
    }

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

    const optimizedBuffer = await optimizationImage(file)

    const image = await this.s3Service.uploadFile(
      optimizedBuffer,
      'subcategory'
    )

    return await prisma.subcategory.create({
      data: {
        ...dto,
        image,
        categoryId: category.id
      }
    })
  }

  async updateSubcategory(
    id: string,
    dto: CreateSubcategoryDto,
    file?: Express.MulterFile
  ) {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        id
      }
    })

    if (!subcategory) {
      throw new BadRequestException({
        code: 'SUBCATEGORY_NOT_FOUND',
        message: 'Subcategory not found'
      })
    }

    let image = subcategory.image

    if (file) {
      image = await this.s3Service.updateFile(subcategory.image, file)
    }

    return await prisma.subcategory.update({
      where: {
        id
      },
      data: {
        ...dto,
        image
      }
    })
  }

  async deleteSubcategory(id: string) {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        id
      }
    })

    if (!subcategory) {
      throw new BadRequestException({
        code: 'SUBCATEGORY_NOT_FOUND',
        message: 'Subcategory not found'
      })
    }

    void this.s3Service.deleteFile(subcategory.image)

    return await prisma.subcategory.delete({
      where: {
        id: subcategory.id
      }
    })
  }
}
