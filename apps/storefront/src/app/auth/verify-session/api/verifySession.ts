import { apolloClient } from '~/common/lib/graphql/apollo-client'
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

export const verifySession = async () => {
  return apolloClient.query({
    query: VERIFY_SESSION
  })
}
