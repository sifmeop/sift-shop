'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Container } from '~/common/ui/container'
import { Separator } from '~/common/ui/separator'
import { cn } from '~/common/utils/cn'

import { useCartQuery } from '../hooks/useCartQuery'

import { CartItemList } from './CartItemList'
import { CartSummary } from './CartSummary'

export const Cart = () => {
  const { data, loading } = useCartQuery()

  if (loading) {
    return (
      <Container bgColor='white' className='py-12'>
        <CenterLoader />
      </Container>
    )
  }

  return (
    <Container
      main
      bgColor='white'
      className={cn('py-12', {
        'pb-30': data && data.cart.length > 0,
        'grid place-items-center': data && data.cart.length === 0
      })}>
      <AnimatePresence mode='wait'>
        {!data || data.cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='text-center space-y-4'>
            <h3 className='font-semibold text-base'>Your cart is empty</h3>
            <Button as={Link} variant='outline' href={ROUTES.HOME}>
              Continue shopping
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='grid grid-cols-[1fr_350px] gap-25 justify-between'>
            <div>
              <h3 className='mb-4 font-semibold text-base'>Your cart</h3>
              <Separator className='mb-8' />
              <CartItemList />
            </div>
            <CartSummary />
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  )
}
