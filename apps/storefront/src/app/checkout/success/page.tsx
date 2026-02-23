import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { fetchOrderBySession } from '~/modules/checkout'
import { CheckoutSuccessPage } from '~/screens/checkout'

interface PageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const { session_id, ...rest } = await searchParams

  if (!session_id) {
    redirect(ROUTES.HOME)
  }

  const { data } = await fetchOrderBySession(session_id)

  if (!data) {
    redirect(ROUTES.HOME)
  }

  return <CheckoutSuccessPage order={data.getOrderBySession} />
}
