'use client'

import { useState } from 'react'

import { Eye } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import type { ProductEntity } from '~/common/lib/graphql/generated/graphql'
import { calcDiscountedPrice } from '~/common/utils/calcDiscountedPrice'
import { cn } from '~/common/utils/cn'
import { formatPrice } from '~/common/utils/formatPrice'
import { getImageUrl } from '~/common/utils/getImageUrl'

import { QuantitySelector } from './QuantitySelector'
import { WishlistToggleButton } from './WishlistToggleButton'

interface ProductCardProps {
  product: ProductEntity
  minimal?: boolean
}

export const ProductCard = ({ product, minimal }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const productLink = `/products/${product.slug}`

  return (
    <motion.div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 h-full',
        {
          'grayscale-100': product.stock === 0
        }
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <Link
        href={productLink}
        className='relative aspect-square overflow-hidden bg-gray-100'>
        <Image
          loading='eager'
          src={getImageUrl(product.images[0])}
          alt={product.name}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-110 p-4'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />

        <div className='absolute left-3 top-3 flex flex-col gap-2'>
          {!product.stock && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white'>
              Out of Stock
            </span>
          )}
          {product.isFeatured && (
            <span className='rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white'>
              Featured
            </span>
          )}
          {product.discountPercent && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white'>
              -{product.discountPercent}%
            </span>
          )}
        </div>

        <motion.div
          className='absolute right-3 top-3 flex flex-col gap-2'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}>
          <WishlistToggleButton productId={product.id} variant='rounded' />

          <button
            aria-label='Quick view'
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <Eye className='h-5 w-5 text-gray-600 dark:text-gray-400' />
          </button>
        </motion.div>
      </Link>

      <div
        className={cn('flex flex-1 flex-col p-4', {
          'p-2': minimal
        })}>
        <Link
          href={productLink}
          className={cn(
            'line-clamp-2 text-base font-semibold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400 w-fit hover:underline mb-auto',
            {
              'text-sm': minimal
            }
          )}>
          {product.name}
        </Link>

        <div className='mt-1 flex items-baseline gap-2'>
          {product.discountPercent ? (
            <>
              <span
                className={cn('text-xl font-bold text-red-500', {
                  'text-base': minimal
                })}>
                {calcDiscountedPrice(product.price, product.discountPercent)}
              </span>
              <span
                className={cn('text-base text-muted-foreground line-through', {
                  'text-sm': minimal
                })}>
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span
              className={cn('text-xl font-bold', {
                'text-base': minimal
              })}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
      <QuantitySelector product={product} minimal={minimal} />
    </motion.div>
  )
}
