import { CategoriesList } from '~/modules/categories'

interface CategoriesPageProps {
  slug: string
}

export const CategoriesPage = ({ slug }: CategoriesPageProps) => {
  return <CategoriesList slug={slug} />
}
