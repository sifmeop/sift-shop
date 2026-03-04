import { StarIcon } from 'lucide-react'

import { day } from '~/common/lib/dayjs'
import { useUserStore } from '~/common/stores/user'
import { Button } from '~/common/ui/Button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Separator } from '~/common/ui/Separator'
import { Show } from '~/common/ui/Show'
import { cn } from '~/common/utils/cn'

import { useGetReviewsQuery } from '../hooks/useGetReviewsQuery'

import { DeleteReview } from './DeleteReview'
import { ProductSection } from './ProductSection'
import { RatingBreakdown } from './RatingBreakdown'
import { UpdateReview } from './UpdateReview'
import { WriteReviewDialog } from './WriteReviewDialog'

interface ReviewsProps {
  productId: string
  isPurchased: boolean
}

export const Reviews = ({ productId, isPurchased }: ReviewsProps) => {
  const userId = useUserStore((state) => state.user?.id)

  const { data, loading, error } = useGetReviewsQuery(productId)

  const reviews = data?.reviews

  if (error) return

  if (!reviews || loading) {
    return <CenterLoader />
  }

  return (
    <ProductSection
      icon={StarIcon}
      name='Reviews'
      leftContent={
        <RatingBreakdown
          reviews={reviews}
          productId={productId}
          isPurchased={isPurchased}
        />
      }>
      {reviews.length > 0 ? (
        <div className='flex h-full flex-col gap-4 lg:flex-row'>
          <Separator orientation='vertical' className='hidden lg:block' />
          <div className='flex-1 space-y-3'>
            {reviews.map((review) => (
              <div key={review.id}>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4'>
                  <div className='grid size-10 shrink-0 place-items-center rounded-full bg-blue-500/20 text-blue-500 sm:size-12'>
                    {review.fullName
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}
                  </div>
                  <div className='mr-auto flex min-w-0 flex-col justify-center gap-1 sm:gap-2'>
                    <p className='font-medium'>{review.fullName}</p>
                    <span className='text-muted-foreground text-xs'>
                      {day(review.createdAt).format('MMM DD, YYYY')}
                    </span>
                  </div>

                  <div className='flex flex-wrap items-center gap-2 sm:justify-end'>
                    <div className='flex gap-1'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={index}
                          className={cn(
                            'size-4 fill-foreground stroke-foreground',
                            {
                              'fill-none': index >= review.rating
                            }
                          )}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <Show when={review.userId === userId}>
                      <div className='flex gap-2'>
                        <UpdateReview
                          productId={productId}
                          rating={review.rating}
                          comment={review.comment}
                        />
                        <DeleteReview
                          reviewId={review.id}
                          productId={productId}
                        />
                      </div>
                    </Show>
                  </div>
                </div>
                <Show when={!!review.comment}>
                  <p className='text-muted-foreground mt-2 text-sm sm:mt-3 sm:ml-14 sm:text-base lg:ml-18'>
                    {review.comment}
                  </p>
                </Show>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-2 text-center w-fit'>
          <StarIcon
            className='size-8 text-muted-foreground/30'
            strokeWidth={1.5}
          />
          <p className='text-sm font-medium text-muted-foreground'>
            No reviews yet
          </p>
          <Show when={isPurchased}>
            <p className='text-xs text-muted-foreground/60'>
              Be the first to share your experience
            </p>
          </Show>
          {isPurchased ? (
            <WriteReviewDialog type='create' productId={productId}>
              <Button fullWidth variant='secondary' className='h-10'>
                Write a review
              </Button>
            </WriteReviewDialog>
          ) : (
            <p className='text-xs text-muted-foreground/60'>
              You need to purchase this product to write a review
            </p>
          )}
        </div>
      )}
    </ProductSection>
  )
}
