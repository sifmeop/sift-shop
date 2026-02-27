'use client'

import { LockIcon, ShoppingCartIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { useIsAuthenticated } from '~/common/hooks/useIsAuthenticated'
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
  const isAuthenticated = useIsAuthenticated()

  if (loading) {
    return (
      <Container bgColor='white' className='py-12 flex-1'>
        <CenterLoader />
      </Container>
    )
  }

  if (!isAuthenticated) {
    return (
      <Container bgColor='white' className='py-12 grid place-items-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='flex flex-col items-center justify-center py-16 px-4 text-center space-y-6'>
          <div className='w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 text-gray-400'>
            <LockIcon className='size-10' />
          </div>

          <div className='space-y-2'>
            <h3 className='text-2xl font-semibold text-gray-700'>
              Sign in to view your cart
            </h3>
            <p className='text-gray-500 max-w-xs'>
              Your cart is waiting for you. Sign in or create an account to
              start shopping.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <Button as={Link} href={ROUTES.SIGN_IN} className='px-6'>
              Sign in
            </Button>
            <Button
              as={Link}
              href={ROUTES.SIGN_UP}
              variant='outline'
              className='px-6'>
              Create account
            </Button>
          </div>
        </motion.div>
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
            className='flex flex-col items-center justify-center py-16 px-4 text-center space-y-6'>
            <div className='w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 text-gray-400'>
              <ShoppingCartIcon className='size-10' />
            </div>

            <h3 className='text-2xl font-semibold text-gray-700'>
              Your cart is empty
            </h3>
            <p className='text-gray-500 max-w-xs'>
              Looks like you haven’t added anything to your cart yet. Start
              shopping to fill it up!
            </p>

            <Button
              as={Link}
              variant='outline'
              href={ROUTES.HOME}
              className='px-6 py-3 rounded-md hover:bg-gray-100 hover:text-gray-900 transition'>
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
