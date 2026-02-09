import { CombinedGraphQLErrors } from '@apollo/client'
import { toast } from 'sonner'

import { ERROR_MESSAGES, ErrorCause } from '../constants/errors'

const isValidErrorCause = (error: unknown): error is ErrorCause => {
  return typeof error === 'string' && error in ERROR_MESSAGES
}

export const handleGraphQLError = (
  error: unknown,
  fallback: string = 'Something went wrong. Please try again.'
) => {
  if (CombinedGraphQLErrors.is(error)) {
    const cause = error.cause

    if (isValidErrorCause(cause)) {
      toast.error(ERROR_MESSAGES[cause])
      return
    }

    toast.error(error.message)
    return
  }

  toast.error(fallback)
}
