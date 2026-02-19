import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  AddToCartMutation,
  AddToCartMutationVariables,
  CartQuery
} from '~/common/lib/graphql/generated/graphql'

import { CART_GQL } from './useCartQuery'

const ADD_TO_CART_GQL = gql(`
	mutation AddToCart($input: AddToCartInput!) {
		addToCart(input: $input) {
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

export const useAddToCartMutation = () => {
  return useMutation<AddToCartMutation, AddToCartMutationVariables>(
    ADD_TO_CART_GQL,
    {
      update: (cache, { data }) => {
        if (!data) return

        cache.updateQuery<CartQuery>({ query: CART_GQL }, (prev) => {
          if (!prev) return

          const isExisting = prev.cart.some(
            (item) => item.id === data.addToCart.id
          )

          if (isExisting) return prev

          return {
            cart: [...prev.cart, data.addToCart]
          }
        })
      }
    }
  )
}
