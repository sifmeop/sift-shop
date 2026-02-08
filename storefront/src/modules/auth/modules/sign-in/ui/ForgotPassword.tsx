import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'

export const ForgotPassword = () => {
  return (
    <Link
      href={ROUTES.FORGOT_PASSWORD}
      className='font-medium text-[12px] block ml-auto px-2 rounded-md hover:bg-muted transition-colors py-1 w-fit mb-6'>
      Forgot Password?
    </Link>
  )
}
