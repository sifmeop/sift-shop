'use client'

import { motion } from 'motion/react'

import { ProductEntity } from '~/common/lib/graphql/generated/graphql'

import { ProductCard } from './ProductCard'

interface BestSellingProps {
  data?: ProductEntity[]
}

export const BestSelling = ({ data }: BestSellingProps) => {
  if (!data || data.length === 0) return

  return (
    <section className='py-12 md:py-16 lg:py-20'>
      <div className='app-container'>
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
            Best Selling
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4'>
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
