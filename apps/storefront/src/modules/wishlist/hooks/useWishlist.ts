import { toast } from 'sonner'

import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
import { handleGraphQLError } from '~/common/utils/handleGraphQLError'

import { useAddToWishlistMutation } from './useAddToWishlistMutation'
import { useGetWishlistQuery } from './useGetWishlistQuery'
import { useRemoveFromWishlistMutation } from './useRemoveFromWishlistMutation'

export const useWishlist = (productId: string) => {
  const isAuthenticated = useIsAuthenticated()
  const { data } = useGetWishlistQuery()
  const [addToWishlist, { loading: addToWishlistLoading }] =
    useAddToWishlistMutation()
  const [removeFromWishlist, { loading: removeFromWishlistLoading }] =
    useRemoveFromWishlistMutation()

  const isInWishlist = data?.wishlist?.items.some(
    (item) => item.product.id === productId
  )

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to add items to your wishlist.')
      return
    }

    if (addToWishlistLoading || removeFromWishlistLoading) return

    try {
      await addToWishlist({ variables: { productId } })
    } catch (error) {
      handleGraphQLError(error)
    }
  }

  const handleRemoveFromWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to remove items from your wishlist.')
      return
    }

    if (addToWishlistLoading || removeFromWishlistLoading) return

    try {
      await removeFromWishlist({ variables: { productId } })
    } catch (error) {
      handleGraphQLError(error)
    }
  }

  return {
    isLoading: addToWishlistLoading || removeFromWishlistLoading,
    isInWishlist,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist
  }
}
