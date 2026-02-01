import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
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

export const useSignInMutation = () => {
  return useMutation(SIGN_IN)
}
