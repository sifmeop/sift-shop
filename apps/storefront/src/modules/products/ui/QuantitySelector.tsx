import { useState } from 'react'

import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react'
import { motion } from 'motion/react'

import { ProductEntity } from '~/common/lib/graphql/generated/graphql'
import { Button } from '~/common/ui/button'
import { Input } from '~/common/ui/input'

import { useCart } from '../hooks/useCart'

interface QuantitySelectorProps {
  isHovered: boolean
  product: ProductEntity
}

export const QuantitySelector = ({
  product,
  isHovered
}: QuantitySelectorProps) => {
  const [counts, setCounts] = useState(0)
  const { addToCart, removeFromCart } = useCart(setCounts)

  return (
    <motion.div
      className='absolute bottom-0 left-0 right-0'
      initial={{ y: counts > 0 ? 0 : 100 }}
      animate={{ y: counts > 0 ? 0 : isHovered ? 0 : 100 }}
      transition={{ duration: 0.3 }}>
      {counts > 0 ? (
        <div className='grid grid-cols-[40px_1fr_40px] gap-2 bg-card p-3 font-medium border-b border-b-border'>
          <Button className='size-full' onClick={addToCart}>
            <PlusIcon />
          </Button>
          <Input
            value={counts}
            className='h-full text-center'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          />
          <Button className='size-full' onClick={removeFromCart}>
            <MinusIcon />
          </Button>
        </div>
      ) : (
        <button
          onClick={addToCart}
          disabled={!product.stock}
          aria-label='Add to cart'
          className='w-full bg-blue-600 py-3 font-medium text-background transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'>
          <ShoppingCart className='mr-2 inline h-5 w-5' />
          {product.stock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      )}
    </motion.div>
  )
}
