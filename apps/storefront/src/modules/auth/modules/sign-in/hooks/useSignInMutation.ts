import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { gql } from '~/common/lib/graphql/generated'
import {
  SignInMutation,
  SignInMutationVariables
} from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'

const SIGN_IN_GQL = gql(`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      id
      email
      fullName
      avatar
      isTwoFactorEnabled
      createdAt
    }
  }
`)

export const useSignInMutation = () => {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  return useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN_GQL, {
    onCompleted: (data) => {
      setUser(data.signIn)
      router.push(ROUTES.HOME)
    }
  })
}
