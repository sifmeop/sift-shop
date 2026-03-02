import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'
import { Public } from '~/common/decorators/public.decorator'

import { ReviewEntity } from './entities/review.entity'
import { UpsertReviewInput } from './inputs/upsert-review.input'
import { ReviewService } from './review.service'

@Resolver(() => ReviewEntity)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Public()
  @Query(() => [ReviewEntity], { name: 'reviews' })
  async reviews(
    @Args('productId', { type: () => String }) productId: string
  ): Promise<ReviewEntity[]> {
    return await this.reviewService.findAll(productId)
  }

  @Mutation(() => ReviewEntity)
  async upsertReview(
    @Authorized('id') userId: string,
    @Args('input', { type: () => UpsertReviewInput }) input: UpsertReviewInput
  ): Promise<ReviewEntity> {
    return await this.reviewService.upsertReview(userId, input)
  }

  @Mutation(() => Boolean)
  async deleteReview(
    @Authorized('id') userId: string,
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    return await this.reviewService.deleteReview(userId, id)
  }
}
