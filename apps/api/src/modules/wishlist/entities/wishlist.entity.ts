import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Wishlist } from '@sift-shop/database'

import { WishlistItemEntity } from './wishlist-item.entity'

@ObjectType()
export class WishlistEntity implements Partial<Wishlist> {
  @Field(() => ID)
  id: string

  @Field(() => [WishlistItemEntity])
  items: WishlistItemEntity[]
}
