import { CombinedGraphQLErrors } from '@apollo/client'
import { toast } from 'sonner'

export const handleGraphQLError = (
  error: unknown,
  fallback: string = 'Something went wrong. Please try again.'
) => {
  if (!error) {
    toast.error(fallback)
    return
  }

  if (CombinedGraphQLErrors.is(error)) {
    toast.error(error.message)
    return
  }

  toast.error(fallback)
}
