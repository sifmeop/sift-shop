'use client'

import { ApolloProvider } from '@apollo/client/react'

import { apolloClient } from '~/common/lib/graphql/apollo-client'

export const ApolloClientProvider = ({ children }: React.PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
