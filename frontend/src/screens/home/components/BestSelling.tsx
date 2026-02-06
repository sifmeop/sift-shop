'use client'

import { motion } from 'motion/react'

import { bestSellingProducts } from '../data'

import { ProductCard } from './ProductCard'

export const BestSelling = () => {
  return (
    <section className='py-16 md:py-20'>
      <div className='app-container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-10 text-center'>
          <span className='text-muted-foreground mb-2 block text-xs font-medium uppercase tracking-wider'>
            Shop Now
          </span>
          <h2 className='text-foreground text-2xl font-bold md:text-3xl'>
            Best Selling
          </h2>
        </motion.div>

        <div className='grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4'>
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
