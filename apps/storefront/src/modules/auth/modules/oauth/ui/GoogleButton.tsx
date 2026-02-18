import Image from 'next/image'

import { env } from '~/common/constants/env'
import { Button } from '~/common/ui/button'

export const GoogleButton = () => {
  const handleClick = async () => {
    window.location.href = env.NEXT_PUBLIC_API_URL + '/auth/google'
  }

  return (
    <Button fullWidth type='button' variant='outline' onClick={handleClick}>
      <Image
        width={24}
        height={24}
        src='/assets/icons/google.svg'
        alt='Continue with Google'
      />
      Continue with Google
    </Button>
  )
}
