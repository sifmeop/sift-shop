import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { HomeProductsEntity } from './entities/home-products.entity'
import { ProductDetailEntity } from './entities/product-detail.entity'
import { ProductResponseEntity } from './entities/product-response.entity'
import { ProductEntity } from './entities/product.entity'
import { GetProductsInput } from './inputs/get-products.input'

@Injectable()
export class ProductService {
  async getHomeProducts(): Promise<HomeProductsEntity> {
    const bestSellingGroup = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 4
    })

    const productIds = bestSellingGroup.map((i) => i.productId)

    const bestSelling = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    })

    const featured = await prisma.product.findMany({
      where: {
        isFeatured: true
      },
      take: 4
    })

    return { bestSelling, featured }
  }

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

  async getProductDetail(
    slug: string,
    userId?: string
  ): Promise<ProductDetailEntity | null> {
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

    let isPurchased = false

    if (userId) {
      const order = await prisma.order.findFirst({
        where: {
          items: {
            some: {
              productId: product.id
            }
          },
          userId
        }
      })

      isPurchased = !!order
    }

    const reviews = await prisma.review.aggregate({
      where: {
        productId: product.id
      },
      _avg: {
        rating: true
      },
      _count: {
        id: true
      }
    })

    return {
      ...rest,
      category: {
        slug: subcategory.category.slug,
        name: subcategory.category.name
      },
      subcategory: {
        slug: subcategory.slug,
        name: subcategory.name
      },
      isPurchased,
      rating: reviews._avg.rating ?? 0,
      reviewCount: reviews._count.id
    }
  }

  async getRelatedProducts(
    slug: string,
    productId: string
  ): Promise<ProductEntity[]> {
    const products = await prisma.product.findMany({
      where: {
        id: { not: productId },
        subcategory: {
          slug
        },
        stock: { gt: 0 }
      },
      take: 50
    })

    return products.sort(() => Math.random() - 0.5).slice(0, 8)
  }
}
