import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const FORGOT_PASSWORD = gql`
  mutation SignIn($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
`

export const useForgotPasswordMutation = () => {
  return useMutation(FORGOT_PASSWORD)
}
