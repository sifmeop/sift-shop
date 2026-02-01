import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
      fullName
      avatar
      email
      isTwoFactorEnabled
      isVerified
      method
    }
  }
`

export const useSignUpMutation = () => {
  return useMutation(SIGN_UP)
}
