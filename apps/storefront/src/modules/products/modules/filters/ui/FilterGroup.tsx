import { ProductFiltersEntity } from '~/common/lib/graphql/generated/graphql'

import { FilterCheckbox } from './FilterCheckbox'
import { FilterRange } from './FilterRange'

const FILTER_GROUPS = {
  CHECKBOX: FilterCheckbox,
  RANGE: FilterRange
}

interface FilterGroupProps {
  filter: ProductFiltersEntity
}

export const FilterGroup = ({ filter }: FilterGroupProps) => {
  const isEmpty = filter.options.length === 0

  if (isEmpty) return

  const Filter =
    filter.slug === 'price' ? FILTER_GROUPS.RANGE : FILTER_GROUPS.CHECKBOX

  if (!Filter) return

  return (
    <div>
      <p className='mb-3 text-sm font-medium sm:mb-4 sm:text-base'>
        {filter.name}
      </p>
      <Filter filterKey={filter.slug} options={filter.options} />
    </div>
  )
}
