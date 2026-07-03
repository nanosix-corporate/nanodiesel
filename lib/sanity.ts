import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  apiVersion: '2026-06-29',
  useCdn: false,
}

export const sanityClient = createClient(config)
export const urlFor = (source: SanityImageSource) => imageUrlBuilder(sanityClient).image(source)
