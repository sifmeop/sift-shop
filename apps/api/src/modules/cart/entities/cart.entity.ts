import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { CartItem, Prisma } from '@sift-shop/database'

import { CartProductItemEntity } from './cart-product-item.entity'

@ObjectType()
export class CartItemEntity implements Partial<CartItem> {
  @Field()
  id: string

  @Field(() => CartProductItemEntity)
  product: CartProductItemEntity

  @Field(() => Int)
  quantity: number

  @Field(() => Float)
  price: Prisma.Decimal

  @Field(() => Float, { nullable: true })
  discountedPrice: Prisma.Decimal | null
}
