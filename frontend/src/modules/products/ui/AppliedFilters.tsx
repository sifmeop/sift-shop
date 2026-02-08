import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { ProductFiltersEntity } from '~/common/lib/graphql/generated/graphql'

import { useFilterParam } from '../hooks/useFilterParam'

interface AppliedFilter {
  key: string
  label: string
  value: string
}

interface AppliedFiltersProps {
  filters: ProductFiltersEntity[]
}

export const AppliedFilters = ({ filters }: AppliedFiltersProps) => {
  const searchParams = useSearchParams()
  const { createFilterUrl } = useFilterParam()

  const appliedFilters: AppliedFilter[] = Array.from(searchParams.entries())
    .map(([key, value]) => {
      const filter = filters.find(
        (f) => f.value.toLowerCase().replace(/\s+/g, '-') === key
      )

      if (!filter) return null

      const option = filter.options.find((o) => o.value === value)

      if (!option) return null

      return {
        key,
        label: option.label,
        value
      }
    })
    .filter((item): item is AppliedFilter => item !== null)

  if (appliedFilters.length === 0) return

  return (
    <div className='flex flex-wrap gap-3'>
      {appliedFilters.map(({ key, label, value }) => {
        const href = createFilterUrl(key, value)

        return (
          <Link
            key={value}
            href={href}
            className='rounded-3xl border border-border px-4 py-2 flex items-center gap-2'>
            <span className='font-medium text-xs'>
              {key.toUpperCase()}: {label}
            </span>
            <XIcon size={18} />
          </Link>
        )
      })}
    </div>
  )
}
