import NumberFlow from '@number-flow/react'
import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { ProductEntity } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { Spinner } from '~/common/ui/spinner'
import { useCart } from '~/modules/cart'

interface QuantitySelectorProps {
  product: ProductEntity
}

export const QuantitySelector = ({ product }: QuantitySelectorProps) => {
  const {
    addToCart,
    removeFromCart,
    isLoading,
    isInitialLoading,
    isAdding,
    isRemoving,
    quantity
  } = useCart(product)

  return (
    <AnimatePresence mode='wait'>
      {!isInitialLoading && quantity > 0 ? (
        <motion.div
          key='counter'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className='grid grid-cols-[2fr_3fr_2fr] gap-2 px-2 py-1 font-medium border-t border-t-border items-center h-11 bg-background'>
          <Button
            variant='ghost'
            className='h-full'
            onClick={() => removeFromCart(1)}
            disabled={isLoading}>
            {isRemoving ? <Spinner /> : <MinusIcon />}
          </Button>
          <NumberFlow value={quantity} className='text-center' />
          <Button
            variant='ghost'
            className='h-full'
            onClick={addToCart}
            disabled={isLoading}>
            {isAdding ? <Spinner className='size-6' /> : <PlusIcon />}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key='add-to-cart'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}>
          <Button
            fullWidth
            aria-label='Add to cart'
            className='rounded-none font-medium border-none h-11'
            onClick={addToCart}
            isLoading={isInitialLoading || isAdding}
            loadingMode='spinner-only'
            disabled={!product.stock}>
            <ShoppingCart className='mr-2 inline size-5.5' />
            {product.stock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
