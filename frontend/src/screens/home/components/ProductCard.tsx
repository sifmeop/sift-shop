'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className='group'>
      <Link href={`/products/${product.id}`} className='block'>
        <div className='bg-muted relative aspect-square overflow-hidden rounded-lg'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </div>

        <div className='mt-4'>
          <h3 className='text-foreground text-sm font-medium transition-colors group-hover:text-primary'>
            {product.name}
          </h3>

          <div className='mt-2 flex items-center gap-3'>
            <span className='bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs font-medium uppercase'>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className='text-foreground text-sm font-semibold'>
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
