import { use } from 'react'

import { SubcategoryPage } from '~/screens/subcategory'

interface PageProps {
  params: Promise<{
    category: string
    subcategory: string
  }>
}

export default function Page({ params }: PageProps) {
  const { category, subcategory } = use(params)
  return <SubcategoryPage category={category} subcategory={subcategory} />
}
