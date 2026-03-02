import { StarIcon } from 'lucide-react'

import { day } from '~/common/lib/dayjs'
import { useUserStore } from '~/common/stores/user'
import { Button } from '~/common/ui/button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Separator } from '~/common/ui/separator'
import { Show } from '~/common/ui/show'
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
        <div className='flex gap-4 h-full'>
          <Separator orientation='vertical' />
          <div className='space-y-3 flex-1'>
            {reviews.map((review) => (
              <div key={review.id}>
                <div className='flex gap-6'>
                  <div className='size-12 rounded-full grid place-items-center text-blue-500 bg-blue-500/20'>
                    {review.fullName
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}
                  </div>
                  <div className='mr-auto flex flex-col justify-center gap-2'>
                    <p className='font-medium'>{review.fullName}</p>
                    <span className='text-muted-foreground text-xs'>
                      {day(review.createdAt).format('MMM DD, YYYY')}
                    </span>
                  </div>
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
                <Show when={!!review.comment}>
                  <p className='text-muted-foreground mt-3 ml-18'>
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
