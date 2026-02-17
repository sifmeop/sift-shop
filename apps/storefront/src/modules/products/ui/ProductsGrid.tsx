import { motion } from 'motion/react'

import type { ProductEntity } from '~/common/lib/graphql/generated/graphql'

import { ProductCard } from './ProductCard'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

interface ProductsGridProps {
  products: ProductEntity[]
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  if (products.length === 0) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center py-20'>
        <div className='text-center'>
          <h3 className='text-2xl font-semibold text-gray-900 dark:text-white'>
            No products found
          </h3>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            Try adjusting your filters or search query
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      variants={container}
      initial='hidden'
      animate='show'>
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
