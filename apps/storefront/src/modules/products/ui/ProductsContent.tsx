'use client'

import { GetProductsQuery } from '~/common/lib/graphql/generated/graphql'
import { Container } from '~/common/ui/container'
import { NotFoundContent } from '~/common/ui/NotFoundContent'

import { FiltersSidebar } from '../modules/filters/ui/FiltersSidebar'

import { AppliedFilters } from './AppliedFilters'
import { ProductsGrid } from './ProductsGrid'

interface ProductsContentProps {
  data?: GetProductsQuery
}

export const ProductsContent = ({ data }: ProductsContentProps) => {
  if (!data) {
    return <NotFoundContent type='products' />
  }

  const { filters, products } = data.products

  return (
    <Container bgColor='white' className='py-8' innerClassName='flex gap-5'>
      <FiltersSidebar filters={filters} />
      <div className='w-full space-y-4'>
        <AppliedFilters filters={filters} />
        <ProductsGrid products={products} />
      </div>
    </Container>
  )
}
