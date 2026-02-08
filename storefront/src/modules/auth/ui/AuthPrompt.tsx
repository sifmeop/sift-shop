import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'

type Variant = 'signIn' | 'signUp'

interface AuthPromptProps {
  variant: Variant
}

const variants = {
  signUp: {
    text: 'Already have an account? Log in',
    href: ROUTES.SIGN_IN
  },
  signIn: {
    text: "Don't have an account? Sign up",
    href: ROUTES.SIGN_UP
  }
} as const

export const AuthPrompt = ({ variant }: AuthPromptProps) => {
  const { text, href } = variants[variant]

  return (
    <Link
      href={href}
      className='text-center block mx-auto text-foreground-70 px-2 rounded-md hover:bg-muted transition-colors py-1 w-fit'>
      {text}
    </Link>
  )
}
