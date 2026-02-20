import { Fragment } from 'react/jsx-runtime'

import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Separator } from '~/common/ui/separator'
import { Show } from '~/common/ui/show'
import { formatPrice } from '~/common/utils/formatPrice'
import { useCartQuery } from '~/modules/cart'

export const OrderSummary = () => {
  const { data, loading } = useCartQuery()

  const subtotal =
    data?.cart.reduce((acc, item) => {
      return acc + (item.discountedPrice ?? item.price) * item.quantity
    }, 0) ?? 0
  const shipping = 0
  const tax = 3
  const total = subtotal + shipping + tax

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
                  <p className='font-medium'>{formatPrice(price)}</p>
                  {discountedPrice && (
                    <p className='text-xs text-muted-foreground line-through'>
                      {formatPrice(price * quantity)}
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
          <p>{formatPrice(subtotal)}</p>
        </div>
        <div className='flex items-center justify-between font-medium'>
          <p className='text-muted-foreground'>Shipping</p>
          {shipping === 0 ? <p>Free</p> : formatPrice(shipping)}
        </div>
        <div className='flex items-center justify-between font-medium'>
          <p className='text-muted-foreground'>Tax</p>
          <p>{formatPrice(tax)}</p>
        </div>
      </div>
      <Separator className='my-6' />
      <div className='flex items-center justify-between font-medium mb-8'>
        <p>Total</p>
        <p className='text-base'>{formatPrice(total)}</p>
      </div>
      <Button fullWidth type='submit'>
        Place Order
      </Button>
    </div>
  )
}
