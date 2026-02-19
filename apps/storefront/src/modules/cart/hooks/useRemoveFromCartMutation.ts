import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  CartQuery,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables
} from '~/common/lib/graphql/generated/graphql'

import { CART_GQL } from './useCartQuery'

const REMOVE_FROM_CART_GQL = gql(`
  mutation RemoveFromCart($input: RemoveFromCartInput!) {
    removeFromCart(input: $input) {
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

export const useRemoveFromCartMutation = () => {
  return useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(
    REMOVE_FROM_CART_GQL,
    {
      update: (cache, { data }) => {
        if (!data) return

        cache.updateQuery<CartQuery>({ query: CART_GQL }, (prev) => {
          if (!prev) return

          const canRemoveItem = data.removeFromCart.quantity === 0

          if (canRemoveItem) {
            return {
              cart: prev.cart.filter(
                (item) => item.id !== data.removeFromCart.id
              )
            }
          }

          return prev
        })
      }
    }
  )
}
