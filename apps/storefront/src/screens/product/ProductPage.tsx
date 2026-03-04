import { cookies } from 'next/headers'

import { ROUTES } from '~/common/constants/routes'
import { NotFoundContent } from '~/common/ui/NotFoundContent'
import { PageHeader } from '~/common/ui/PageHeader'
import { getProductDetail, ProductDetail } from '~/modules/products'

interface ProductPageProps {
  slug: string
}

export const ProductPage = async ({ slug }: ProductPageProps) => {
  const cookieStore = await cookies()
  const { data } = await getProductDetail(slug, cookieStore)

  const product = data?.product

  if (!product) {
    return <NotFoundContent type='product' />
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          {
            label: product.category.name,
            href: ROUTES.CATEGORY + '/' + product.category.slug
          },
          {
            label: product.subcategory.name,
            href:
              ROUTES.CATEGORY +
              '/' +
              product.category.slug +
              '/' +
              product.subcategory.slug
          },
          {
            label: product.name
          }
        ]}
      />
      <ProductDetail data={product} />
    </>
  )
}
