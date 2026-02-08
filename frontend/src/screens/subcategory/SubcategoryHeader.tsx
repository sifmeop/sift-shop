import { use } from 'react'

import { PageHeader } from '~/common/ui/page-header'
import { getCategories } from '~/modules/categories'

interface SubcategoryHeaderProps {
  category: string
  subcategory: string
}

export const SubcategoryHeader = ({
  category,
  subcategory
}: SubcategoryHeaderProps) => {
  const { data } = use(getCategories())

  const categoryInfo = data?.categories.find((c) => c.slug === category)
  const subcategoryInfo = categoryInfo?.subcategories.find(
    (c) => c.slug === subcategory
  )

  if (!categoryInfo || !subcategoryInfo) {
    return <div>Subcategory not found</div>
  }

  const categoryLabel = categoryInfo.name
  const subcategoryLabel = subcategoryInfo.name

  return (
    <PageHeader
      title={subcategoryLabel}
      breadcrumbs={[
        { label: categoryLabel, href: `/category/${category}` },
        { label: subcategoryLabel }
      ]}
    />
  )
}
