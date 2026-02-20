import { Format } from '@number-flow/react'

export const FORMAT_PRICE_OPTIONS: Format = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', FORMAT_PRICE_OPTIONS).format(price)
}
