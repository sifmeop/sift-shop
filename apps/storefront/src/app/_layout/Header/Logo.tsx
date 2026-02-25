import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'

export const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className='flex items-center gap-3'>
      <Image
        width={40}
        height={40}
        src='/assets/images/logo.webp'
        alt='Sift-Shop'
        className='size-10'
      />
      <span className='font-extrabold text-xl tracking-[-3.5%]'>Sift-Shop</span>
    </Link>
  )
}
