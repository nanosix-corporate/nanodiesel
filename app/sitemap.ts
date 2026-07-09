import { MetadataRoute } from 'next'
import { client } from '../sanity/client'

export const revalidate = 0; // Ensures sitemap is updated dynamically when a new post is published

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nanodiesel.id'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/produk`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/teknologi-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Fetch dynamic posts from Sanity
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
  );

  const dynamicRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/artikel/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes]
}
