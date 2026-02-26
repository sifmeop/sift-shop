import Image from 'next/image'
import Link from 'next/link'

import { day } from '~/common/lib/dayjs'
import { WishlistProductEntity } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { Show } from '~/common/ui/show'
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
    <div className='flex items-center gap-6'>
      <Link
        href={productLink}
        className='size-20 bg-background rounded-md overflow-hidden relative p-3 grid place-items-center group'>
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
      <div className='flex flex-col gap-1 mr-auto'>
        <Link href={productLink} className='font-medium hover:underline'>
          {name}
        </Link>
        <span className='text-muted-foreground'>
          Added on: {day(addedAt).format('MMM DD, YYYY')}
        </span>
        <Show when={stock < 10}>
          <p className='text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1'>
            <span className='inline-block size-1.5 rounded-full bg-amber-500 animate-pulse' />
            Only {stock} left in stock
          </p>
        </Show>
        <Button
          variant='destructive'
          className='py-0.5 px-2 h-7'
          onClick={removeFromWishlist}
          isLoading={isLoading}
          loadingMode='spinner-only'>
          Remove from wishlist
        </Button>
      </div>
      {discountPercent ? (
        <div>
          <p className='text-sm text-muted-foreground line-through'>
            {formatPrice(price)}
          </p>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-base text-red-500'>
              {calcDiscountedPrice(price, discountPercent)}
            </p>
            <span className='text-xs font-medium bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full'>
              -{discountPercent}%
            </span>
          </div>
        </div>
      ) : (
        <p className='font-medium text-base'>{formatPrice(price)}</p>
      )}
      <Button
        variant='border'
        className='w-30'
        isLoading={isAdding}
        loadingMode='spinner-only'
        onClick={addToCart}>
        Add to Cart
      </Button>
    </div>
  )
}
