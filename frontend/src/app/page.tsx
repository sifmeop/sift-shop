import type { Metadata } from 'next'

import { HomePage } from '~/screens/home'

export const metadata: Metadata = {
  title: 'Sift Shop - Fresh Arrivals Online | Quality Fashion & Clothing',
  description:
    'Discover our newest collection of high-quality fashion and clothing. Free shipping on all orders, satisfaction guaranteed. Shop the best selling tees, hoodies, and more.',
  keywords: [
    'fashion',
    'clothing',
    'online shop',
    'tees',
    'hoodies',
    'streetwear',
    'best selling',
    'fresh arrivals'
  ],
  openGraph: {
    title: 'Sift Shop - Fresh Arrivals Online',
    description:
      'Discover our newest collection of high-quality fashion and clothing. Free shipping on all orders.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sift Shop'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sift Shop - Fresh Arrivals Online',
    description:
      'Discover our newest collection of high-quality fashion and clothing.'
  }
}

export default function Page() {
  return <HomePage />
}
