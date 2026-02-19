import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename'

import { env } from '~/common/constants/env'

const url = new URL(env.NEXT_PUBLIC_API_URL).origin

const removeTypenameLink = new RemoveTypenameFromVariablesLink()
const httpLink = new HttpLink({
  uri: `${url}/graphql`,
  credentials: 'include'
})
const link = ApolloLink.from([removeTypenameLink, httpLink])

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cart: {
            merge(_, incoming) {
              return incoming
            }
          }
        }
      }
    }
  })
})
