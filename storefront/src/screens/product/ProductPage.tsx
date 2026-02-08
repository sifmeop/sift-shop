import { Container } from '~/common/ui/container'
import { PageHeader } from '~/common/ui/page-header'

interface ProductPageProps {
  slug: string
}

export const ProductPage = ({ slug }: ProductPageProps) => {
  return (
    <Container bgColor='white' className='py-4'>
      <PageHeader breadcrumbs={[{ label: slug }]} className='py-0 mb-4' />
      <p>{slug}</p>
    </Container>
  )
}
