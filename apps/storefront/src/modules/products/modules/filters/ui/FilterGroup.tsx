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
    FILTER_GROUPS[filter.type as keyof typeof FILTER_GROUPS] ?? null

  if (!Filter) return

  return (
    <div>
      <p className='font-medium mb-4'>{filter.name}</p>
      <Filter filterKey={filter.value} options={filter.options} />
    </div>
  )
}
