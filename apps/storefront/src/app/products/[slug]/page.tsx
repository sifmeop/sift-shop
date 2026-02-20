import { PageHeader } from '~/common/ui/page-header'
import { ProductPage } from '~/screens/product'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return (
    <>
      <PageHeader breadcrumbs={[{ label: slug }]} />
      <ProductPage slug={slug} />
    </>
  )
}
