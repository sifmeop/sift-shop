import { HttpException, Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { ReviewEntity } from './entities/review.entity'
import { UpsertReviewInput } from './inputs/upsert-review.input'

@Injectable()
export class ReviewService {
  async findAll(productId: string): Promise<ReviewEntity[]> {
    const reviews = await prisma.review.findMany({
      where: {
        productId
      },
      include: {
        user: {
          select: {
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    const transformedReviews = reviews.map(({ user, ...review }) => ({
      ...review,
      fullName: user.fullName
    }))

    return transformedReviews
  }

  async upsertReview(
    userId: string,
    input: UpsertReviewInput
  ): Promise<ReviewEntity> {
    const hasPurchased = await prisma.order.findFirst({
      where: {
        userId,
        items: {
          some: {
            productId: input.productId
          }
        }
      }
    })

    if (!hasPurchased) {
      throw new HttpException(
        'You need to purchase this product before leaving a review',
        400
      )
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        productId: input.productId
      }
    })

    const { user, ...review } = await prisma.review.upsert({
      where: {
        id: existingReview?.id ?? ''
      },
      create: {
        ...input,
        userId
      },
      update: {
        ...input
      },
      include: {
        user: {
          select: {
            fullName: true
          }
        }
      }
    })

    return {
      ...review,
      fullName: user.fullName
    }
  }

  async deleteReview(userId: string, reviewId: string): Promise<boolean> {
    const review = await prisma.review.findUnique({
      where: { id: reviewId, userId }
    })

    if (!review) {
      throw new HttpException('Review not found', 404)
    }

    await prisma.review.delete({ where: { id: reviewId } })

    return true
  }
}
