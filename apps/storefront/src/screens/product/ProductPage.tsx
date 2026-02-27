import { ProductDetailEntity } from '~/common/lib/graphql/generated/graphql'
import { ProductDetail } from '~/modules/products'

type ProductPageProps = ProductDetailEntity

export const ProductPage = (product: ProductPageProps) => {
  return <ProductDetail {...product} />
}
