import {
  LockIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { ProductDetailEntity } from '~/common/lib/graphql/generated/graphql'
import { Badge } from '~/common/ui/Badge'
import { Button } from '~/common/ui/button'
import { Container } from '~/common/ui/container'
import { calcDiscountedPrice } from '~/common/utils/calcDiscountedPrice'
import { formatPrice } from '~/common/utils/formatPrice'
import { useCart } from '~/modules/cart'
import { WishlistToggleButton } from '~/modules/products'

type ProductInfoProps = ProductDetailEntity

export const ProductInfo = ({
  id,
  name,
  stock,
  price,
  discountPercent,
  reviewCount,
  rating
}: ProductInfoProps) => {
  const router = useRouter()
  const { addToCart, isAdding, quantity, isInitialLoading } = useCart(id, stock)

  const inCart = quantity > 0
  const hasStock = stock > 0

  const handleAddToCart = () => {
    if (inCart) {
      router.push(ROUTES.CART)
      return
    }

    addToCart()
  }

  return (
    <Container
      bgColor='white'
      className='rounded-lg'
      innerClassName='py-4 sm:py-5'>
      <h2 className='mb-3 line-clamp-2 text-xl font-bold sm:text-2xl'>{name}</h2>
      <div className='mb-5 flex flex-wrap gap-2 font-medium sm:mb-6'>
        <Badge variant='secondary' className='h-6 max-w-full'>
          <StarIcon />
          {rating} - {reviewCount} Reviews
        </Badge>
        <Badge variant={hasStock ? 'outline' : 'destructive'} className='h-6'>
          {hasStock ? 'IN STOCK' : 'OUT OF STOCK'}
        </Badge>
      </div>
      <div className='mb-6 flex flex-wrap items-baseline gap-2 sm:mb-8'>
        {discountPercent ? (
          <>
            <span className='text-lg font-bold text-red-500 sm:text-xl'>
              {calcDiscountedPrice(price, discountPercent)}
            </span>
            <span className='text-sm text-muted-foreground line-through sm:text-base'>
              {formatPrice(price)}
            </span>
            <span className='inline-flex rounded-xl border border-green-500 bg-green-500/10 px-2 py-0.5 text-xs text-green-500'>
              Save {discountPercent}%
            </span>
          </>
        ) : (
          <span className='text-xl font-semibold sm:text-2xl'>
            {formatPrice(price)}
          </span>
        )}
      </div>
      <div className='mb-3 flex flex-col gap-2 sm:flex-row sm:gap-3'>
        <Button
          variant={inCart ? 'outline' : 'default'}
          className='w-full sm:max-w-62.5'
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0 || quantity === stock}
          isLoading={isAdding || isInitialLoading}
          loadingMode='spinner-only'>
          {inCart ? 'In cart' : 'Add to cart'}
        </Button>
        <WishlistToggleButton
          productId={id}
          variant='square'
          className='h-11 w-full sm:w-11'
        />
      </div>
      <div className='mt-4 grid grid-cols-1 gap-2 border-t border-border pt-4 sm:grid-cols-2'>
        {[
          { icon: ShieldCheckIcon, text: '1 Year Warranty' },
          { icon: RotateCcwIcon, text: '30-Day Returns' },
          { icon: TruckIcon, text: 'Free Shipping $100+' },
          { icon: LockIcon, text: 'Secure Checkout' }
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className='flex items-center gap-2 text-xs text-muted-foreground'>
            <Icon className='size-4 shrink-0' />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </Container>
  )
}
