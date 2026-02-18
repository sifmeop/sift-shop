import { use } from 'react'

import { SubcategoryPage } from '~/screens/subcategory'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    category: string
    subcategory: string
    [key: string]: string
  }>
  searchParams: Promise<Record<string, string>>
}

export default function Page({ params, searchParams }: PageProps) {
  const { category, subcategory } = use(params)
  const filters = use(searchParams)
  return (
    <SubcategoryPage
      category={category}
      subcategory={subcategory}
      filters={filters}
    />
  )
}
