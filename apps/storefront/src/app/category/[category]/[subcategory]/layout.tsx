import { NotFoundContent } from '~/common/ui/NotFoundContent'
import { getCategories } from '~/modules/categories'

interface SubcategoryLayoutProps extends React.PropsWithChildren {
  params: Promise<{ category: string; subcategory: string }>
}

export default async function CategoryLayout({
  children,
  params
}: SubcategoryLayoutProps) {
  const { category, subcategory } = await params

  const { data } = await getCategories()

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
