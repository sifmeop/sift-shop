'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import {
  CartProductItemEntity,
  ProductEntity
} from '~/common/lib/graphql/generated/graphql'

import { useAddToCartMutation } from './useAddToCartMutation'
import { useCartQuery } from './useCartQuery'
import { useRemoveFromCartMutation } from './useRemoveFromCartMutation'

export const useCart = (product: ProductEntity | CartProductItemEntity) => {
  const { data, loading } = useCartQuery()
  const cartItem = data?.cart.find((item) => item.product.id === product.id)

  const [addToCart, { loading: addToCartLoading }] = useAddToCartMutation()
  const [removeFromCart, { loading: removeFromCartLoading }] =
    useRemoveFromCartMutation()

  const [isRemovingAll, setIsRemovingAll] = useState(false)

  const isLoading =
    loading || addToCartLoading || removeFromCartLoading || isRemovingAll
  const quantity = cartItem ? cartItem.quantity : 0

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

  const handleRemoveFromCart = async (quantity: number = 1) => {
    if (!cartItem || isLoading) return

    try {
      await removeFromCart({
        variables: {
          input: { id: cartItem.id, quantity }
        }
      })
    } catch (error) {
      console.error('Failed to remove from cart:', error)
    } finally {
      setIsRemovingAll(false)
    }
  }

  const handleRemoveAllFromCart = async () => {
    setIsRemovingAll(true)
    await handleRemoveFromCart(quantity)
  }

  return {
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    removeAllFromCart: handleRemoveAllFromCart,
    quantity,
    isLoading,
    isInitialLoading: loading,
    isAdding: addToCartLoading,
    isRemoving: removeFromCartLoading && !isRemovingAll,
    isRemovingAll
  }
}
