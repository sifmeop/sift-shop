'use client'

import { Fragment } from 'react/jsx-runtime'

import { ArrowRight, HeartIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

import { ROUTES } from '~/common/constants/routes'
import { Button } from '~/common/ui/button'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Separator } from '~/common/ui/separator'

import { useGetWishlistQuery } from '../hooks/useGetWishlistQuery'

import { WishlistItem } from './WishlistItem'

export const WishlistList = () => {
  const { data, loading, error } = useGetWishlistQuery()

  const items = data?.wishlist?.items

  if (error) {
    return (
      <p className='text-center font-medium'>
        Something went wrong, please try again later
      </p>
    )
  }

  if (!items || loading) {
    return <CenterLoader />
  }

  if (!items.length) {
    return (
      <div className='flex flex-col items-center justify-center px-4 text-center'>
        <div className='size-20 bg-muted rounded-full flex items-center justify-center mb-6'>
          <HeartIcon className='size-10 text-muted-foreground/60' />
        </div>

        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          Your wishlist is empty
        </h2>
        <p className='text-muted-foreground mt-2 max-w-75 mx-auto'>
          You haven&apos;t saved any items yet. Browse our collection and heart
          the things you love!
        </p>

        <Button
          as={Link}
          href={ROUTES.HOME}
          className='mt-8 inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3'>
          Explore Collection
          <ArrowRight className='size-4' />
        </Button>
      </div>
    )
  }

  return (
    <div>
      <AnimatePresence mode='popLayout'>
        {items.map(({ product, addedAt }, index) => (
          <Fragment key={product.id}>
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
              exit={{ opacity: 0, x: 20 }}>
              <WishlistItem {...product} addedAt={addedAt} />
            </motion.div>
            {index !== items.length - 1 && (
              <Separator className='my-5 sm:my-8' />
            )}
          </Fragment>
        ))}
      </AnimatePresence>
    </div>
  )
}
