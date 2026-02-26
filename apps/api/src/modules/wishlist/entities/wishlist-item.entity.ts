import { Field, ID, ObjectType } from '@nestjs/graphql'
import { WishlistItem } from '@sift-shop/database'

import { WishlistProductEntity } from './wishlist-product.entity'

@ObjectType()
export class WishlistItemEntity implements Partial<WishlistItem> {
  @Field(() => ID)
  id: string

  @Field(() => WishlistProductEntity)
  product: WishlistProductEntity

  @Field(() => Date)
  addedAt: Date
}
