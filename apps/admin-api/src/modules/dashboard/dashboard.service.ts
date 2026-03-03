import { Injectable } from '@nestjs/common'
import { OrderStatus, UserRole, prisma } from '@sift-shop/database'

type DashboardSummary = {
  customersCount: number
  productsCount: number
  categoriesCount: number
  ordersCount: number
  reviewsCount: number
  pendingOrdersCount: number
  lowStockProductsCount: number
  outOfStockProductsCount: number
  totalRevenue: number
  paidRevenue: number
}

type DashboardOrderStatus = {
  status: OrderStatus
  count: number
}

type DashboardRecentOrder = {
  id: string
  number: number
  status: OrderStatus
  totalAmount: string
  currency: string
  createdAt: Date
  customer: {
    id: string
    fullName: string
    email: string
  }
}

type DashboardRecentCustomer = {
  id: string
  fullName: string
  email: string
  avatar: string | null
  isVerified: boolean
  createdAt: Date
}

type DashboardRecentReview = {
  id: string
  rating: number
  comment: string | null
  createdAt: Date
  product: {
    id: string
    name: string
    slug: string
  }
  customer: {
    id: string
    fullName: string
    email: string
  }
}

type DashboardTopProduct = {
  productId: string
  name: string
  slug: string
  totalSold: number
  totalRevenue: number
}

type DashboardResponse = {
  summary: DashboardSummary
  orderStatus: DashboardOrderStatus[]
  recentOrders: DashboardRecentOrder[]
  recentCustomers: DashboardRecentCustomer[]
  recentReviews: DashboardRecentReview[]
  topProducts: DashboardTopProduct[]
}

function toNumber(value: { toString(): string } | number | string | null): number {
  if (value === null) {
    return 0
  }

  return Number(value)
}

@Injectable()
export class DashboardService {
  async getDashboard(): Promise<DashboardResponse> {
    const [
      customersCount,
      productsCount,
      categoriesCount,
      ordersCount,
      reviewsCount,
      pendingOrdersCount,
      lowStockProductsCount,
      outOfStockProductsCount,
      totalRevenueAggregate,
      paidRevenueAggregate,
      orderStatusRaw,
      recentOrdersRaw,
      recentCustomers,
      recentReviews,
      topProductsRaw
    ] = await Promise.all([
      prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.review.count(),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.product.count({ where: { stock: { gt: 0, lte: 5 } } }),
      prisma.product.count({ where: { stock: 0 } }),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
      prisma.order.aggregate({
        where: {
          status: {
            in: [OrderStatus.PAID, OrderStatus.PROCESSING]
          }
        },
        _sum: { totalAmount: true }
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: { _all: true },
        orderBy: { _count: { status: 'desc' } }
      }),
      prisma.order.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          number: true,
          status: true,
          totalAmount: true,
          currency: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true
            }
          }
        }
      }),
      prisma.user.findMany({
        where: { role: UserRole.CUSTOMER },
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
          isVerified: true,
          createdAt: true
        }
      }),
      prisma.review.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          user: {
            select: {
              id: true,
              fullName: true,
              email: true
            }
          }
        }
      }),
      prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: {
          quantity: true,
          totalPrice: true
        },
        orderBy: {
          _sum: {
            quantity: 'desc'
          }
        },
        take: 5
      })
    ])

    const productIds = topProductsRaw.map((item) => item.productId)
    const products = productIds.length
      ? await prisma.product.findMany({
          where: {
            id: {
              in: productIds
            }
          },
          select: {
            id: true,
            name: true,
            slug: true
          }
        })
      : []

    const productsMap = new Map(products.map((product) => [product.id, product]))

    const topProducts: DashboardTopProduct[] = topProductsRaw
      .map((item) => {
        const product = productsMap.get(item.productId)

        if (!product) {
          return null
        }

        return {
          productId: item.productId,
          name: product.name,
          slug: product.slug,
          totalSold: item._sum.quantity ?? 0,
          totalRevenue: toNumber(item._sum.totalPrice)
        }
      })
      .filter((item): item is DashboardTopProduct => item !== null)

    return {
      summary: {
        customersCount,
        productsCount,
        categoriesCount,
        ordersCount,
        reviewsCount,
        pendingOrdersCount,
        lowStockProductsCount,
        outOfStockProductsCount,
        totalRevenue: toNumber(totalRevenueAggregate._sum.totalAmount),
        paidRevenue: toNumber(paidRevenueAggregate._sum.totalAmount)
      },
      orderStatus: orderStatusRaw.map((item) => ({
        status: item.status,
        count: item._count._all
      })),
      recentOrders: recentOrdersRaw.map((order) => ({
        id: order.id,
        number: order.number,
        status: order.status,
        totalAmount: order.totalAmount.toString(),
        currency: order.currency,
        createdAt: order.createdAt,
        customer: {
          id: order.user.id,
          fullName: order.user.fullName,
          email: order.user.email
        }
      })),
      recentCustomers,
      recentReviews: recentReviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        product: review.product,
        customer: {
          id: review.user.id,
          fullName: review.user.fullName,
          email: review.user.email
        }
      })),
      topProducts
    }
  }
}
