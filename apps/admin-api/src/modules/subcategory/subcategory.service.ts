import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { optimizationImage } from '~/common/utils/optimizationImage'
import { S3Service } from '~/infrastructure/s3/s3.service'

import { CreateSubcategoryDto } from './dto/create-subcategory.dto'

@Injectable()
export class SubcategoryService {
  constructor(private readonly s3Service: S3Service) {}

  async getSubcategories(slug: string) {
    const category = await prisma.category.findUnique({
      where: {
        slug
      }
    })

    if (!category) {
      throw new HttpException('Category not found', 404)
    }

    const subcategories = await prisma.subcategory.findMany({
      where: {
        categoryId: category.id
      },
      include: {
        _count: {
          select: {
            filters: true
          }
        }
      }
    })

    const promise = subcategories.map(async ({ _count, ...subcategory }) => {
      const productsCount = await prisma.product.count({
        where: {
          subcategory: {
            id: subcategory.id
          }
        }
      })

      return {
        ...subcategory,
        filtersCount: _count.filters,
        productsCount
      }
    })

    const result = await Promise.all(promise)

    return result
  }

  async createSubcategory(
    slug: string,
    file: Express.MulterFile,
    dto: CreateSubcategoryDto
  ) {
    const category = await prisma.category.findFirst({
      where: {
        slug
      }
    })

    if (!category) {
      throw new HttpException('Category not found', 404)
    }

    const subcategory = await prisma.subcategory.findFirst({
      where: {
        OR: [{ name: dto.name }, { slug: dto.slug }]
      }
    })

    if (subcategory) {
      throw new HttpException('Subcategory already exists', 400)
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
        categoryId: category.id,
        filters: {
          create: {
            name: 'Price',
            slug: 'price',
            position: 1,
            options: {
              create: [
                { label: '0', value: '0', position: 1 },
                { label: '1', value: '1', position: 2 }
              ]
            }
          }
        }
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
      throw new HttpException('Subcategory not found', 404)
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

  async updateSubcategoryStatus(id: string) {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        id
      }
    })

    if (!subcategory) {
      throw new HttpException('Subcategory not found', 404)
    }

    return await prisma.subcategory.update({
      where: {
        id
      },
      data: {
        isActive: !subcategory.isActive
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
      throw new HttpException('Subcategory not found', 404)
    }

    void this.s3Service.deleteFile(subcategory.image)

    return await prisma.subcategory.delete({
      where: {
        id: subcategory.id
      }
    })
  }
}
