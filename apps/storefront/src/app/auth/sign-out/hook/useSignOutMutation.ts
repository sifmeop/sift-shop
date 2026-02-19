import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { gql } from '~/common/lib/graphql/generated'
import {
  SignOutMutation,
  SignOutMutationVariables
} from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'

const SIGN_OUT_GQL = gql(`
	mutation SignOut {
		signOut{
			success
		}
	}
`)

export const useSignOutMutation = () => {
  const router = useRouter()
  const logout = useUserStore((state) => state.logout)

  return useMutation<SignOutMutation, SignOutMutationVariables>(SIGN_OUT_GQL, {
    onCompleted: () => {
      router.push(ROUTES.HOME)
      setTimeout(logout, 500)
    }
  })
}
