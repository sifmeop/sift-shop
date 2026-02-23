import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Order, OrderStatus, PaymentMethod } from '@sift-shop/database'

import { OrderItemEntity } from './order-item.entity'

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Order status'
})

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
  description: 'Payment method'
})

@ObjectType()
export class OrderEntity implements Partial<Order> {
  @Field()
  id: string

  @Field(() => OrderStatus)
  status: OrderStatus

  @Field(() => PaymentMethod)
  method: PaymentMethod

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  phone: string

  @Field()
  city: string

  @Field()
  country: string

  @Field(() => String, { nullable: true })
  state: string | null

  @Field()
  zipCode: string

  @Field(() => [OrderItemEntity])
  items: OrderItemEntity[]

  @Field(() => Date)
  createdAt: Date
}
