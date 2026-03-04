import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { StarIcon } from 'lucide-react'

import { Button } from '~/common/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/common/ui/Dialog'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '~/common/ui/Field'
import { Separator } from '~/common/ui/Separator'
import { Textarea } from '~/common/ui/Textarea'
import { cn } from '~/common/utils/cn'

import { useUpsertReview } from '../hooks/useUpsertReview'
import { UpsertReviewSchema } from '../schemas/review.schema'

interface WriteReviewDialogProps extends React.PropsWithChildren {
  type: 'create' | 'update'
  productId: string
  defaultValues?: UpsertReviewSchema
}

export const WriteReviewDialog = ({
  type,
  productId,
  defaultValues,
  children
}: WriteReviewDialogProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const isUpdate = type === 'update'

  const { form, onSubmit, isOpen, setIsOpen, isMutation } = useUpsertReview(
    productId,
    defaultValues,
    isUpdate
  )

  const onOpenChange = (open: boolean) => {
    if (open) form.reset()
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined} className='max-w-md'>
        <DialogHeader>
          <DialogTitle>{isUpdate ? 'Update' : 'Write'} a review</DialogTitle>
        </DialogHeader>
        <Separator />
        <form
          onSubmit={onSubmit}
          className={cn('space-y-4 transition-opacity duration-300', {
            'opacity-70 pointer-events-none': isMutation
          })}>
          <Controller
            name='rating'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Rate the product</FieldLabel>
                <div className='grid grid-cols-5 justify-items-center'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      type='button'
                      className='h-10 w-full'
                      onMouseEnter={() => setHoveredRating(index + 1)}
                      onMouseLeave={() => setHoveredRating(null)}
                      onClick={() => {
                        form.setValue('rating', index + 1)
                      }}>
                      <StarIcon
                        key={index}
                        className={cn(
                          'size-full stroke-muted-foreground/50 stroke-2 transition-colors fill-transparent duration-300',
                          {
                            'stroke-foreground':
                              hoveredRating && hoveredRating >= index + 1,
                            'stroke-foreground fill-foreground':
                              field.value >= index + 1,
                            'stroke-red-500': fieldState.invalid
                          }
                        )}
                      />
                    </button>
                  ))}
                </div>
              </Field>
            )}
          />
          <Controller
            name='comment'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='comment'>Comment</FieldLabel>
                <Textarea
                  id='comment'
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className='h-32 break-all resize-none scrollbar-thin'
                  placeholder='Write your review'
                />
                <FieldDescription className='text-right'>
                  {field.value.length}/500
                </FieldDescription>
                <FieldError error={fieldState.error?.message} />
              </Field>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline' disabled={isMutation}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              isLoading={isMutation}
              loadingMode='spinner-only'>
              {isUpdate ? 'Update review' : 'Leave a review'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
