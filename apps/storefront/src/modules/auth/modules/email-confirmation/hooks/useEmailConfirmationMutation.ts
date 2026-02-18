import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import { useUserStore } from '~/common/stores/user'

const EMAIL_CONFIRMATION = gql(`
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

  return useMutation(EMAIL_CONFIRMATION, {
    onCompleted: (data) => {
      setUser(data.emailConfirmation)
    }
  })
}
