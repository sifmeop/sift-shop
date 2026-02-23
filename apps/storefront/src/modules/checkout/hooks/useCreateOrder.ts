import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  CreateOrderMutation,
  CreateOrderMutationVariables
} from '~/common/lib/graphql/generated/graphql'

const CREATE_ORDER_GQL = gql(`
	mutation CreateOrder($input: CreateOrderInput!) {
		create(input: $input) {
			url
		}
	}
`)

export const useCreateOrder = () => {
  return useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
    CREATE_ORDER_GQL
  )
}
