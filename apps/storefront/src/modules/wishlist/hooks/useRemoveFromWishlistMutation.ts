import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import { GetWishlistQuery } from '~/common/lib/graphql/generated/graphql'

import { GET_WISHLIST_GQL } from './useGetWishlistQuery'

const REMOVE_FROM_WISHLIST_GQL = gql(`
  mutation RemoveFromWishlist($productId: String!) {
    removeFromWishlist(productId: $productId) {
      id
      product {
				id
				slug
				name
				price
				discountPercent
				stock
				images
			}
			addedAt
    }
  }
`)

export const useRemoveFromWishlistMutation = () => {
  return useMutation(REMOVE_FROM_WISHLIST_GQL, {
    update: (cache, { data }) => {
      cache.updateQuery<GetWishlistQuery>(
        { query: GET_WISHLIST_GQL },
        (prev) => {
          if (!prev || !data) return

          return {
            wishlist: {
              id: prev.wishlist.id,
              items: prev.wishlist.items.filter(
                (item) => item.id !== data.removeFromWishlist.id
              )
            }
          }
        }
      )
    }
  })
}
