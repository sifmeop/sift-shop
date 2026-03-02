import { PencilIcon } from 'lucide-react'

import { Button } from '~/common/ui/button'

import { WriteReviewDialog } from './WriteReviewDialog'

interface UpdateReviewProps {
  productId: string
  rating: number
  comment?: string | null
}

export const UpdateReview = ({
  productId,
  rating,
  comment
}: UpdateReviewProps) => {
  return (
    <WriteReviewDialog
      type='update'
      productId={productId}
      defaultValues={{ rating, comment: comment ?? '' }}>
      <Button variant='outline' className='size-8'>
        <PencilIcon />
      </Button>
    </WriteReviewDialog>
  )
}
