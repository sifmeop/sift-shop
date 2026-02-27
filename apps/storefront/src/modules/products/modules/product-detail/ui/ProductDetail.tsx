import { ProductDetailEntity } from '~/common/lib/graphql/generated/graphql'
import { Container } from '~/common/ui/container'

type ProductDetail = ProductDetailEntity

export const ProductDetail = ({ name }: ProductDetail) => {
  return (
    <Container main bgColor='white' className='py-4'>
      {name}
    </Container>
  )
}
