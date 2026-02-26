import NumberFlow from '@number-flow/react'
import { TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { Separator } from '~/common/ui/separator'
import { cn } from '~/common/utils/cn'
import { FORMAT_PRICE_OPTIONS } from '~/common/utils/formatPrice'

import { useCartQuery } from '../hooks/useCartQuery'

export const CartSummary = () => {
  const { data } = useCartQuery()

  const total =
    data?.cart.reduce((acc, item) => {
      return acc + (item.discountedPrice ?? item.price) * item.quantity
    }, 0) ?? 0

  const isPriceChanged = data?.cart.some((i) => i.isPriceChanged)

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
      <Button
        fullWidth
        as={Link}
        href={ROUTES.CHECKOUT}
        className={cn('mb-6', {
          'pointer-events-none opacity-50 cursor-not-allowed': isPriceChanged
        })}>
        Checkout
      </Button>
      <Link
        href={ROUTES.HOME}
        className='hover:underline text-center block mb-2'>
        Continue Shopping
      </Link>
      {isPriceChanged && (
        <div className='flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800'>
          <TriangleAlertIcon className='size-4 text-amber-500 shrink-0 mt-0.5' />
          <p className='text-xs text-amber-700 dark:text-amber-400 leading-relaxed'>
            Some item prices have changed. Refresh your cart to see the latest
            prices.
          </p>
        </div>
      )}
    </div>
  )
}
