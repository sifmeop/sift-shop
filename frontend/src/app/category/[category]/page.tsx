import { use } from 'react'

import { CategoriesPage } from '~/screens/categories'

interface PageProps {
  params: Promise<{ category: string }>
}

export default function Page({ params }: PageProps) {
  const { category } = use(params)
  return <CategoriesPage slug={category} />
}
