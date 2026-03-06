import type { Metadata } from 'next'

import { createPageMetadata } from '~/common/seo'
import { getCategories } from '~/modules/categories'
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params
  const { data } = await getCategories()

  const categoryInfo = data?.categories.find((item) => item.slug === category)
  const subcategoryInfo = categoryInfo?.subcategories.find(
    (item) => item.slug === subcategory
  )
  const path = `/category/${category}/${subcategory}`

  if (!categoryInfo || !subcategoryInfo) {
    return createPageMetadata({
      title: 'Subcategory Not Found | Sift Shop',
      description: 'The requested subcategory could not be found.',
      path,
      noIndex: true
    })
  }

  return createPageMetadata({
    title: `${subcategoryInfo.name} | ${categoryInfo.name} | Sift Shop`,
    description: `Shop ${subcategoryInfo.name} in ${categoryInfo.name} on Sift Shop. Find the latest products and best offers.`,
    path,
    keywords: [
      subcategoryInfo.name,
      categoryInfo.name,
      'online shopping',
      'sift shop'
    ]
  })
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
