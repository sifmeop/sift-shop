import { usePathname, useSearchParams } from 'next/navigation'

export const useFilterParam = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createFilterUrl = (filterKey: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const filterValues = params.getAll(filterKey)
    const isSelected = filterValues.includes(value)

    if (isSelected) {
      params.delete(filterKey, value)
    } else {
      params.append(filterKey, value)
    }

    return pathname + '?' + params.toString()
  }

  const isChecked = (filterKey: string, value: string) => {
    return searchParams.getAll(filterKey).includes(value)
  }

  return { createFilterUrl, isChecked }
}
