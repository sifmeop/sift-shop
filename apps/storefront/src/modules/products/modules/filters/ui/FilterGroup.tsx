import { ProductFiltersEntity } from '~/common/lib/graphql/generated/graphql'

import { FilterCheckbox } from './FilterCheckbox'

interface FilterGroupProps {
  filter: ProductFiltersEntity
}

export const FilterGroup = ({ filter }: FilterGroupProps) => {
  const isEmpty = filter.options.length === 0

  if (isEmpty) return

  return (
    <div>
      <p className='font-medium mb-4'>{filter.name}</p>
      <FilterCheckbox filterKey={filter.value} options={filter.options} />
    </div>
  )
}
