import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'

export const FirstOrderBanner = () => {
  return (
    <div className='bg-foreground py-2 px-4'>
      <p className='leading-[175%] text-white text-center'>
        Get 25% OFF on your first order.{' '}
        <Link href={ROUTES.CATEGORY} className='font-medium hover:underline'>
          Order Now
        </Link>
      </p>
    </div>
  )
}
