import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { fetchCart } from '~/modules/cart'
import { CheckoutPage } from '~/screens/checkout'

export default async function Page() {
  const cookiesStore = await cookies()
  const { data } = await fetchCart(cookiesStore)

  if (!data || !data.cart.length) {
    return redirect(ROUTES.HOME)
  }

  return <CheckoutPage />
}
