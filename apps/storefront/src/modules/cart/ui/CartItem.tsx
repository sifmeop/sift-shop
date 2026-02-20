import NumberFlow from '@number-flow/react'
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { CartItemEntity } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { calcDiscountPercent } from '~/common/utils/calcDiscountPercent'
import { formatPrice } from '~/common/utils/formatPrice'
import { getImageUrl } from '~/common/utils/getImageUrl'

import { useCart } from '../hooks/useCart'

interface CartItemProps {
  item: CartItemEntity
}

export const CartItem = ({ item }: CartItemProps) => {
  const { price, discountedPrice, product } = item
  const {
    addToCart,
    removeFromCart,
    removeAllFromCart,
    isLoading,
    isAdding,
    isRemoving,
    isRemovingAll
  } = useCart(item.product)

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
        <Link
          href={`/products/${product.slug}`}
          className='font-medium hover:underline'>
          {product.name}
        </Link>
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
        <div className='rounded-md px-3 py-2 grid grid-cols-[2fr_1fr_2fr] items-center gap-3 border border-border'>
          <Button
            variant='ghost'
            className='size-4 p-3'
            onClick={() => removeFromCart(1)}
            disabled={isLoading}
            isLoading={isRemoving}
            loadingMode='spinner-only'>
            <MinusIcon />
          </Button>
          <NumberFlow value={item.quantity} className='text-center' />
          <Button
            variant='ghost'
            className='size-4 p-3'
            onClick={addToCart}
            disabled={isLoading}
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
