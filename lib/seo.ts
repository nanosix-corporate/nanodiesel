import type { Metadata } from 'next'

export const BASE_URL = 'https://www.nanodiesel.id'

interface SeoProps {
  title: string
  description: string
  path: string
  canonicalUrl?: string
  noIndex?: boolean
}

export function generateSeoMetadata({ title, description, path, canonicalUrl, noIndex = false }: SeoProps): Metadata {
  const canonical = canonicalUrl ?? `${BASE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: { title, description, url: canonical, siteName: 'Nano Diesel', locale: 'id_ID', type: 'website' },
  }
}
