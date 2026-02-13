import { ProductFiltersEntity } from '~/common/lib/graphql/generated/graphql'

import { FilterGroup } from './FilterGroup'

interface FiltersSidebarProps {
  filters: ProductFiltersEntity[]
}

export const FiltersSidebar = ({ filters }: FiltersSidebarProps) => {
  const isEmpty = filters.every((filter) => filter.options.length === 0)

  if (isEmpty) return

  return (
    <div className='border w-62.5 border-border p-4 rounded-lg space-y-5 max-h-[70dvh] overflow-y-auto overscroll-contain'>
      {filters.map((filter) => (
        <FilterGroup key={filter.id} filter={filter} />
      ))}
    </div>
  )
}
