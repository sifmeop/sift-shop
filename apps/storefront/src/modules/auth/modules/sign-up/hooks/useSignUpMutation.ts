import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const SIGN_UP = gql(`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      success
    }
  }
`)

export const useSignUpMutation = () => {
  return useMutation(SIGN_UP)
}
