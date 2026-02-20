import { AnimatePresence, motion } from 'motion/react'

import { useCartQuery } from '../hooks/useCartQuery'

import { CartItem } from './CartItem'

export const CartItemList = () => {
  const { data } = useCartQuery()

  return (
    <div className='space-y-10'>
      <AnimatePresence mode='popLayout'>
        {data?.cart.map((item, index) => (
          <motion.div
            key={item.product.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
            exit={{ opacity: 0, x: 20 }}>
            <CartItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
