'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { cn } from '~/common/utils/cn'

import { featuredProducts, latestProducts } from '../data'
import type { ProductTab } from '../types'

import { ProductCard } from './ProductCard'

const tabs: { id: ProductTab; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'latest', label: 'Latest' }
]

export const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>('featured')

  const products = activeTab === 'featured' ? featuredProducts : latestProducts

  return (
    <section className='py-16 md:py-20'>
      <div className='app-container'>
        <div className='mb-10 flex justify-center'>
          <div className='inline-flex gap-8'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative pb-2 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground/70'
                )}>
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId='activeTab'
                    className='bg-foreground absolute bottom-0 left-0 h-0.5 w-full'
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
