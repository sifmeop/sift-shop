import { Fragment } from 'react/jsx-runtime'

import { ProductFiltersEntity } from '~/common/lib/graphql/generated/graphql'
import { Separator } from '~/common/ui/separator'
import { Show } from '~/common/ui/show'

import { FilterGroup } from './FilterGroup'

interface FiltersSidebarProps {
  filters: ProductFiltersEntity[]
}

export const FiltersSidebar = ({ filters }: FiltersSidebarProps) => {
  const isEmpty = filters.every((filter) => filter.options.length === 0)

  if (isEmpty) return

  return (
    <div className='shrink-0 border w-62.5 border-border p-4 rounded-lg space-y-5 max-h-[70dvh] overflow-y-auto overscroll-contain scrollbar-thin'>
      {filters.map((filter, index) => (
        <Fragment key={filter.id}>
          <FilterGroup filter={filter} />
          <Show when={index !== filters.length - 1}>
            <Separator />
          </Show>
        </Fragment>
      ))}
    </div>
  )
}
