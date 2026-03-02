'use client'

import { TrendingUpIcon } from 'lucide-react'

import { CenterLoader } from '~/common/ui/CenterLoader'
import { ProductCard } from '~/modules/products'

import { useGetRelatedProductsQuery } from '../hooks/useGetRelatedProductsQuery'

import { ProductSection } from './ProductSection'

interface RelatedProductsProps {
  slug: string
  productId: string
}

export const RelatedProducts = ({ slug, productId }: RelatedProductsProps) => {
  const { data, loading, error } = useGetRelatedProductsQuery(slug, productId)

  const products = data?.relatedProducts

  if (error || (products && !products.length)) return

  if (!products || loading) {
    return <CenterLoader />
  }

  return (
    <ProductSection icon={TrendingUpIcon} name='Related Products'>
      <div className='[&>div]:w-50 [&>div]:h-auto [&>div]:shrink-0 scrollbar-thin flex gap-3 overflow-x-auto'>
        {products.map((product) => (
          <ProductCard minimal key={product.id} product={product} />
        ))}
      </div>
    </ProductSection>
  )
}
