import { NotFoundContent } from '~/common/ui/NotFoundContent'
import { getCategories } from '~/modules/categories'

interface CategoryLayoutProps extends React.PropsWithChildren {
  params: Promise<{ category: string }>
}

export default async function CategoryLayout({
  children,
  params
}: CategoryLayoutProps) {
  const { category } = await params

  const { data, error } = await getCategories()

  const categoryInfo = data?.categories.find((c) => c.slug === category)

  if (!categoryInfo) {
    return <NotFoundContent type='category' />
  }

  return <>{children}</>
}
