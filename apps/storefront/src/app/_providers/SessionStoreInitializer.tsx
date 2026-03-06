'use client'

import { useEffect } from 'react'

import { VerifySessionQuery } from '~/common/lib/graphql/generated/graphql'
import { useUserStore } from '~/common/stores/user'

type User = VerifySessionQuery['verifySession']

interface SessionStoreInitializerProps {
  user: User | null
}

export const SessionStoreInitializer = ({
  user
}: SessionStoreInitializerProps) => {
  const setUser = useUserStore((state) => state.setUser)
  const setLoading = useUserStore((state) => state.setLoading)

  useEffect(() => {
    if (user) {
      setUser(user)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
