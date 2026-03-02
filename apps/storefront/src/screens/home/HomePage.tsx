import { HomeProductsEntity } from '~/common/lib/graphql/generated/graphql'

import {
  BestSelling,
  FashionBanner,
  FeaturedProducts,
  Features,
  Hero,
  Newsletter
} from './ui'

interface HomePageProps {
  data?: HomeProductsEntity | null
}

export const HomePage = ({ data }: HomePageProps) => {
  return (
    <>
      <Hero />
      <Features />
      <BestSelling data={data?.bestSelling} />
      <FashionBanner />
      <FeaturedProducts data={data?.featured} />
      <Newsletter />
    </>
  )
}
