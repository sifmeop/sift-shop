import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { ProductResponseEntity } from './entities/product-response.entity'
import { GetProductsInput } from './inputs/get-products.input'

@Injectable()
export class ProductService {
  constructor() {}

  async findAll(
    input: GetProductsInput,
    filterParams?: Record<string, string | string[]>
  ): Promise<ProductResponseEntity> {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        slug: input.subcategory,
        isActive: true
      }
    })

    if (!subcategory) {
      throw new HttpException('Subcategory not found', 404)
    }

    const { price, ...restFilters } = filterParams ?? {}
    const [minPrice, maxPrice] =
      price && typeof price === 'string' ? price.split('-').map(Number) : []

    const filterEntries = Object.entries(restFilters)

    const products = await prisma.product.findMany({
      where: {
        subcategoryId: subcategory.id,
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice ? { gte: minPrice } : {}),
                ...(maxPrice ? { lte: maxPrice } : {})
              }
            }
          : {}),
        AND: filterEntries.map(([filterSlug, optionValues]) => ({
          filterValues: {
            some: {
              filterOption: {
                value: {
                  in: Array.isArray(optionValues)
                    ? optionValues
                    : [optionValues]
                },
                filter: { slug: filterSlug }
              }
            }
          }
        }))
      }
    })

    const filters = await prisma.filter.findMany({
      where: {
        subcategoryId: subcategory.id,
        isActive: true
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
