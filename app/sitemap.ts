import { MetadataRoute } from 'next'
import { getAllSlugs } from '../lib/product-details'
import { client } from '../sanity/client'

const baseUrl = 'https://www.nanodiesel.id'

export const revalidate = 0 // Mematikan caching agar selalu fetching artikel terbaru

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Gunakan tanggal saat ini sebagai fallback untuk rute statis
  const currentDate = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/produk`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/teknologi-kami`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/bukti-uji`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/artikel`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/profil`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const productSlugs = getAllSlugs()
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/produk/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Ambil artikel secara dinamis dari Sanity
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`)
  const articleRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/artikel/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}
