import groq from 'groq'
import {sanityClient} from './sanity'

export const homePageQuery = groq`*[_type == 'homePage'][0]{title, description}`

export async function getHomePageData() {
  return sanityClient.fetch(homePageQuery)
}
