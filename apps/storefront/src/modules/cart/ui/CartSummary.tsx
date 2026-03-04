import NumberFlow from '@number-flow/react'
import { TriangleAlert } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/Button'
import { Separator } from '~/common/ui/Separator'
import { cn } from '~/common/utils/cn'
import { FORMAT_PRICE_OPTIONS } from '~/common/utils/formatPrice'

import { useCartQuery } from '../hooks/useCartQuery'

export const CartSummary = () => {
  const { data } = useCartQuery()

  const total =
    data?.cart.reduce((acc, item) => {
      return acc + (item.discountedPrice ?? item.price) * item.quantity
    }, 0) ?? 0

  const outOfStockItems =
    data?.cart.filter((item) => item.product.stock === 0) ?? []
  const hasPriceChanges = data?.cart.some((item) => item.isPriceChanged)

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
          'pointer-events-none opacity-50 cursor-not-allowed':
            hasPriceChanges || outOfStockItems.length > 0
        })}>
        Checkout
      </Button>
      <Link
        href={ROUTES.HOME}
        className='hover:underline text-center block mb-2'>
        Continue Shopping
      </Link>
      {hasPriceChanges && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800'>
          <TriangleAlert className='size-4 text-amber-500 shrink-0 mt-0.5' />
          <p className='text-xs text-amber-700 dark:text-amber-400 leading-relaxed'>
            Some item prices have changed since you added them to your cart.
          </p>
        </motion.div>
      )}

      {outOfStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20'>
          <TriangleAlert className='size-4 text-destructive shrink-0 mt-0.5' />
          <p className='text-xs text-destructive leading-relaxed'>
            {outOfStockItems.length === 1
              ? `"${outOfStockItems[0].product.name}" is out of stock and won't be included in your order.`
              : `${outOfStockItems.length} items are out of stock and won't be included in your order.`}
          </p>
        </motion.div>
      )}
    </div>
  )
}
