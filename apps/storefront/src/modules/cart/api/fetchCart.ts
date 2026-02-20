import { redirect } from 'next/navigation'

import { ROUTES } from '~/common/constants/routes'
import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { CartQuery } from '~/common/lib/graphql/generated/graphql'

import { CART_GQL } from '../hooks/useCartQuery'

export const fetchCart = async () => {
  try {
    return await apolloClient.query<CartQuery>({
      query: CART_GQL,
      fetchPolicy: 'no-cache'
    })
  } catch {
    redirect(ROUTES.HOME)
  }
}
