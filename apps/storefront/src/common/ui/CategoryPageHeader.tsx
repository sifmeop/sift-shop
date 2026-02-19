import { getCategories } from '~/modules/categories'

import { BreadcrumbProps, PageHeader } from './page-header'

interface CategoryPageHeaderProps {
  category: string
  subcategory?: string
}

export const CategoryPageHeader = async ({
  category,
  subcategory
}: CategoryPageHeaderProps) => {
  const { data } = await getCategories()

  const categoryInfo = data?.categories.find((c) => c.slug === category)
  const subcategoryInfo = categoryInfo?.subcategories.find(
    (c) => c.slug === subcategory
  )

  if (!categoryInfo) return

  const categoryLabel = categoryInfo.name
  const subcategoryLabel = subcategoryInfo?.name

  const breadcrumbs: BreadcrumbProps[] = [
    { label: categoryLabel, href: `/category/${category}` }
  ]

  if (subcategoryLabel) {
    breadcrumbs.push({ label: subcategoryLabel })
  }

  return <PageHeader title={subcategoryLabel} breadcrumbs={breadcrumbs} />
}
