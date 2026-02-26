import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import { GetWishlistQuery } from '~/common/lib/graphql/generated/graphql'

import { GET_WISHLIST_GQL } from './useGetWishlistQuery'

const ADD_TO_WISHLIST_GQL = gql(`
  mutation AddToWishlist($productId: String!) {
    addToWishlist(productId: $productId) {
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

export const useAddToWishlistMutation = () => {
  return useMutation(ADD_TO_WISHLIST_GQL, {
    update: (cache, { data }) => {
      cache.updateQuery<GetWishlistQuery>(
        { query: GET_WISHLIST_GQL },
        (prev) => {
          if (!prev || !data) return prev

          return {
            wishlist: {
              id: prev.wishlist.id,
              items: [...prev.wishlist.items, data.addToWishlist]
            }
          }
        }
      )
    }
  })
}
