'use client'

import { ApolloProvider } from '@apollo/client/react'

import { apolloClient } from '~/common/lib/apollo-client'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
