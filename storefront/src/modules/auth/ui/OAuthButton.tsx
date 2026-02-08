import Image from 'next/image'

import { Button } from '~/common/ui/button'

type Provider = 'google'

interface OAuthButtonProps {
  provider: Provider
}

const variants = {
  google: {
    iconSrc: '/assets/icons/google.svg',
    text: 'Continue with Google'
  }
} as const

export const OAuthButton = ({ provider }: OAuthButtonProps) => {
  const { iconSrc, text } = variants[provider]

  return (
    <Button fullWidth type='button' variant='outline'>
      <Image width={24} height={24} src={iconSrc} alt={text} />
      {text}
    </Button>
  )
}
