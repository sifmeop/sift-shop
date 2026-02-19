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

export default async function Page({ params, searchParams }: PageProps) {
  const { category, subcategory } = await params
  const filters = await searchParams

  return (
    <SubcategoryPage
      category={category}
      subcategory={subcategory}
      filters={filters}
    />
  )
}
