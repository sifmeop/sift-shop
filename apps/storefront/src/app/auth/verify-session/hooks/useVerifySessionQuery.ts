import { useLazyQuery } from '@apollo/client/react'

import { gql } from '~/common/lib/graphql/generated'
import { VerifySessionQuery } from '~/common/lib/graphql/generated/graphql'

const VERIFY_SESSION = gql(`
  query VerifySession {
    verifySession {
      id
      email
      fullName
      avatar
      isTwoFactorEnabled
      createdAt
      accountDetails {
        firstName
        lastName
        email
        phone
        city
        country
        state
        address
        zipCode
      }
    }
  }
`)

export const useVerifySessionQuery = () => {
  return useLazyQuery<VerifySessionQuery>(VERIFY_SESSION)
}
