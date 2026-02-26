import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { WishlistItemEntity } from './entities/wishlist-item.entity'
import { WishlistEntity } from './entities/wishlist.entity'

@Injectable()
export class WishlistService {
  async getWishlist(userId: string): Promise<WishlistEntity> {
    let wishlist = await prisma.wishlist.findFirst({
      where: {
        userId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: {
          userId
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })
    }

    return wishlist
  }

  async addToWishlist(
    userId: string,
    productId: string
  ): Promise<WishlistItemEntity> {
    let wishlist = await prisma.wishlist.findFirst({
      where: {
        userId
      }
    })

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: {
          userId
        }
      })
    }

    return await prisma.wishlistItem.create({
      data: {
        productId,
        wishlistId: wishlist.id
      },
      include: {
        product: true
      }
    })
  }

  async removeFromWishlist(
    userId: string,
    productId: string
  ): Promise<WishlistItemEntity> {
    const wishlist = await prisma.wishlist.findFirst({
      where: {
        userId
      }
    })

    if (!wishlist) {
      throw new HttpException('Wishlist not found', 404)
    }

    return await prisma.wishlistItem.delete({
      where: {
        wishlistId_productId: {
          productId,
          wishlistId: wishlist.id
        }
      },
      include: {
        product: true
      }
    })
  }
}
