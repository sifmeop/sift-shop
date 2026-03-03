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
  const { createFilterUrl, cleanUrl } = useFilterParam()

  const appliedFilters: AppliedFilter[] = Array.from(searchParams.entries())
    .map(([key, value]) => {
      const filter = filters.find(
        (f) => f.slug.toLowerCase().replace(/\s+/g, '-') === key
      )

      if (!filter) return null

      let label: string | null = null

      const isRange = filter.slug === 'price'

      if (isRange) {
        label = value.split('-').join(' - ')
      } else {
        label = filter.options.find((o) => o.value === value)?.label ?? null
      }

      if (!label) return null

      return {
        key,
        label,
        value
      }
    })
    .filter((item): item is AppliedFilter => item !== null)

  if (!appliedFilters.length) return

  return (
    <div className='flex flex-wrap gap-2 sm:gap-3'>
      <Link
        href={cleanUrl()}
        className='flex items-center gap-1 rounded-3xl border border-border px-3 py-1.5 text-xs transition-colors duration-300 hover:border-black/40 sm:px-4 sm:py-2'>
        <span className='font-medium'>Clear filters</span>
      </Link>
      {appliedFilters.map(({ key, label, value }) => {
        const href = createFilterUrl(key, value)

        return (
          <Link
            key={`${key}-${value}`}
            href={href}
            className='flex items-center gap-1 rounded-3xl border border-border px-3 py-1.5 text-xs transition-colors duration-300 hover:border-black/40 sm:px-4 sm:py-2'>
            <span className='font-medium'>{label}</span>
            <XIcon size={14} />
          </Link>
        )
      })}
    </div>
  )
}
