import { CenterLoader } from '~/common/ui/CenterLoader'
import { Container } from '~/common/ui/container'

export default function Loading() {
  return (
    <Container main bgColor='white' className='py-12'>
      <CenterLoader />
    </Container>
  )
}
