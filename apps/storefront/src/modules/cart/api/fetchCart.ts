import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { makeServerClient } from '~/common/lib/graphql/apollo-server-client'
import { CartQuery } from '~/common/lib/graphql/generated/graphql'

import { GET_CART_GQL } from '../hooks/useCartQuery'

export const fetchCart = async () => {
  try {
    const client = await makeServerClient()

    return await client.query<CartQuery>({
      query: GET_CART_GQL,
      fetchPolicy: 'no-cache'
    })
  } catch {
    redirect(ROUTES.HOME)
  }
}
