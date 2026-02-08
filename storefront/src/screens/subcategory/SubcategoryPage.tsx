import { CategoryPageHeader } from '~/common/ui/CategoryPageHeader'
import { SubcategoryProducts } from '~/modules/products/ui/SubcategoryProducts'

interface SubcategoryPageProps {
  category: string
  subcategory: string
}

export const SubcategoryPage = async ({
  category,
  subcategory
}: SubcategoryPageProps) => {
  return (
    <>
      <CategoryPageHeader category={category} subcategory={subcategory} />
      <SubcategoryProducts category={category} subcategory={subcategory} />
    </>
  )
}
