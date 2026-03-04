import { StarIcon } from 'lucide-react'

import { ReviewEntity } from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'
import { Button } from '~/common/ui/Button'
import { Show } from '~/common/ui/Show'

import { WriteReviewDialog } from './WriteReviewDialog'

interface RatingBreakdownProps {
  productId: string
  reviews: ReviewEntity[]
  isPurchased: boolean
}

export const RatingBreakdown = ({
  productId,
  reviews,
  isPurchased
}: RatingBreakdownProps) => {
  const userId = useUserStore((state) => state.user?.id)

  if (!reviews.length) return

  const hasReview = reviews.some((review) => review.userId === userId)
  const canWriteReview = reviews.length > 0 && isPurchased && !hasReview

  return (
    <div className='space-y-1'>
      {Array.from({ length: 5 }, (_, index) => index + 1)
        .reverse()
        .map((rating) => {
          const reviewsCount = reviews.length
          const reviewsWithRating = reviews.filter(
            (review) => review.rating === rating
          )
          const reviewsWithRatingCount = reviewsWithRating.length
          const percentage = (reviewsWithRatingCount / reviewsCount) * 100
          const formattedCount = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short'
          }).format(reviewsWithRatingCount)

          return (
            <div
              key={rating}
              className='text-muted-foreground flex items-center gap-2 text-sm font-medium'>
              <span className='w-3 text-center'>{rating}</span>
              <StarIcon className='size-5 shrink-0 stroke-2' />
              <div className='bg-muted/40 h-2 flex-1 overflow-hidden rounded-full'>
                <div
                  className='bg-primary h-full rounded-full transition-all duration-500'
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className='w-8 text-center text-xs sm:text-sm'>
                {formattedCount}
              </span>
            </div>
          )
        })}
      <Show when={canWriteReview}>
        <WriteReviewDialog type='create' productId={productId}>
          <Button fullWidth variant='secondary' className='h-10'>
            Write a review
          </Button>
        </WriteReviewDialog>
      </Show>
    </div>
  )
}
