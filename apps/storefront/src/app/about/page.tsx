import type { Metadata } from 'next'

import { createPageMetadata } from '~/common/seo'
import { AboutPage } from '~/screens/about'

export const metadata: Metadata = createPageMetadata({
  title: 'About Sift Shop',
  description:
    'Learn about Sift Shop, our mission, and how we curate quality fashion for everyday style.',
  path: '/about',
  keywords: ['about sift shop', 'fashion brand', 'online clothing store']
})

export default function Page() {
  return <AboutPage />
}
