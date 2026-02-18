import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const FORGOT_PASSWORD = gql(`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
`)

export const useForgotPasswordMutation = () => {
  return useMutation(FORGOT_PASSWORD)
}
