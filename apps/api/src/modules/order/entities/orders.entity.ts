import { Field, Int, ObjectType } from '@nestjs/graphql'

import { OrderEntity } from './order.entity'

@ObjectType()
export class OrdersEntity {
  @Field(() => [OrderEntity])
  orders: OrderEntity[]

  @Field(() => Int)
  total: number
}
