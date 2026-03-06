import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import { env } from '~/common/constants/env'
import { makeServerClient } from '~/common/lib/graphql/apollo-server-client'
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

export const verifySession = async (cookieStore: ReadonlyRequestCookies) => {
  const session = cookieStore.get(env.NEXT_PUBLIC_SESSION_COOKIE_NAME)

  if (!session) {
    return {
      data: {
        verifySession: null
      }
    }
  }

  try {
    const client = await makeServerClient(cookieStore)

    return await client.query<VerifySessionQuery>({
      query: VERIFY_SESSION
    })
  } catch {
    return {
      verifySession: null
    }
  }
}
