import type { Metadata } from 'next'

import { HomeProductsEntity } from '~/common/lib/graphql/generated/graphql'
import { createPageMetadata } from '~/common/seo'
import { getHomeProducts } from '~/modules/products/api/getHomeProducts'
import { HomePage } from '~/screens/home'

export const metadata: Metadata = createPageMetadata({
  title: 'Sift Shop - Fresh Arrivals Online | Quality Fashion & Clothing',
  description:
    'Discover our newest collection of high-quality fashion and clothing. Free shipping on all orders, satisfaction guaranteed. Shop the best selling tees, hoodies, and more.',
  path: '/',
  keywords: [
    'fashion',
    'clothing',
    'online shop',
    'tees',
    'hoodies',
    'streetwear',
    'best selling',
    'fresh arrivals'
  ]
})

export default async function Page() {
  const { data } = await getHomeProducts()

  return <HomePage data={data?.homeProducts as HomeProductsEntity} />
}
