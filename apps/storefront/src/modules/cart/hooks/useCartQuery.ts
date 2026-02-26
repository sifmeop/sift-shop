import { useQuery } from '@apollo/client/react'

import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
import { gql } from '~/common/lib/graphql/generated'
import { CartQuery } from '~/common/lib/graphql/generated/graphql'

export const GET_CART_GQL = gql(`
  query Cart {
    cart {
      id
      product {
        id
        slug
        name
        stock
        images
      }
      quantity
      price
      discountedPrice
      isPriceChanged
    }
  }
`)

export const useCartQuery = () => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery<CartQuery>(GET_CART_GQL, {
    skip: !isAuthenticated
  })
}
