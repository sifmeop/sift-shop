import { useEffect } from 'react'

import { env } from '~/common/constants/env'
import { useUserStore } from '~/common/stores/user'

import { useVerifySessionQuery } from '../hooks/useVerifySessionQuery'

export const VerifySessionProvider = ({
  children
}: React.PropsWithChildren) => {
  const [verifySession] = useVerifySessionQuery()

  const setUser = useUserStore((state) => state.setUser)
  const setLoading = useUserStore((state) => state.setLoading)

  useEffect(() => {
    const handleVerifySession = async () => {
      const session = await cookieStore.get(env.NEXT_PUBLIC_SESSION_COOKIE_NAME)

      if (!session) {
        setLoading(false)
        return
      }

      try {
        const { data } = await verifySession()

        if (data) {
          setUser(data.verifySession)
        }
      } catch (error) {
        console.debug(`Error verifying session: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    handleVerifySession()
  }, [])

  return <>{children}</>
}
