import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import {
  SignUpMutation,
  SignUpMutationVariables
} from '~/common/lib/graphql/generated/graphql'

const SIGN_UP_GQL = gql(`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      success
    }
  }
`)

export const useSignUpMutation = () => {
  return useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP_GQL)
}
