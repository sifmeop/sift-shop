export interface Product {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
}

export interface Feature {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

export type ProductTab = 'featured' | 'latest'
