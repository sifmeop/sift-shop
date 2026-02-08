import { use } from 'react'

import { NotFoundContent } from '~/common/ui/NotFoundContent'
import { getCategories } from '~/modules/categories'

interface SubcategoryLayoutProps extends React.PropsWithChildren {
  params: Promise<{ category: string; subcategory: string }>
}

export default function CategoryLayout({
  children,
  params
}: SubcategoryLayoutProps) {
  const { category, subcategory } = use(params)

  const { data } = use(getCategories())

  const categoryInfo = data?.categories.find((c) => c.slug === category)

  if (!categoryInfo) {
    return <NotFoundContent type='category' />
  }

  const subcategoryInfo = categoryInfo.subcategories.find(
    (c) => c.slug === subcategory
  )

  if (!subcategoryInfo) {
    return <NotFoundContent type='subcategory' />
  }

  return <>{children}</>
}
