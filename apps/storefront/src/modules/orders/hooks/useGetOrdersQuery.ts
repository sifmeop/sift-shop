import { useQuery } from '@apollo/client/react'

import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
import { gql } from '~/common/lib/graphql/generated'
import {
  GetOrdersQuery,
  GetOrdersQueryVariables
} from '~/common/lib/graphql/generated/graphql'

export const GET_ORDERS_GQL = gql(`
	query GetOrders($input: PaginationInput!) {
		orders(input: $input) {
      orders {
        id
        number
        status
        method
        firstName
        lastName
        email
        phone
        country
        city
        state
        address
        zipCode
        subtotalAmount
        discountAmount
        taxAmount
        deliveryAmount
        totalAmount
        currency
        createdAt
        items {
          id
          productName
          quantity
          price
          totalPrice
          product {
            id
            name
            images
          }
        }
      }
      total
		}
	}
`)

export const useGetOrdersQuery = (skip: number, take: number) => {
  const isAuthenticated = useIsAuthenticated()
  return useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GET_ORDERS_GQL, {
    variables: {
      input: {
        skip,
        take
      }
    },
    skip: !isAuthenticated
  })
}
