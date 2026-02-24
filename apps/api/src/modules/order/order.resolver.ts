import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'
import { Public } from '~/common/decorators/public.decorator'

import { CreateOrderEntity } from './entities/create-order.entity'
import { OrderEntity } from './entities/order.entity'
import { CreateOrderInput } from './inputs/create-order.input'
import { GetOrderByPaymentIdInput } from './inputs/get-order-by-session.input'
import { OrderService } from './order.service'

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Query(() => OrderEntity)
  async getOrderByPaymentId(
    @Args('input', { type: () => GetOrderByPaymentIdInput })
    input: GetOrderByPaymentIdInput
  ): Promise<OrderEntity> {
    return await this.orderService.getOrderByPaymentId(input.id)
  }

  @Mutation(() => CreateOrderEntity)
  async create(
    @Authorized('id') userId: string,
    @Args('input', { type: () => CreateOrderInput })
    input: CreateOrderInput
  ): Promise<CreateOrderEntity> {
    return await this.orderService.create(userId, input)
  }
}
