import { ROUTES } from '~/common/constants/routes'
import { NotFoundContent } from '~/common/ui/NotFoundContent'
import { PageHeader } from '~/common/ui/page-header'
import { getProductDetail } from '~/modules/products'
import { ProductPage } from '~/screens/product'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const { data } = await getProductDetail(slug)

  const product = data?.product

  if (!product) {
    return <NotFoundContent type='product' />
  }

  console.debug('data', product)

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
      <ProductPage {...product} />
    </>
  )
}
