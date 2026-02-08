import {
  BestSelling,
  FashionBanner,
  FeaturedProducts,
  Features,
  Hero,
  Newsletter
} from './components'

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <BestSelling />
      <FashionBanner />
      <FeaturedProducts />
      <Newsletter />
    </>
  )
}
