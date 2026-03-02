import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import { env } from '~/common/constants/env'

const url = new URL(env.NEXT_PUBLIC_API_URL).origin

export const makeServerClient = async (
  cookieStore?: ReadonlyRequestCookies
) => {
  const removeTypenameLink = new RemoveTypenameFromVariablesLink()

  const httpLink = new HttpLink({
    uri: `${url}/graphql`,
    credentials: 'include',
    headers: {
      Cookie: cookieStore?.toString() || ''
    },
    fetch
  })

  return new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([removeTypenameLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      }
    }
  })
}
