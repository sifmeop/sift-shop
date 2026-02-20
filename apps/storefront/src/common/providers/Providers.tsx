'use client'

import { ApolloProvider } from '@apollo/client/react'

import { VerifySessionProvider } from '~/app/auth/verify-session'
import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { Toaster } from '~/common/ui/Sonner'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <VerifySessionProvider>{children}</VerifySessionProvider>
      </ApolloProvider>
      <Toaster closeButton position='top-right' duration={Infinity} />
    </>
  )
}
