import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  UpdateAccountDetailsMutation,
  UpdateAccountDetailsMutationVariables
} from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'

const UPDATE_ACCOUNT_DETAILS_GQL = gql(`
	mutation UpdateAccountDetails($input: UpdateAccountDetailsInput!) {
		updateAccountDetails(input: $input) {
			firstName
			lastName
			email
			phone
			city
			country
			state
			address
			zipCode
		}
	}
`)

export const useUpdateAccountDetailsMutation = () => {
  const setAccountDetails = useUserStore((state) => state.setAccountDetails)

  return useMutation<
    UpdateAccountDetailsMutation,
    UpdateAccountDetailsMutationVariables
  >(UPDATE_ACCOUNT_DETAILS_GQL, {
    onCompleted: (data) => setAccountDetails(data.updateAccountDetails)
  })
}
