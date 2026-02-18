import { CategoryPageHeader } from '~/common/ui/CategoryPageHeader'
import { SubcategoryProducts } from '~/modules/products/ui/SubcategoryProducts'

interface SubcategoryPageProps {
  category: string
  subcategory: string
  filters?: Record<string, string>
}

export const SubcategoryPage = async ({
  category,
  subcategory,
  filters
}: SubcategoryPageProps) => {
  return (
    <>
      <CategoryPageHeader category={category} subcategory={subcategory} />
      <SubcategoryProducts subcategory={subcategory} filters={filters} />
    </>
  )
}
