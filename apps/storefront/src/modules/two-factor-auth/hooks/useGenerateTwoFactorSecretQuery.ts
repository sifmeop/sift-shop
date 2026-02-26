import { useQuery } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const GENERATE_TWO_FACTOR_SECRET_GQL = gql(`
	query GenerateTwoFactorSecret {
		generateTwoFactorSecret {
			secret
			otpAuthUrl
		}
	}
`)

export const useGenerateTwoFactorSecretQuery = () => {
  return useQuery(GENERATE_TWO_FACTOR_SECRET_GQL)
}
