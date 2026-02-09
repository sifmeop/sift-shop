import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { ProductResponseEntity } from './entities/product-response.entity'
import { GetProductsInput } from './inputs/get-products.input'

@Injectable()
export class ProductService {
  constructor() {}

  async findAll(input: GetProductsInput): Promise<ProductResponseEntity> {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        slug: input.subcategory
      }
    })

    if (!subcategory) {
      throw new HttpException('Subcategory not found', 404)
    }

    const products = await prisma.product.findMany({
      where: {
        subcategoryId: subcategory.id
      }
    })

    const filters = await prisma.filter.findMany({
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
