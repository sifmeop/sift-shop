import { useMutation } from '@apollo/client/react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { gql } from '~/common/lib/graphql/generated'
import { useUserStore } from '~/common/stores/user'

const SIGN_OUT = gql(`
	mutation SignOut {
		signOut{
			success
		}
	}
`)

export const useSignOutMutation = () => {
  const router = useRouter()
  const logout = useUserStore((state) => state.logout)

  return useMutation(SIGN_OUT, {
    onCompleted: () => {
      router.push(ROUTES.HOME)
      setTimeout(logout, 500)
    }
  })
}
