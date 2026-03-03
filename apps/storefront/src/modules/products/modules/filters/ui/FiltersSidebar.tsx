import { Fragment } from 'react/jsx-runtime'

import { ProductFiltersEntity } from '~/common/lib/graphql/generated/graphql'
import { Separator } from '~/common/ui/separator'
import { Show } from '~/common/ui/show'

import { FilterGroup } from './FilterGroup'

interface FiltersSidebarProps {
  filters: ProductFiltersEntity[]
}

export const FiltersSidebar = ({ filters }: FiltersSidebarProps) => {
  const isEmpty = filters.every((filter) => !filter.options.length)

  if (isEmpty) return

  return (
    <div className='w-full shrink-0 space-y-5 rounded-lg border border-border p-4 lg:w-62.5 lg:max-h-[70dvh] lg:overflow-y-auto lg:overscroll-contain lg:scrollbar-thin'>
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
