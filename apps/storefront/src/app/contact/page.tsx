import type { Metadata } from 'next'

import { createPageMetadata } from '~/common/seo'
import { ContactPage } from '~/screens/contact'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Sift Shop',
  description:
    'Get in touch with Sift Shop for order support, product questions, and partnership inquiries.',
  path: '/contact',
  keywords: ['contact sift shop', 'customer support', 'store contacts']
})

export default function Page() {
  return <ContactPage />
}
