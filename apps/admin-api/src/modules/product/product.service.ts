import { HttpException, Injectable } from '@nestjs/common'
import { prisma, Product } from '@sift-shop/database'
import { v4 as uuidv4 } from 'uuid'

import { optimizationImage } from '~/common/utils/optimizationImage'
import { S3Service } from '~/infrastructure/s3/s3.service'

import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductService {
  constructor(private readonly s3Service: S3Service) {}

  async getProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({})

    return products
  }

  async createProduct(
    files: Express.MulterFile[],
    dto: CreateProductDto
  ): Promise<void> {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        slug: dto.subcategorySlug
      }
    })

    if (!subcategory) {
      throw new HttpException('Subcategory not found', 404)
    }

    const existingProduct = await prisma.product.findFirst({
      where: {
        slug: dto.slug
      }
    })

    if (existingProduct) {
      throw new HttpException('Product already exists', 400)
    }

    const images = await Promise.all(
      files.map(async (file) => {
        const optimizedBuffer = await optimizationImage(file)

        const image = await this.s3Service.uploadFile(
          optimizedBuffer,
          'product'
        )

        return image
      })
    )

    const sku = uuidv4().split('-')[0].toUpperCase()

    try {
      await prisma.product.create({
        data: {
          slug: dto.slug,
          name: dto.name,
          sku,
          description: dto.description,
          stock: dto.stock,
          price: dto.price,
          images,
          specifications: dto.specifications,
          filterValues: {
            createMany: {
              data: dto.filterValues.map((filterOptionId) => ({
                filterOptionId
              }))
            }
          },
          subcategoryId: subcategory.id
        }
      })
    } catch (error) {
      console.debug('error', error)
    }

    const priceFilter = await prisma.filter.findFirst({
      where: { subcategoryId: subcategory.id, slug: 'price' },
      include: { options: true }
    })

    let resolvedFilter = priceFilter

    if (!resolvedFilter) {
      resolvedFilter = await prisma.filter.create({
        data: {
          name: 'Price',
          slug: 'price',
          subcategoryId: subcategory.id,
          options: {
            createMany: {
              data: [
                { label: '0', value: '0', position: 1 },
                { label: '1', value: '1', position: 2 }
              ]
            }
          }
        },
        include: { options: true }
      })
    }

    const maxPriceOption = resolvedFilter.options.find((o) => o.position === 2)

    if (maxPriceOption && +maxPriceOption.value < +dto.price) {
      await prisma.filterOption.update({
        where: { id: maxPriceOption.id },
        data: { label: dto.price, value: dto.price }
      })
    }
  }

  async deleteProduct(id: string) {
    await prisma.product.delete({
      where: {
        id
      }
    })
  }
}
