import { Suspense } from 'react'

import { CenterLoader } from '~/common/ui/CenterLoader'
import { Container } from '~/common/ui/container'
import { ProductPage } from '~/screens/product'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  return (
    <Suspense
      fallback={
        <Container bgColor='white' className='flex-1 grid place-items-center'>
          <CenterLoader />
        </Container>
      }>
      <ProductPage slug={slug} />
    </Suspense>
  )
}
