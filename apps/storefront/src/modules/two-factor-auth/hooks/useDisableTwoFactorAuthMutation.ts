import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const DISABLE_TWO_FACTOR_AUTH_GQL = gql(`
	mutation DisableTwoFactorAuth($code: String!) {
		disableTwoFactorAuth(code: $code)
	}
`)

export const useDisableTwoFactorAuthMutation = () => {
  return useMutation(DISABLE_TWO_FACTOR_AUTH_GQL)
}
