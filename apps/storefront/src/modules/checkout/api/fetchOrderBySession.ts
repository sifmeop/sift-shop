import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { gql } from '~/common/lib/graphql/generated'
import {
  GetOrderBySessionQuery,
  GetOrderBySessionQueryVariables
} from '~/common/lib/graphql/generated/graphql'

const GET_ORDER_BY_SESSION = gql(`
	query GetOrderBySession($input: GetOrderBySessionInput!) {
    getOrderBySession(input: $input) {
      id
      status
      method
      firstName
      lastName
      email
      phone
      city
      country
      state
      zipCode
      items {
        id
        product {
          id
          name
          images
        }
        quantity
        price
      }
      createdAt
    }
  }
`)

export const fetchOrderBySession = (id: string) => {
  try {
    return apolloClient.query<
      GetOrderBySessionQuery,
      GetOrderBySessionQueryVariables
    >({
      query: GET_ORDER_BY_SESSION,
      variables: { input: { id } }
    })
  } catch {
    redirect(ROUTES.HOME)
  }
}
