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
      className='group'>
      <Link href={`/products/${product.slug}`} className='block'>
        <div className='bg-muted relative aspect-square overflow-hidden rounded-lg p-4'>
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-110 p-4'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        <div className='mt-4'>
          <h3 className='text-foreground text-sm font-medium transition-colors group-hover:underline group-hover:text-blue-500'>
            {product.name}
          </h3>

          <div className='mt-2 flex items-center gap-3'>
            <span className='bg-muted text-muted-foreground rounded px-2 py-0.5 text-xs font-medium uppercase'>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.discountPercent ? (
              <>
                <span className='text-base font-bold text-red-500'>
                  {calcDiscountedPrice(product.price, product.discountPercent)}
                </span>
                <span className='text-muted-foreground line-through'>
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className='text-2xl font-semibold'>
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
