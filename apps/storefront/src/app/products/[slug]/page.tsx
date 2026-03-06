import type { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'

import { getImageUrl } from '~/common/utils/getImageUrl'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Container } from '~/common/ui/Container'
import { createPageMetadata } from '~/common/seo'
import { getProductDetail } from '~/modules/products'
import { ProductPage } from '~/screens/product'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cookieStore = await cookies()
  const { data } = await getProductDetail(slug, cookieStore)
  const product = data?.product
  const path = `/products/${slug}`

  if (!product) {
    return createPageMetadata({
      title: 'Product Not Found | Sift Shop',
      description: 'The requested product could not be found.',
      path,
      noIndex: true
    })
  }

  const ogImage = product.images?.[0]
    ? getImageUrl(product.images[0])
    : undefined

  return createPageMetadata({
    title: `${product.name} | Sift Shop`,
    description:
      product.description ||
      `${product.name} in ${product.category.name}. Discover details, pricing, and availability on Sift Shop.`,
    path,
    image: ogImage,
    type: 'website',
    keywords: [
      product.name,
      product.category.name,
      product.subcategory.name,
      'buy online',
      'sift shop'
    ]
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return (
    <Suspense
      fallback={
        <Container bgColor='white' className='flex-1 grid place-items-center'>
          <CenterLoader />
        </Container>
      }>
      <ProductPage slug={slug} />
    </Suspense>
  )
}
