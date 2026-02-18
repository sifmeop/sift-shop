'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
import { useUserStore } from '~/common/stores/user'
import { FullScreenLoader } from '~/common/ui/FullScreenLoader'

import { ProfileLayout } from './_layout/ProfileLayout'

export default function Layout({ children }: React.PropsWithChildren) {
  const isAuthenticated = useIsAuthenticated()
  const isLoading = useUserStore((state) => state.isLoading)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.SIGN_IN)
    }
  }, [isAuthenticated, isLoading])

  if (isLoading || !isAuthenticated) {
    return <FullScreenLoader />
  }

  return <ProfileLayout>{children}</ProfileLayout>
}
