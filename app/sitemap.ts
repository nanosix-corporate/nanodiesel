import { MetadataRoute } from 'next'
import { getAllSlugs } from '../lib/product-details'

const baseUrl = 'https://www.nanodiesel.id'
const lastmod = new Date('2026-07-10')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: lastmod, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/produk`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/teknologi-kami`, lastModified: lastmod, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/bukti-uji`, lastModified: lastmod, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/artikel`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/profil`, lastModified: lastmod, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const productSlugs = getAllSlugs()
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/produk/${slug}`,
    lastModified: lastmod,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...productRoutes]
}
