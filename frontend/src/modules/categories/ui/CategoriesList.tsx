import { PageHeader } from '~/common/ui/page-header'

import { getCategories } from '../api/getCategories'

import { SubcategoriesGrid } from './SubcategoriesGrid'

interface CategoriesListProps {
  slug: string
}

export const CategoriesList = async ({ slug }: CategoriesListProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 5000))

  const { data, error } = await getCategories()

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const category = data?.categories.find((c) => c.slug === slug)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <>
      <PageHeader breadcrumbs={[{ label: category.name }]} />
      <SubcategoriesGrid category={category} />
    </>
  )
}
