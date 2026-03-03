import { Controller, Delete, Get, Param, Query } from '@nestjs/common'
import { Review } from '@sift-shop/database'

import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviews(@Query('productId') productId?: string): Promise<Review[]> {
    return this.reviewService.getReviews(productId)
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<void> {
    return this.reviewService.deleteReview(id)
  }
}
