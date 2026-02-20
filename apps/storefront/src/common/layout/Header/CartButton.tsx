'use client'

import NumberFlow from '@number-flow/react'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'

import { CART_BUTTON_ID } from '~/common/constants/ids'
import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { Show } from '~/common/ui/show'
import { useCartQuery } from '~/modules/cart'

export const CartButton = () => {
  const { data, loading } = useCartQuery()
  const cartItemsCount =
    data?.cart.reduce((total, item) => total + item.quantity, 0) ?? 0

  return (
    <Button
      id={CART_BUTTON_ID}
      as={Link}
      href={ROUTES.CART}
      variant='ghost'
      className='size-11.25 relative'>
      <ShoppingCartIcon className='size-6.5' strokeWidth={1.5} />
      <Show when={cartItemsCount > 0}>
        {loading ? (
          <span className='absolute top-1 right-0 flex size-4'>
            <span className='absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75' />
            <span className='absolute inline-flex size-full rounded-full bg-sky-500' />
          </span>
        ) : (
          <NumberFlow
            value={cartItemsCount}
            className='absolute top-1 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white'
          />
        )}
      </Show>
    </Button>
  )
}
