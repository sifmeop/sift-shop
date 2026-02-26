import { formatPrice } from './formatPrice'

export function calcDiscountedPrice(price: number, discountPercent: number) {
  return formatPrice(Math.round(price * (1 - discountPercent / 100)))
}
