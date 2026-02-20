import NumberFlow from '@number-flow/react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { Separator } from '~/common/ui/separator'
import { FORMAT_PRICE_OPTIONS } from '~/common/utils/formatPrice'

import { useCartQuery } from '../hooks/useCartQuery'

export const CartSummary = () => {
  const { data } = useCartQuery()

  const total =
    data?.cart.reduce((acc, item) => {
      return acc + (item.discountedPrice ?? item.price) * item.quantity
    }, 0) ?? 0

  return (
    <div className='rounded-md py-8 px-6 border border-border sticky top-4 h-fit'>
      <p className='font-semibold text-base'>Order Summary</p>
      <Separator className='my-6' />
      <div className='flex items-center justify-between font-medium mb-8'>
        <p>Total</p>
        <NumberFlow
          locales='en-US'
          value={total}
          format={FORMAT_PRICE_OPTIONS}
        />
      </div>
      <Button fullWidth as={Link} href={ROUTES.CHECKOUT} className='mb-6'>
        Checkout
      </Button>
      <Link href={ROUTES.HOME} className='hover:underline text-center block'>
        Continue Shopping
      </Link>
    </div>
  )
}
