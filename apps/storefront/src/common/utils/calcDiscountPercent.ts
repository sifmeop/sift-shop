export function calcDiscountPercent(
  price: number,
  discountedPrice: number
): number {
  return Math.round((1 - discountedPrice / price) * 100)
}
