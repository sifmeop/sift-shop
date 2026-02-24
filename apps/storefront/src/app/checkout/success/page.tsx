import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { fetchOrderByPaymentId } from '~/modules/checkout'
import { CheckoutSuccessPage } from '~/screens/checkout'

interface PageProps {
  searchParams: Promise<{ payment_id?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const { payment_id } = await searchParams

  if (!payment_id) {
    redirect(ROUTES.HOME)
  }

  const { data } = await fetchOrderByPaymentId(payment_id)

  if (!data) {
    redirect(ROUTES.HOME)
  }

  return <CheckoutSuccessPage order={data.getOrderByPaymentId} />
}
