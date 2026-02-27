import NumberFlow from '@number-flow/react'
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { CartItemEntity } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { calcDiscountPercent } from '~/common/utils/calcDiscountPercent'
import { cn } from '~/common/utils/cn'
import { formatPrice } from '~/common/utils/formatPrice'
import { getImageUrl } from '~/common/utils/getImageUrl'

import { useCart } from '../hooks/useCart'

interface CartItemProps {
  item: CartItemEntity
}

export const CartItem = ({ item }: CartItemProps) => {
  const { price, discountedPrice, product, isPriceChanged } = item
  const {
    addToCart,
    removeFromCart,
    removeAllFromCart,
    isLoading,
    isAdding,
    isRemoving,
    isRemovingAll
  } = useCart(product.id, product.stock)

  return (
    <div className='flex items-center gap-4 justify-between px-4 py-2'>
      <div className='flex items-center gap-6'>
        <div className='size-20 bg-background rounded-md overflow-hidden relative p-3 grid place-items-center'>
          <Image
            width={64}
            height={64}
            className='object-cover transition-transform duration-500'
            src={getImageUrl(product.images[0])}
            alt={product.name}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Link
            href={`/products/${product.slug}`}
            className='font-medium hover:underline'>
            {product.name}
          </Link>
          {isPriceChanged && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400'>
              <span className='size-1.5 rounded-full bg-amber-500 animate-pulse inline-block shrink-0' />
              Price updated since added
            </motion.p>
          )}
          {product.stock === 0 && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-1.5 text-xs text-destructive'>
              <span className='size-1.5 rounded-full bg-destructive animate-pulse inline-block shrink-0' />
              Out of stock
            </motion.p>
          )}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        {discountedPrice ? (
          <div>
            <p className='text-sm text-muted-foreground line-through'>
              {formatPrice(price)}
            </p>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-base text-red-500'>
                {formatPrice(discountedPrice)}
              </p>
              <span className='text-xs font-medium bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full'>
                -{calcDiscountPercent(price, discountedPrice)}%
              </span>
            </div>
          </div>
        ) : (
          <p className='font-medium text-base'>{formatPrice(price)}</p>
        )}
        <div
          className={cn(
            'rounded-md p-1 grid grid-cols-[2fr_1fr_2fr] items-center gap-3 border border-border',
            {
              'opacity-50 cursor-not-allowed': product.stock === 0
            }
          )}>
          <Button
            variant='ghost'
            className='size-4 p-3.5'
            onClick={() => removeFromCart(1)}
            disabled={isLoading || product.stock === 0}
            isLoading={isRemoving}
            loadingMode='spinner-only'>
            <MinusIcon />
          </Button>
          <NumberFlow value={item.quantity} className='text-center' />
          <Button
            variant='ghost'
            className='size-4 p-3.5'
            onClick={addToCart}
            disabled={isLoading || product.stock === 0}
            isLoading={isAdding}
            loadingMode='spinner-only'>
            <PlusIcon />
          </Button>
        </div>
        <Button
          variant='outline'
          className='size-10'
          onClick={removeAllFromCart}
          disabled={isLoading}
          isLoading={isRemovingAll}
          loadingMode='spinner-only'>
          <XIcon />
        </Button>
      </div>
    </div>
  )
}
