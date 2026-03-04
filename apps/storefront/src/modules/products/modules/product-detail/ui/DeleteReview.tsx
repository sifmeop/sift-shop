import { useState } from 'react'

import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '~/common/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/common/ui/Dialog'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { useDeleteReviewMutation } from '../hooks/useDeleteReviewMutation'

interface DeleteReviewProps {
  reviewId: string
  productId: string
}

export const DeleteReview = ({ reviewId, productId }: DeleteReviewProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const [deleteReview, { loading: isMutation }] =
    useDeleteReviewMutation(productId)

  const handleSubmit = async () => {
    if (isMutation) return

    try {
      await deleteReview({ variables: { id: reviewId } })
      toast.success('Review deleted successfully')
      setIsOpen(false)
    } catch (error) {
      handleGraphQLError(error)
    }
  }

  const onOpenChange = (open: boolean) => {
    if (isMutation) return
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant='destructive' className='size-8'>
          <TrashIcon className='stroke-destructive' />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this review?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='outline'
              onClick={() => setIsOpen(false)}
              disabled={isMutation}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            isLoading={isMutation}
            loadingMode='spinner-only'
            onClick={handleSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
