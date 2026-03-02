import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import {
  upsertReviewSchema,
  UpsertReviewSchema
} from '../schemas/review.schema'

import { useUpsertReviewMutation } from './useUpsertReviewMutation'

export const useUpsertReview = (
  productId: string,
  defaultValues?: UpsertReviewSchema,
  isUpdate = false
) => {
  const [isOpen, setIsOpen] = useState(false)

  const [upsertReview, { loading: isMutation }] =
    useUpsertReviewMutation(productId)

  const form = useForm<UpsertReviewSchema>({
    defaultValues: defaultValues ?? {
      rating: 5,
      comment: ''
    },
    resolver: zodResolver(upsertReviewSchema)
  })

  const onSubmit = form.handleSubmit(async (values) => {
    if (isMutation) return

    if (
      defaultValues &&
      defaultValues.rating === values.rating &&
      defaultValues.comment === values.comment
    ) {
      setIsOpen(false)
      return
    }

    try {
      await upsertReview({
        variables: {
          input: {
            ...values,
            productId
          }
        }
      })
      form.reset()
      setIsOpen(false)
      toast.success(isUpdate ? 'Review updated' : 'Review created')
    } catch (error) {
      handleGraphQLError(error)
    }
  })

  return { form, onSubmit, isOpen, setIsOpen, isMutation }
}
