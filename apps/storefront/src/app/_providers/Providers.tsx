import { Toaster } from '~/common/ui/Sonner'

import { ApolloClientProvider } from './ApolloClientProvider'
import { PusherProvider } from './PusherProvider'
import { SessionProvider } from './SessionProvider'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ApolloClientProvider>
        <SessionProvider>
          <PusherProvider>{children}</PusherProvider>
        </SessionProvider>
      </ApolloClientProvider>
      <Toaster closeButton position='top-right' duration={5000} />
    </>
  )
}
