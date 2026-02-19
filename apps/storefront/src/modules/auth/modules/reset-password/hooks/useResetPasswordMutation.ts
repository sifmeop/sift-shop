import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables
} from '~/common/lib/graphql/generated/graphql'

const RESET_PASSWORD_GQL = gql(`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`)

export const useResetPasswordMutation = () => {
  return useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    RESET_PASSWORD_GQL
  )
}
