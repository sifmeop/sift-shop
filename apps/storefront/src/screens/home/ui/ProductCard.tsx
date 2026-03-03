'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { ProductEntity } from '~/common/lib/graphql/generated/graphql'
import { calcDiscountedPrice } from '~/common/utils/calcDiscountedPrice'
import { formatPrice } from '~/common/utils/formatPrice'
import { getImageUrl } from '~/common/utils/getImageUrl'

interface ProductCardProps {
  product: ProductEntity
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className='group h-full'>
      <Link href={`/products/${product.slug}`} className='block'>
        <div className='bg-muted relative aspect-square overflow-hidden rounded-lg p-4'>
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-110 p-4'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          />
        </div>

        <div className='mt-3 sm:mt-4'>
          <h3 className='text-foreground line-clamp-2 min-h-10 text-sm font-medium transition-colors group-hover:text-blue-500 group-hover:underline sm:min-h-12 sm:text-base'>
            {product.name}
          </h3>

          <div className='mt-2 flex flex-wrap items-center gap-2 sm:gap-3'>
            <span className='bg-muted text-muted-foreground rounded px-2 py-0.5 text-[10px] font-medium uppercase sm:text-xs'>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.discountPercent ? (
              <>
                <span className='text-sm font-bold text-red-500 sm:text-base'>
                  {calcDiscountedPrice(product.price, product.discountPercent)}
                </span>
                <span className='text-muted-foreground text-sm line-through'>
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className='text-lg font-semibold sm:text-2xl'>
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
