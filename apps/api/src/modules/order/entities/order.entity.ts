import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Order, OrderStatus, PaymentMethod } from '@sift-shop/database'
import Decimal from 'decimal.js'

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
  country: string

  @Field()
  city: string

  @Field(() => String, { nullable: true })
  state: string | null

  @Field()
  address: string

  @Field()
  zipCode: string

  @Field(() => Float)
  subtotalAmount: Decimal

  @Field(() => Float)
  discountAmount: Decimal

  @Field(() => Float)
  taxAmount: Decimal

  @Field(() => Float)
  deliveryAmount: Decimal

  @Field(() => Float)
  totalAmount: Decimal

  @Field()
  currency: string

  @Field(() => [OrderItemEntity])
  items: OrderItemEntity[]

  @Field(() => Date)
  createdAt: Date
}
