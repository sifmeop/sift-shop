import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const RESET_PASSWORD = gql(`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`)

export const useResetPasswordMutation = () => {
  return useMutation(RESET_PASSWORD)
}
