import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { env } from '~/common/constants/env'

const url = new URL(env.NEXT_PUBLIC_API_URL).origin

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${url}/graphql`,
    credentials: 'include'
  }),
  cache: new InMemoryCache()
})
