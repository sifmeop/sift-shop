'use client'

import { ProductDetailEntity } from '~/common/lib/graphql/generated/graphql'
import { Container } from '~/common/ui/container'

import { Description } from './Description'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'
import { RelatedProducts } from './RelatedProducts'
import { Reviews } from './Reviews'
import { Specifications } from './Specifications'

interface ProductDetail {
  data: ProductDetailEntity
}

export const ProductDetail = ({ data }: ProductDetail) => {
  return (
    <Container
      className='pb-4 md:pb-6'
      innerClassName='flex flex-col gap-3 md:gap-4'>
      <div className='grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr] lg:gap-4'>
        <ProductGallery {...data} />
        <ProductInfo {...data} />
      </div>
      <Description description={data.description} />
      <Specifications specifications={data.specifications} />
      <Reviews productId={data.id} isPurchased={data.isPurchased} />
      <RelatedProducts slug={data.subcategory.slug} productId={data.id} />
    </Container>
  )
}
