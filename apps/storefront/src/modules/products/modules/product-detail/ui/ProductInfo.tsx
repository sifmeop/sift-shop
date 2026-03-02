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
    <Container bgColor='white' className='rounded-lg' innerClassName='py-4'>
      <h2 className='font-bold text-2xl mb-3 line-clamp-2'>{name}</h2>
      <div className='flex gap-2 font-medium mb-6'>
        <Badge variant='secondary' className='h-5.5'>
          <StarIcon />
          {rating} — {reviewCount} Reviews
        </Badge>
        <Badge variant={hasStock ? 'outline' : 'destructive'} className='h-5.5'>
          {hasStock ? 'IN STOCK' : 'OUT OF STOCK'}
        </Badge>
      </div>
      <div className='flex items-baseline gap-2 mb-8'>
        {discountPercent ? (
          <>
            <span className='text-xl font-bold text-red-500'>
              {calcDiscountedPrice(price, discountPercent)}
            </span>
            <span className='text-base text-muted-foreground line-through'>
              {formatPrice(price)}
            </span>
            <span className='text-xs inline-flex text-green-500 bg-green-500/10 px-2 py-0.5 rounded-xl border border-green-500 -translate-y-px'>
              Save {discountPercent}%
            </span>
          </>
        ) : (
          <span className='text-2xl font-semibold'>{formatPrice(price)}</span>
        )}
      </div>
      <div className='mb-3 flex gap-3'>
        <Button
          variant={inCart ? 'outline' : 'default'}
          className='max-w-62.5 w-full'
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0 || quantity === stock}
          isLoading={isAdding || isInitialLoading}
          loadingMode='spinner-only'>
          {inCart ? 'In cart' : 'Add to cart'}
        </Button>
        <WishlistToggleButton
          productId={id}
          variant='square'
          className='h-11'
        />
      </div>
      <div className='grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border'>
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
