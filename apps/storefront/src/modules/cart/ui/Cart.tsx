'use client'

import { CenterLoader } from '~/common/ui/CenterLoader'
import { Container } from '~/common/ui/container'
import { Separator } from '~/common/ui/separator'

import { useCartQuery } from '../hooks/useCartQuery'

import { CartItemList } from './CartItemList'
import { CartSummary } from './CartSummary'

export const Cart = () => {
  const { data, loading } = useCartQuery()

  if (loading) {
    return <CenterLoader />
  }

  if (!data || data.cart.length === 0) {
    return (
      <Container bgColor='white' className='py-12'>
        <h3 className='font-semibold text-base text-center'>
          Your cart is empty
        </h3>
      </Container>
    )
  }

  return (
    <Container
      bgColor='white'
      className='py-12'
      innerClassName='grid grid-cols-[1fr_350px] gap-[100px] justify-between'>
      <div>
        <h3 className='mb-4 font-semibold text-base'>Your cart</h3>
        <Separator className='mb-12' />
        <CartItemList />
      </div>
      <CartSummary />
    </Container>
  )
}
