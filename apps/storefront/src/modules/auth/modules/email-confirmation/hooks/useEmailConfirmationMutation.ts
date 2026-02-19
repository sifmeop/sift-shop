import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  EmailConfirmationMutation,
  EmailConfirmationMutationVariables
} from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'

const EMAIL_CONFIRMATION_GQL = gql(`
  mutation EmailConfirmation($input: EmailConfirmationInput!) {
    emailConfirmation(input: $input) {
      id
      email
      fullName
      avatar
      isTwoFactorEnabled
      createdAt
    }
  }
`)

export const useEmailConfirmationMutation = () => {
  const setUser = useUserStore((state) => state.setUser)

  return useMutation<
    EmailConfirmationMutation,
    EmailConfirmationMutationVariables
  >(EMAIL_CONFIRMATION_GQL, {
    onCompleted: (data) => {
      setUser(data.emailConfirmation)
    }
  })
}
