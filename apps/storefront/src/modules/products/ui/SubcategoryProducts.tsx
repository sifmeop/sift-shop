import { use } from 'react'

import { getProducts } from '../api/getProducts'

import { ProductsContent } from './ProductsContent'

interface SubcategoryProductsProps {
  subcategory: string
  filters?: Record<string, string>
}

export const SubcategoryProducts = ({
  subcategory,
  filters
}: SubcategoryProductsProps) => {
  const { data } = use(getProducts({ subcategory }, filters))

  return <ProductsContent data={data} />
}
