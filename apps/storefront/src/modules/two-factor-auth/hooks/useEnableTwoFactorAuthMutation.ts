import { useMutation } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const ENABLE_TWO_FACTOR_AUTH_GQL = gql(`
	mutation EnableTwoFactorAuth($code: String!) {
		enableTwoFactorAuth(code: $code)
	}
`)

export const useEnableTwoFactorAuthMutation = () => {
  return useMutation(ENABLE_TWO_FACTOR_AUTH_GQL)
}
