import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { OrderItem, Prisma } from '@sift-shop/database'

import { OrderItemProductEntity } from './order-item-product.entity'

@ObjectType()
export class OrderItemEntity implements Partial<OrderItem> {
  @Field()
  id: string

  @Field(() => OrderItemProductEntity)
  product: OrderItemProductEntity

  @Field(() => Int)
  quantity: number

  @Field(() => Float)
  price: Prisma.Decimal
}
