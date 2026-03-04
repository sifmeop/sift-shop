import Image from 'next/image'
import Link from 'next/link'

import { day } from '~/common/lib/dayjs'
import { WishlistProductEntity } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/Button'
import { Show } from '~/common/ui/Show'
import { calcDiscountedPrice } from '~/common/utils/calcDiscountedPrice'
import { formatPrice } from '~/common/utils/formatPrice'
import { getImageUrl } from '~/common/utils/getImageUrl'
import { useCart } from '~/modules/cart'

import { useWishlist } from '../hooks/useWishlist'

type WishlistItemProps = WishlistProductEntity & {
  addedAt: string
}

export const WishlistItem = ({
  id,
  slug,
  name,
  price,
  discountPercent,
  stock,
  images,
  addedAt
}: WishlistItemProps) => {
  const { isLoading, removeFromWishlist } = useWishlist(id)
  const { isAdding, addToCart, quantity } = useCart(id, stock)

  const productLink = `/products/${slug}`

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
      <Link
        href={productLink}
        className='relative grid size-20 place-items-center overflow-hidden rounded-md bg-background p-3 group'>
        <Image
          width={64}
          height={64}
          src={getImageUrl(images[0])}
          alt={name}
          className='object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <Show when={quantity > 0}>
          <span className='absolute top-1 right-1 min-w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center'>
            {quantity}
          </span>
        </Show>
      </Link>
      <div className='mr-auto flex w-full flex-col gap-1 sm:w-auto'>
        <Link href={productLink} className='font-medium hover:underline'>
          {name}
        </Link>
        <span className='text-sm text-muted-foreground'>
          Added on: {day(addedAt).format('MMM DD, YYYY')}
        </span>
        <Show when={stock < 10}>
          <p className='flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400'>
            <span className='inline-block size-1.5 rounded-full bg-amber-500 animate-pulse' />
            Only {stock} left in stock
          </p>
        </Show>
        <Button
          variant='destructive'
          className='h-7 w-fit px-2 py-0.5'
          onClick={removeFromWishlist}
          isLoading={isLoading}
          loadingMode='spinner-only'>
          Remove from wishlist
        </Button>
      </div>
      <div className='flex w-full items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end sm:justify-center'>
        {discountPercent ? (
          <div className='sm:text-right'>
            <p className='text-sm text-muted-foreground line-through'>
              {formatPrice(price)}
            </p>
            <div className='flex items-center gap-2 sm:justify-end'>
              <p className='text-base font-semibold text-red-500'>
                {calcDiscountedPrice(price, discountPercent)}
              </p>
              <span className='rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-500'>
                -{discountPercent}%
              </span>
            </div>
          </div>
        ) : (
          <p className='text-base font-medium'>{formatPrice(price)}</p>
        )}
      </div>
      <Button
        variant='border'
        className='w-full sm:w-30'
        isLoading={isAdding}
        loadingMode='spinner-only'
        onClick={addToCart}>
        Add to Cart
      </Button>
    </div>
  )
}
