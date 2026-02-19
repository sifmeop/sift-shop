import { Prisma } from '@sift-shop/database'

export function calcDiscountedPrice(
  price: Prisma.Decimal,
  discountPercent: number
) {
  return price
    .mul(1 - discountPercent / 100)
    .toDecimalPlaces(2)
    .toNumber()
}
