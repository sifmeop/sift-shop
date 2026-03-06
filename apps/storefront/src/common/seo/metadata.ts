import type { Metadata } from 'next'

import { env } from '~/common/constants/env'

const SITE_NAME = 'Sift Shop'
const DEFAULT_TITLE =
  'Sift Shop - Fresh Arrivals Online | Quality Fashion & Clothing'
const DEFAULT_DESCRIPTION =
  'Discover high-quality fashion and clothing with fresh arrivals, best-selling essentials, and fast delivery.'
const DEFAULT_OG_IMAGE_PATH = '/assets/images/logo.webp'

interface CreatePageMetadataInput {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  noFollow?: boolean
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

export const getSiteUrl = () => trimTrailingSlash(env.SITE_URL)

const getAbsoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) {
    return value
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`
  return `${getSiteUrl()}${normalizedPath}`
}

const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 3).trimEnd()}...`
}

export const createPageMetadata = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  keywords,
  image = DEFAULT_OG_IMAGE_PATH,
  type = 'website',
  noIndex = false,
  noFollow = false
}: CreatePageMetadataInput = {}): Metadata => {
  const normalizedDescription = truncate(
    description.replace(/\s+/g, ' ').trim(),
    160
  )
  const canonicalUrl = getAbsoluteUrl(path)
  const imageUrl = getAbsoluteUrl(image)

  return {
    title,
    description: normalizedDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description: normalizedDescription,
      url: canonicalUrl,
      type,
      siteName: SITE_NAME,
      images: [{ url: imageUrl }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: normalizedDescription,
      images: [imageUrl]
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow
      }
    }
  }
}

export const seoDefaults = {
  siteName: SITE_NAME,
  defaultTitle: DEFAULT_TITLE,
  defaultDescription: DEFAULT_DESCRIPTION
}
