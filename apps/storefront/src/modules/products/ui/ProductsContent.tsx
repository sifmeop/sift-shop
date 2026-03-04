'use client'

import { useState } from 'react'

import { SlidersHorizontal, XIcon } from 'lucide-react'

import { GetProductsQuery } from '~/common/lib/graphql/generated/graphql'
import { Container } from '~/common/ui/Container'
import { NotFoundContent } from '~/common/ui/NotFoundContent'
import { Show } from '~/common/ui/Show'

import { FiltersSidebar } from '../modules/filters/ui/FiltersSidebar'

import { AppliedFilters } from './AppliedFilters'
import { ProductsGrid } from './ProductsGrid'

interface ProductsContentProps {
  data?: GetProductsQuery
}

export const ProductsContent = ({ data }: ProductsContentProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  if (!data) {
    return <NotFoundContent type='products' />
  }

  const { filters, products } = data.products
  const hasFilters = filters.some((filter) => filter.options.length > 0)

  return (
    <Container
      main
      bgColor='white'
      className='py-6 md:py-8'
      innerClassName='flex flex-col gap-4 lg:flex-row lg:gap-5'>
      <Show when={hasFilters}>
        <button
          onClick={() => setIsFiltersOpen((prev) => !prev)}
          className='flex items-center justify-between rounded-lg border border-border px-4 py-2 text-sm font-medium lg:hidden'>
          <span className='inline-flex items-center gap-2'>
            <SlidersHorizontal className='size-4' />
            Filters
          </span>
          {isFiltersOpen ? (
            <XIcon className='size-4' />
          ) : (
            <span className='text-muted-foreground text-xs'>Open</span>
          )}
        </button>
      </Show>

      <Show when={isFiltersOpen}>
        <div className='lg:hidden'>
          <FiltersSidebar filters={filters} />
        </div>
      </Show>

      <Show when={hasFilters}>
        <div className='hidden lg:block'>
          <FiltersSidebar filters={filters} />
        </div>
      </Show>

      <div className='w-full space-y-4'>
        <AppliedFilters filters={filters} />
        <ProductsGrid products={products} />
      </div>
    </Container>
  )
}
