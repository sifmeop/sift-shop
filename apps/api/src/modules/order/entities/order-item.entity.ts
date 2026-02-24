import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { OrderItem } from '@sift-shop/database'
import Decimal from 'decimal.js'

import { OrderItemProductEntity } from './order-item-product.entity'

@ObjectType()
export class OrderItemEntity implements Partial<OrderItem> {
  @Field()
  id: string

  @Field(() => OrderItemProductEntity)
  product: OrderItemProductEntity

  @Field()
  productName: string

  @Field(() => Int)
  quantity: number

  @Field(() => Float)
  price: Decimal

  @Field(() => Float)
  totalPrice: Decimal
}
