import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { CartItem } from '@sift-shop/database'
import Decimal from 'decimal.js'

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
  price: Decimal

  @Field(() => Float, { nullable: true })
  discountedPrice: Decimal | null
}
