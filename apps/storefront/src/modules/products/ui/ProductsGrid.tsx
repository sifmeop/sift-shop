import { AnimatePresence, motion } from 'motion/react'

import type { ProductEntity } from '~/common/lib/graphql/generated/graphql'

import { ProductCard } from './ProductCard'

interface ProductsGridProps {
  products: ProductEntity[]
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  if (!products.length) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center py-16 sm:py-20'>
        <div className='text-center'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>
            No products found
          </h3>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base'>
            Try adjusting your filters or search query
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6'>
      <AnimatePresence mode='popLayout'>
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
