'use client'

import { AnimatePresence, motion } from 'motion/react'

import { ProductEntity } from '~/common/lib/graphql/generated/graphql'

import { ProductCard } from './ProductCard'

interface FeaturedProductsProps {
  data?: ProductEntity[]
}

export const FeaturedProducts = ({ data }: FeaturedProductsProps) => {
  if (!data || data.length === 0) return

  return (
    <section className='py-12 md:py-16 lg:py-20'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='mb-8 text-center md:mb-10'>
        <span className='text-muted-foreground mb-2 block text-xs font-medium uppercase tracking-wider'>
          Shop Now
        </span>
        <h2 className='text-foreground text-2xl font-bold sm:text-3xl'>
          Featured
        </h2>
      </motion.div>

      <div className='app-container'>
        <AnimatePresence mode='wait'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4'>
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
