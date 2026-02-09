import { use } from 'react'

import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { ResetPasswordPage } from '~/screens/auth/reset-password'

interface PageProps {
  searchParams: Promise<{
    token?: string
  }>
}

export default function Page({ searchParams }: PageProps) {
  const { token } = use(searchParams)

  if (!token || token.length === 0) {
    redirect(ROUTES.FORGOT_PASSWORD)
  }

  return <ResetPasswordPage token={token} />
}
