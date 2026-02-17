import { useState } from 'react'

import { Eye, Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { env } from '~/common/constants/env'
import type { GetProductsQuery } from '~/common/lib/graphql/generated/graphql'
import { formatPrice } from '~/common/utils/formatPrice'

type Product = GetProductsQuery['products']['products'][0]

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const productLink = `/products/${product.slug}`
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) *
          100
      )
    : 0

  return (
    <motion.div
      className='group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 h-full'
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <Link
        href={productLink}
        className='relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800'>
        <Image
          src={env.NEXT_PUBLIC_IMAGE_BASE_URL + product.images[0]}
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
          {hasDiscount && (
            <span className='rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white'>
              -{discountPercent}%
            </span>
          )}
        </div>

        <motion.div
          className='absolute right-3 top-3 flex flex-col gap-2'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            aria-label='Add to favorites'
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/products/${product.slug}`)
            }}
            aria-label='Quick view'
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <Eye className='h-5 w-5 text-gray-600 dark:text-gray-400' />
          </button>
        </motion.div>

        <motion.div
          className='absolute bottom-0 left-0 right-0'
          initial={{ y: 100 }}
          animate={{ y: isHovered ? 0 : 100 }}
          transition={{ duration: 0.3 }}>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // TODO: Add to cart logic
              console.log('Add to cart:', product.id)
            }}
            disabled={!product.stock}
            aria-label='Add to cart'
            className='w-full bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'>
            <ShoppingCart className='mr-2 inline h-5 w-5' />
            {product.stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </motion.div>
      </Link>

      <div className='flex flex-1 flex-col p-4'>
        <Link
          href={productLink}
          className='line-clamp-2 text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400 w-fit hover:underline mb-auto'>
          {product.name}
        </Link>

        <div className='mt-1 flex items-baseline gap-2'>
          <span className='text-2xl font-bold text-gray-900 dark:text-white'>
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className='text-lg text-gray-500 line-through dark:text-gray-400'>
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
