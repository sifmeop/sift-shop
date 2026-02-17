import Link from 'next/link'

import { FilterOptionEntity } from '~/common/lib/graphql/generated/graphql'
import { Checkbox } from '~/common/ui/Checkbox'
import { Field, FieldGroup, FieldLabel } from '~/common/ui/field'
import { cn } from '~/common/utils/cn'
import { useFilterParam } from '~/modules/products/hooks/useFilterParam'

const SCROLL_THRESHOLD = 8

interface FilterCheckboxProps {
  filterKey: string
  options: FilterOptionEntity[]
}

export const FilterCheckbox = ({ filterKey, options }: FilterCheckboxProps) => {
  const { createFilterUrl, isChecked } = useFilterParam()
  const needsScroll = options.length >= SCROLL_THRESHOLD

  return (
    <FieldGroup
      className={cn('gap-2', {
        'max-h-62.5 overflow-y-auto overscroll-contain scrollbar-thin':
          needsScroll
      })}>
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
