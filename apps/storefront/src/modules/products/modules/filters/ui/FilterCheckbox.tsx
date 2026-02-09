import Link from 'next/link'

import { FilterOptionEntity } from '~/common/lib/graphql/generated/graphql'
import { Checkbox } from '~/common/ui/Checkbox'
import { Field, FieldGroup, FieldLabel } from '~/common/ui/field'
import { useFilterParam } from '~/modules/products/hooks/useFilterParam'

interface FilterCheckboxProps {
  filterKey: string
  options: FilterOptionEntity[]
}

export const FilterCheckbox = ({ filterKey, options }: FilterCheckboxProps) => {
  const { createFilterUrl, isChecked } = useFilterParam()

  return (
    <FieldGroup className='gap-2'>
      {options.map((option) => {
        const href = createFilterUrl(filterKey, option.value)
        const checked = isChecked(filterKey, option.value)

        return (
          <Field key={option.id} orientation='horizontal' className='gap-3'>
            <Link
              href={href}
              scroll={false}
              className='flex items-center gap-2'>
              <Checkbox id={option.id} checked={checked} />
              <FieldLabel htmlFor={option.id}>{option.label}</FieldLabel>
            </Link>
          </Field>
        )
      })}
    </FieldGroup>
  )
}
