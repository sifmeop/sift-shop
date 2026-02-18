'use client'

import { ApolloProvider } from '@apollo/client/react'

import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { Toaster } from '~/common/ui/sonner'

import { VerifySessionProvider } from '../auth/verify-session'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <VerifySessionProvider>{children}</VerifySessionProvider>
      </ApolloProvider>
      <Toaster closeButton position='top-right' duration={5000} />
    </>
  )
}
