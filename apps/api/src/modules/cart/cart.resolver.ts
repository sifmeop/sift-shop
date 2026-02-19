import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'

import { CartService } from './cart.service'
import { CartItemEntity } from './entities/cart.entity'
import { AddToCartInput } from './inputs/add-to-cart.input'
import { RemoveFromCartInput } from './inputs/remove-from-cart.input'

@Resolver(() => CartItemEntity)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => [CartItemEntity])
  async cart(@Authorized('id') userId: string): Promise<CartItemEntity[]> {
    return await this.cartService.cart(userId)
  }

  @Mutation(() => CartItemEntity)
  async addToCart(
    @Authorized('id') userId: string,
    @Args('input', { type: () => AddToCartInput })
    input: AddToCartInput
  ): Promise<CartItemEntity> {
    return await this.cartService.addToCart(userId, input)
  }

  @Mutation(() => CartItemEntity)
  async removeFromCart(
    @Authorized('id') userId: string,
    @Args('input', { type: () => RemoveFromCartInput })
    input: RemoveFromCartInput
  ): Promise<CartItemEntity> {
    return await this.cartService.removeFromCart(userId, input)
  }
}
