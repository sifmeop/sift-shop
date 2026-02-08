import { HttpException, Injectable } from '@nestjs/common'

import { PrismaService } from '~/common/libs/prisma/prisma.service'

import { ProductResponseEntity } from './entities/product-response.entity'
import { GetProductsInput } from './inputs/get-products.input'

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(input: GetProductsInput): Promise<ProductResponseEntity> {
    const subcategory = await this.prismaService.subcategory.findUnique({
      where: {
        slug: input.subcategory
      }
    })

    if (!subcategory) {
      throw new HttpException('Subcategory not found', 404)
    }

    const products = await this.prismaService.product.findMany({
      where: {
        subcategoryId: subcategory.id
      }
    })

    const filters = await this.prismaService.filter.findMany({
      where: {
        subcategoryId: subcategory.id
      },
      include: {
        options: {
          orderBy: {
            position: 'asc'
          }
        }
      },
      orderBy: {
        position: 'asc'
      }
    })

    const productsResponse = products
    const filtersResponse = filters

    return { products: productsResponse, filters: filtersResponse }
  }

  async findOne() {}
}
