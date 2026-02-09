import type { Product } from './types'

// Using placeholder images - replace with actual product images
const placeholder = (id: string) =>
  `https://picsum.photos/seed/${id}/400/400?grayscale`

export const bestSellingProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Monochrome Tees',
    price: 35.0,
    image: placeholder('black-tee'),
    inStock: true
  },
  {
    id: '2',
    name: 'Monochromatic Wardrobe',
    price: 27.0,
    image: placeholder('brown-tee'),
    inStock: true
  },
  {
    id: '3',
    name: 'Essential Neutrals',
    price: 22.0,
    image: placeholder('white-tee'),
    inStock: true
  },
  {
    id: '4',
    name: 'UTRAANET Black',
    price: 43.0,
    image: placeholder('graphic-tee'),
    inStock: true
  }
]

export const featuredProducts: Product[] = [
  {
    id: '5',
    name: 'Elegant Ebony Sweatshirts',
    price: 35.0,
    image: placeholder('black-hoodie'),
    inStock: true
  },
  {
    id: '6',
    name: 'Sleek and Cozy Black',
    price: 57.0,
    image: placeholder('black-jacket'),
    inStock: true
  },
  {
    id: '7',
    name: 'Raw Black Tees',
    price: 19.0,
    image: placeholder('hanger-tee'),
    inStock: true
  },
  {
    id: '8',
    name: 'MOCKUP Black',
    price: 30.0,
    image: placeholder('mockup-tee'),
    inStock: true
  }
]

export const latestProducts: Product[] = [
  {
    id: '9',
    name: 'Urban Street Style',
    price: 45.0,
    image: placeholder('urban-tee'),
    inStock: true
  },
  {
    id: '10',
    name: 'Minimalist White',
    price: 32.0,
    image: placeholder('minimal-white'),
    inStock: true
  },
  {
    id: '11',
    name: 'Classic Crew Neck',
    price: 28.0,
    image: placeholder('crew-neck'),
    inStock: true
  },
  {
    id: '12',
    name: 'Premium Cotton Blend',
    price: 52.0,
    image: placeholder('premium-cotton'),
    inStock: true
  }
]
