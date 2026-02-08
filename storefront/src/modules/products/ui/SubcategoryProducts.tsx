import { use } from 'react'

import { getProducts } from '../api/getProducts'

import { ProductsContent } from './ProductsContent'

interface SubcategoryProductsProps {
  category: string
  subcategory: string
}

export const SubcategoryProducts = ({
  category,
  subcategory
}: SubcategoryProductsProps) => {
  const { data } = use(getProducts({ category, subcategory }))

  return <ProductsContent data={data} />
}
