import { cookies } from 'next/headers'

import { verifySession } from '../auth/verify-session'

import { SessionStoreInitializer } from './SessionStoreInitializer'

export const SessionProvider = async ({
  children
}: React.PropsWithChildren) => {
  const cookieStore = await cookies()
  const { data } = await verifySession(cookieStore)
  const user = data?.verifySession ?? null

  return (
    <>
      <SessionStoreInitializer user={user} />
      {children}
    </>
  )
}
