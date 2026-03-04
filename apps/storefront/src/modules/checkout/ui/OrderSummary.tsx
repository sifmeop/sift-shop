import { Fragment } from 'react/jsx-runtime'

import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/Button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Separator } from '~/common/ui/Separator'
import { Show } from '~/common/ui/Show'
import { formatPrice } from '~/common/utils/formatPrice'
import { useCartQuery } from '~/modules/cart'

const DELIVERY_PRICE = 10
const TAX_RATE = 0.1

export const OrderSummary = () => {
  const { data, loading } = useCartQuery()

  const subtotalAmount =
    data?.cart.reduce((acc, item) => {
      return acc + (item.discountedPrice ?? item.price) * item.quantity
    }, 0) ?? 0
  const deliveryAmount = subtotalAmount >= 100 ? 0 : DELIVERY_PRICE
  const discountAmount =
    data?.cart.reduce((acc, item) => {
      if (item.discountedPrice) {
        acc += (item.price - item.discountedPrice) * item.quantity
      }
      return acc
    }, 0) ?? 0
  const taxAmount =
    (subtotalAmount + deliveryAmount - discountAmount) * TAX_RATE
  const totalAmount =
    subtotalAmount + deliveryAmount - discountAmount + taxAmount

  return (
    <div className='flex-1 overflow-hidden'>
      <div className='flex items-center gap-4 justify-between mb-10'>
        <h3 className='font-semibold text-base'>Your Order</h3>
        <Button
          as={Link}
          href={ROUTES.CART}
          variant='secondary'
          className='px-6 h-8'>
          Edit Cart
        </Button>
      </div>
      <ul className='flex-1 space-y-3 mb-16'>
        <Show when={loading}>
          <CenterLoader />
        </Show>
        {data?.cart.map(
          ({ product, quantity, discountedPrice, price }, index) => (
            <Fragment key={product.id}>
              <li className='flex justify-between gap-3 group'>
                <div className='flex-1 min-w-0 overflow-hidden'>
                  <p className='text-sm font-medium leading-tight truncate'>
                    {product.name}
                  </p>
                  <p className='text-xs text-muted-foreground mt-0.5'>
                    x{quantity}
                  </p>
                </div>
                <div className='text-right shrink-0'>
                  <p className='font-medium'>
                    {formatPrice(discountedPrice ?? price)}
                  </p>
                  {quantity > 1 && (
                    <p className='text-xs text-muted-foreground'>
                      {formatPrice((discountedPrice ?? price) * quantity)}
                    </p>
                  )}
                </div>
              </li>
              {index !== data.cart.length - 1 && (
                <div className='border-t border-dotted border-border' />
              )}
            </Fragment>
          )
        )}
      </ul>
      <div className='space-y-3'>
        <div className='flex items-center justify-between font-medium'>
          <p className='text-muted-foreground'>Subtotal</p>
          <p>{formatPrice(subtotalAmount)}</p>
        </div>
        <div className='flex items-center justify-between font-medium'>
          <p className='text-muted-foreground'>Shipping</p>
          {deliveryAmount === 0 ? <p>Free</p> : formatPrice(deliveryAmount)}
        </div>
        <div className='flex items-center justify-between font-medium'>
          <p className='text-muted-foreground'>Tax</p>
          <p>{formatPrice(taxAmount)}</p>
        </div>
        <div className='flex items-center justify-between font-medium'>
          <p className='text-muted-foreground'>Discount</p>
          {discountAmount > 0 ? (
            <p className='text-red-500'>-{formatPrice(discountAmount)}</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
      <Separator className='my-6' />
      <div className='flex items-center justify-between font-medium'>
        <p>Total</p>
        <p className='text-base'>{formatPrice(totalAmount)}</p>
      </div>
    </div>
  )
}
