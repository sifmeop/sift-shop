import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { ProductDetailEntity } from './entities/product-detail.entity'
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

  async getProductDetail(slug: string): Promise<ProductDetailEntity | null> {
    const product = await prisma.product.findUnique({
      where: {
        slug
      },
      include: {
        subcategory: {
          include: {
            category: true
          }
        }
      }
    })

    if (!product) {
      return null
    }

    const { subcategory, ...rest } = product

    return {
      ...rest,
      category: {
        slug: subcategory.category.slug,
        name: subcategory.category.name
      },
      subcategory: {
        slug: subcategory.slug,
        name: subcategory.name
      }
    }
  }
}
