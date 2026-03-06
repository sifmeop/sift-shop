import type { Metadata } from 'next'

import { createPageMetadata } from '~/common/seo'
import { getCategories } from '~/modules/categories'
import { CategoriesPage } from '~/screens/categories'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const { data } = await getCategories()
  const categoryInfo = data?.categories.find((item) => item.slug === category)
  const path = `/category/${category}`

  if (!categoryInfo) {
    return createPageMetadata({
      title: 'Category Not Found | Sift Shop',
      description: 'The requested category could not be found.',
      path,
      noIndex: true
    })
  }

  return createPageMetadata({
    title: `${categoryInfo.name} | Sift Shop`,
    description: `Explore ${categoryInfo.name} collection on Sift Shop. Shop curated products and discover fresh arrivals.`,
    path,
    keywords: [categoryInfo.name, 'fashion category', 'sift shop']
  })
}

export default async function Page({ params }: PageProps) {
  const { category } = await params
  return <CategoriesPage slug={category} />
}
