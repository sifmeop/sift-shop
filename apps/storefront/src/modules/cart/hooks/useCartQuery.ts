import { useQuery } from '@apollo/client/react'

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
    }
  }
`)

export const useCartQuery = () => {
  return useQuery<CartQuery>(GET_CART_GQL)
}
