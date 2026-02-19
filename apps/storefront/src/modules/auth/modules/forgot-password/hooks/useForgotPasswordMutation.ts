import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
} from '~/common/lib/graphql/generated/graphql'

const FORGOT_PASSWORD_GQL = gql(`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
`)

export const useForgotPasswordMutation = () => {
  return useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    FORGOT_PASSWORD_GQL
  )
}
