import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Layout } from '~/app/_layout'
import { Providers } from '~/app/_providers'
import { createPageMetadata, getSiteUrl } from '~/common/seo'
import { cn } from '~/common/utils/cn'

import './globals.css'

const inter = Inter({ variable: '--font-sans', subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...createPageMetadata()
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={cn(inter.variable, 'antialiased')}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
