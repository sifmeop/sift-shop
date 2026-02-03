'use client'

import { ResetPasswordForm } from '~/modules/auth'

interface ResetPasswordPageProps {
  token: string
}

export const ResetPasswordPage = ({ token }: ResetPasswordPageProps) => {
  return <ResetPasswordForm token={token} />
}
