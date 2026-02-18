import { useLazyQuery } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'

const VERIFY_SESSION = gql(`
  query VerifySession {
    verifySession {
      id
      email
      fullName
      avatar
      isTwoFactorEnabled
      createdAt
    }
  }
`)

export const useVerifySessionQuery = () => {
  return useLazyQuery(VERIFY_SESSION)
}
