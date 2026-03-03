'use client'

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
  const productLink = `/products/${product.slug}`

  return (
    <motion.div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 h-full',
        {
          'grayscale-100': product.stock === 0
        }
      )}
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
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
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
          className='absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100'
          initial={false}
          animate={{ x: 0 }}
          transition={{ duration: 0.2 }}>
          <WishlistToggleButton productId={product.id} variant='rounded' />

          <button
            aria-label='Quick view'
            className='flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 sm:h-10 sm:w-10'>
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
            'mb-auto line-clamp-2 w-fit text-sm font-semibold text-gray-900 transition-colors hover:text-blue-600 hover:underline dark:text-white dark:hover:text-blue-400 sm:text-base',
            {
              'text-sm': minimal
            }
          )}>
          {product.name}
        </Link>

        <div className='mt-1 flex flex-wrap items-baseline gap-1.5 sm:gap-2'>
          {product.discountPercent ? (
            <>
              <span
                className={cn('text-lg font-bold text-red-500 sm:text-xl', {
                  'text-base': minimal
                })}>
                {calcDiscountedPrice(product.price, product.discountPercent)}
              </span>
              <span
                className={cn('text-sm text-muted-foreground line-through sm:text-base', {
                  'text-sm': minimal
                })}>
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span
              className={cn('text-lg font-bold sm:text-xl', {
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
