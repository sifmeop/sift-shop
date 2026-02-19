export function calcDiscountedPrice(
  price: number,
  discountPercent: number
): number {
  return Math.round(price * (1 - discountPercent / 100))
}
