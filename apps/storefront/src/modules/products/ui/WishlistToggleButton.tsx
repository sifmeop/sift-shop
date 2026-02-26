import { Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { useWishlist } from '~/modules/wishlist'

interface WishlistToggleButtonProps {
  productId: string
}

export const WishlistToggleButton = ({
  productId
}: WishlistToggleButtonProps) => {
  const { isLoading, isInWishlist, addToWishlist, removeFromWishlist } =
    useWishlist(productId)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isLoading) return

    if (isInWishlist) {
      await removeFromWishlist()
    } else {
      await addToWishlist()
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      disabled={isLoading}
      aria-label='Add to favorites'
      className='relative flex size-10 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700'>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <motion.div
            key='loader'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className='absolute'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: 'linear'
              }}
              className='size-5 border-2 border-gray-300 border-t-red-500 rounded-full'
            />
          </motion.div>
        ) : (
          <motion.div
            key={isInWishlist ? 'filled' : 'empty'}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: isInWishlist ? [1, 1.3, 1] : 1,
              opacity: 1
            }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}>
            <Heart
              className={`size-5 transition-colors ${
                isInWishlist
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
