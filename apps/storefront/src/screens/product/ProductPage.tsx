import { Container } from '~/common/ui/container'

interface ProductPageProps {
  slug: string
}

export const ProductPage = ({ slug }: ProductPageProps) => {
  return (
    <Container main bgColor='white' className='py-4'>
      <p>{slug}</p>
    </Container>
  )
}
