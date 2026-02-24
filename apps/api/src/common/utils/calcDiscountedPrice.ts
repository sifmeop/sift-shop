import Decimal from 'decimal.js'

export function calcDiscountedPrice(price: Decimal, discountPercent: number) {
  return price
    .mul(1 - discountPercent / 100)
    .toDecimalPlaces(2)
    .toNumber()
}
