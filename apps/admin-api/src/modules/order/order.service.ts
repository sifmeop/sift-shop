import { Injectable } from '@nestjs/common'
import { Order, prisma } from '@sift-shop/database'

@Injectable()
export class OrderService {
  async getOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return orders
  }
}
