import { Suspense } from 'react'

import { CategoriesList } from '~/modules/categories'

interface CategoriesPageProps {
  slug: string
}

export const CategoriesPage = ({ slug }: CategoriesPageProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesList slug={slug} />
    </Suspense>
  )
}
