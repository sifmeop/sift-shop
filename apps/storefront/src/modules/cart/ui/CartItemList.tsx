import { useCartQuery } from '../hooks/useCartQuery'

import { CartItem } from './CartItem'

export const CartItemList = () => {
  const { data } = useCartQuery()

  return (
    <div>
      {data?.cart.map((item) => (
        <CartItem key={item.product.slug} item={item} />
      ))}
    </div>
  )
}
