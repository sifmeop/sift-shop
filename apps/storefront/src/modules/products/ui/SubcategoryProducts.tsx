import { getProducts } from '../api/getProducts'

import { ProductsContent } from './ProductsContent'

interface SubcategoryProductsProps {
  subcategory: string
  filters?: Record<string, string>
}

export const SubcategoryProducts = async ({
  subcategory,
  filters
}: SubcategoryProductsProps) => {
  const { data } = await getProducts({ subcategory }, filters)

  return <ProductsContent data={data} />
}
