import type { MetadataRoute } from 'next'

import { getSiteUrl } from '~/common/seo'
import { getCategories } from '~/modules/categories'
import { getProducts } from '~/modules/products'

const STATIC_ROUTES = ['/', '/about', '/contact', '/cart']

const encodePathSegment = (segment: string) => encodeURIComponent(segment)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.7
  }))

  const { data } = await getCategories()
  const categories = data?.categories ?? []

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/category/${encodePathSegment(category.slug)}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8
  }))

  const subcategories = categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      categorySlug: category.slug,
      subcategorySlug: subcategory.slug
    }))
  )

  const subcategoryEntries: MetadataRoute.Sitemap = subcategories.map(
    ({ categorySlug, subcategorySlug }) => ({
      url: `${siteUrl}/category/${encodePathSegment(categorySlug)}/${encodePathSegment(subcategorySlug)}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7
    })
  )

  const productsBySubcategory = await Promise.all(
    subcategories.map(async ({ subcategorySlug }) => {
      const { data: productsData } = await getProducts({
        subcategory: subcategorySlug
      })
      return productsData?.products.products ?? []
    })
  )

  const seenProductSlugs = new Set<string>()
  const productEntries: MetadataRoute.Sitemap = []

  for (const products of productsBySubcategory) {
    for (const product of products) {
      if (seenProductSlugs.has(product.slug)) {
        continue
      }

      seenProductSlugs.add(product.slug)
      productEntries.push({
        url: `${siteUrl}/products/${encodePathSegment(product.slug)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6
      })
    }
  }

  return [
    ...staticEntries,
    ...categoryEntries,
    ...subcategoryEntries,
    ...productEntries
  ]
}
