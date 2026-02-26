import { useQuery } from '@apollo/client/react'

import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
import { gql } from '~/common/lib/graphql/generated'
import { GetWishlistQuery } from '~/common/lib/graphql/generated/graphql'

export const GET_WISHLIST_GQL = gql(`
	query GetWishlist {
		wishlist {
			id
			items {
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
	}`)

export const useGetWishlistQuery = () => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery<GetWishlistQuery>(GET_WISHLIST_GQL, {
    skip: !isAuthenticated
  })
}
