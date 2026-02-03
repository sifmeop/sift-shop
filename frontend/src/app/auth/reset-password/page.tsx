import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { ResetPasswordPage } from '~/screens/auth/reset-password'

interface PageProps {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const token = (await searchParams).token

  if (!token || token.length === 0) {
    redirect(ROUTES.FORGOT_PASSWORD)
  }

  return <ResetPasswordPage token={token} />
}
