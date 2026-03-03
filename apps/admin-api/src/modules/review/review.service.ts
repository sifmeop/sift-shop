import { Injectable } from '@nestjs/common'
import { prisma, Review } from '@sift-shop/database'

@Injectable()
export class ReviewService {
  async getReviews(productId?: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: productId
        ? {
            productId
          }
        : undefined,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            fullName: true
          }
        }
      }
    })

    return reviews.map(({ user, ...review }) => ({
      ...review,
      fullName: user.fullName
    }))
  }

  async deleteReview(id: string): Promise<void> {
    await prisma.review.delete({
      where: {
        id
      }
    })
  }
}
