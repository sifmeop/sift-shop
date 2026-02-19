import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { EmailConfirmationPage } from '~/screens/auth/email-confirmation'

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const { token } = await searchParams

  if (!token) {
    redirect(ROUTES.SIGN_IN)
  }

  return <EmailConfirmationPage token={token} />
}
