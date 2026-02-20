import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { fetchCart } from '~/modules/cart/api/fetchCart'
import { CheckoutPage } from '~/screens/checkout'

export default async function Page() {
  const { data } = await fetchCart()

  if (!data || data.cart.length === 0) {
    return redirect(ROUTES.HOME)
  }

  return <CheckoutPage />
}
