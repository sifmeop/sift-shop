import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { gql } from '~/common/lib/graphql/generated'
import {
  GetOrderByPaymentIdQuery,
  GetOrderByPaymentIdQueryVariables
} from '~/common/lib/graphql/generated/graphql'

const GET_ORDER_BY_PAYMENT_ID_GQL = gql(`
	query GetOrderByPaymentId($input: GetOrderByPaymentIdInput!) {
    getOrderByPaymentId(input: $input) {
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
  }
`)

export const fetchOrderByPaymentId = (id: string) => {
  try {
    return apolloClient.query<
      GetOrderByPaymentIdQuery,
      GetOrderByPaymentIdQueryVariables
    >({
      query: GET_ORDER_BY_PAYMENT_ID_GQL,
      variables: { input: { id } },
      fetchPolicy: 'no-cache'
    })
  } catch {
    redirect(ROUTES.HOME)
  }
}
