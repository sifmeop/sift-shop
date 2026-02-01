'use client'

import { ApolloProvider } from '@apollo/client/react'

import { apolloClient } from '~/common/lib/apollo-client'
import { Toaster } from '~/common/ui/sonner'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      <Toaster closeButton position='top-right' duration={5000} />
    </>
  )
}
