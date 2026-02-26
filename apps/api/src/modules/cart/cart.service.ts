import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { calcDiscountedPrice } from '~/common/utils/calcDiscountedPrice'

import { CartItemEntity } from './entities/cart.entity'
import { AddToCartInput } from './inputs/add-to-cart.input'
import { RemoveFromCartInput } from './inputs/remove-from-cart.input'

@Injectable()
export class CartService {
  async cart(userId: string): Promise<CartItemEntity[]> {
    const cart = await prisma.cart.findFirst({
      where: {
        userId
      },
      select: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!cart) {
      return []
    }

    const cartItems = cart.items.map((item) => {
      const isPriceChanged =
        !item.price.equals(item.product.price) ||
        (item.discountedPrice !== null && item.product.discountPercent !== null
          ? !item.discountedPrice.equals(
              calcDiscountedPrice(
                item.product.price,
                item.product.discountPercent
              )
            )
          : item.discountedPrice !== null ||
            item.product.discountPercent !== null)

      return {
        ...item,
        isPriceChanged
      }
    })

    const cartItemsWithPriceChanged = cartItems.filter(
      (item) => item.isPriceChanged
    )

    if (cartItemsWithPriceChanged.length > 0) {
      void Promise.all(
        cartItemsWithPriceChanged.map((item) => {
          const { price, discountPercent } = item.product
          return prisma.cartItem.update({
            where: {
              id: item.id
            },
            data: {
              price,
              discountedPrice: discountPercent
                ? calcDiscountedPrice(price, discountPercent)
                : null
            }
          })
        })
      )
    }

    return cartItems
  }

  async addToCart(
    userId: string,
    input: AddToCartInput
  ): Promise<CartItemEntity> {
    const product = await prisma.product.findUnique({
      where: {
        id: input.productId
      }
    })

    if (!product) {
      throw new HttpException('Product not found', 404)
    }

    const cart = await prisma.cart.findFirst({
      where: { userId },
      select: { id: true }
    })

    if (!cart) {
      throw new HttpException('Cart not found', 404)
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: input.productId
        }
      },
      select: { quantity: true }
    })

    const totalQuantity = existingCartItem ? existingCartItem.quantity + 1 : 1

    if (product.stock < totalQuantity) {
      throw new HttpException('Not enough stock', 400)
    }

    const updatedCart = await prisma.cart.update({
      where: {
        id: cart.id
      },
      data: {
        items: {
          upsert: {
            where: {
              cartId_productId: {
                cartId: cart.id,
                productId: input.productId
              }
            },
            update: {
              quantity: { increment: 1 }
            },
            create: {
              productId: input.productId,
              quantity: 1,
              price: product.price,
              discountedPrice: product.discountPercent
                ? calcDiscountedPrice(product.price, product.discountPercent)
                : null
            }
          }
        }
      },
      select: {
        id: true,
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return updatedCart.items.find((item) => item.productId === input.productId)!
  }

  async removeFromCart(
    userId: string,
    input: RemoveFromCartInput
  ): Promise<CartItemEntity> {
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: input.id,
        cart: {
          userId
        }
      },
      include: {
        product: true
      }
    })

    if (!cartItem) {
      throw new HttpException('Cart item not found', 404)
    }

    if (cartItem.quantity > input.quantity) {
      return await prisma.cartItem.update({
        where: {
          id: cartItem.id
        },
        data: {
          quantity: { decrement: 1 }
        },
        include: {
          product: true
        }
      })
    }

    const deleted = await prisma.cartItem.delete({
      where: {
        id: cartItem.id
      },
      include: {
        product: true
      }
    })

    return { ...deleted, quantity: 0 }
  }
}
