import { CartItemEntity } from '~/common/lib/graphql/generated/graphql'

interface CartItemProps {
  item: CartItemEntity
}

export const CartItem = ({ item }: CartItemProps) => {
  return <div>CartItem</div>
}
