import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react'
import { motion } from 'motion/react'
import { toast } from 'sonner'

import { ProductEntity } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { Input } from '~/common/ui/input'
import { Spinner } from '~/common/ui/spinner'
import {
  useAddToCartMutation,
  useCartQuery,
  useRemoveFromCartMutation
} from '~/modules/cart'

interface QuantitySelectorProps {
  isHovered: boolean
  product: ProductEntity
}

export const QuantitySelector = ({
  product,
  isHovered
}: QuantitySelectorProps) => {
  const { data, loading } = useCartQuery()
  const cartItem = data?.cart.find((item) => item.product.id === product.id)

  const [addToCart, { loading: addToCartLoading }] = useAddToCartMutation()
  const [removeFromCart, { loading: removeFromCartLoading }] =
    useRemoveFromCartMutation()

  const isLoading = loading || addToCartLoading || removeFromCartLoading
  const quantity = cartItem ? cartItem.quantity : 0
  const isVisible = quantity > 0 || addToCartLoading

  const handleAddToCart = async () => {
    if (isLoading) return

    const isAddingMoreThanStock = quantity + 1 > product.stock

    if (isAddingMoreThanStock) {
      toast.error('Cannot add more items than available in stock.')
      return
    }

    try {
      await addToCart({
        variables: {
          input: { productId: product.id }
        }
      })
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  const handleRemoveFromCart = async () => {
    if (!cartItem || isLoading) return

    try {
      await removeFromCart({
        variables: {
          input: { id: cartItem.id }
        }
      })
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    }
  }

  return (
    <motion.div
      className='absolute bottom-0 left-0 right-0'
      initial={{ y: isVisible ? 0 : 100 }}
      animate={{ y: isVisible ? 0 : isHovered ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}>
      {!loading && quantity > 0 ? (
        <div className='grid grid-cols-[34px_1fr_34px] gap-2 bg-card px-2 py-1 font-medium border-b border-b-border border-t border-t-border'>
          <Button
            variant='ghost'
            className='size-full aspect-square'
            onClick={handleRemoveFromCart}
            disabled={isLoading}>
            {removeFromCartLoading ? <Spinner /> : <MinusIcon />}
          </Button>
          <Input
            value={quantity}
            className='h-full text-center border-none shadow-none py-2 pointer-events-none'
            readOnly
          />
          <Button
            variant='ghost'
            className='size-full aspect-square'
            onClick={handleAddToCart}
            disabled={isLoading}>
            {addToCartLoading ? <Spinner className='size-6' /> : <PlusIcon />}
          </Button>
        </div>
      ) : (
        <Button
          fullWidth
          aria-label='Add to cart'
          className='rounded-none font-medium border-none'
          onClick={handleAddToCart}
          disabled={!product.stock}>
          {loading || addToCartLoading ? (
            <Spinner className='size-6' />
          ) : (
            <>
              <ShoppingCart className='mr-2 inline h-5 w-5' />
              {product.stock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </Button>
      )}
    </motion.div>
  )
}
