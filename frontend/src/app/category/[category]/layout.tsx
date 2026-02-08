import { use } from 'react'

import { NotFoundContent } from '~/common/ui/NotFoundContent'
import { getCategories } from '~/modules/categories'

interface CategoryLayoutProps extends React.PropsWithChildren {
  params: Promise<{ category: string }>
}

export default function CategoryLayout({
  children,
  params
}: CategoryLayoutProps) {
  const { category } = use(params)

  const { data } = use(getCategories())

  const categoryInfo = data?.categories.find((c) => c.slug === category)

  if (!categoryInfo) {
    return <NotFoundContent type='category' />
  }

  return <>{children}</>
}
