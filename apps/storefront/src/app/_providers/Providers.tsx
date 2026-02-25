'use client'

import { ApolloProvider } from '@apollo/client/react'

import { VerifySessionProvider } from '~/app/auth/verify-session'
import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { Toaster } from '~/common/ui/Sonner'

import { PusherProvider } from './PusherProvider'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <VerifySessionProvider>
          <PusherProvider>{children}</PusherProvider>
        </VerifySessionProvider>
      </ApolloProvider>
      <Toaster closeButton position='top-right' duration={5000} />
    </>
  )
}
