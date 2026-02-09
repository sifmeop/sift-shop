import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`

export const useResetPasswordMutation = () => {
  return useMutation(RESET_PASSWORD)
}
