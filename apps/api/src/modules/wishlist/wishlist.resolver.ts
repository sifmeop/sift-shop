import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'

import { WishlistItemEntity } from './entities/wishlist-item.entity'
import { WishlistEntity } from './entities/wishlist.entity'
import { WishlistService } from './wishlist.service'

@Resolver(() => WishlistEntity)
export class WishlistResolver {
  constructor(private readonly wishlistService: WishlistService) {}

  @Query(() => WishlistEntity, { name: 'wishlist' })
  async getWishlist(@Authorized('id') userId: string): Promise<WishlistEntity> {
    return this.wishlistService.getWishlist(userId)
  }

  @Mutation(() => WishlistItemEntity)
  async addToWishlist(
    @Authorized('id') userId: string,
    @Args('productId', { type: () => String }) productId: string
  ): Promise<WishlistItemEntity> {
    return this.wishlistService.addToWishlist(userId, productId)
  }

  @Mutation(() => WishlistItemEntity)
  async removeFromWishlist(
    @Authorized('id') userId: string,
    @Args('productId', { type: () => String }) productId: string
  ): Promise<WishlistItemEntity> {
    return this.wishlistService.removeFromWishlist(userId, productId)
  }
}
