import { Controller, Get } from '@nestjs/common'
import { Order } from '@sift-shop/database'

import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(): Promise<Order[]> {
    return this.orderService.getOrders()
  }
}
