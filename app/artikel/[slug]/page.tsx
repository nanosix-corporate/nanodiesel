import { client } from '../../../sanity/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import ArticleImage from '../../../components/ArticleImage';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nanodiesel.id';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const draft = await draftMode();
  const fetchClient = draft.isEnabled
    ? client.withConfig({
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: 'previewDrafts',
        useCdn: false,
        ignoreBrowserTokenWarning: true,
      })
    : client;

  const post = await fetchClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { title, excerpt, seo { metaTitle, metaDescription, canonicalUrl, seoKeywords, "metaImageUrl": metaImage.asset->url, openGraph { title, description, siteName, "imageUrl": image.asset->url }, twitter { cardType, site, creator } } }`,
    { slug }
  );

  if (!post) {
    return { title: 'Artikel Tidak Ditemukan | Nano Diesel' };
  }

  const defaultDesc = 'Baca artikel dan edukasi terbaru seputar perawatan mesin diesel, aditif solar terbaik, dan cara hemat bbm.';
  const defaultKeywords = ['aditif solar terbaik', 'aditif bahan bakar', 'hemat bbm diesel', 'solar murah jadi rasa premium'];
  const canonical = post.seo?.canonicalUrl ?? `https://www.nanodiesel.id/artikel/${slug}`;

  return {
    title: post.seo?.metaTitle || `${post.title} | Nano Diesel`,
    description: post.seo?.metaDescription || post.excerpt || defaultDesc,
    alternates: { canonical },
    keywords: post.seo?.seoKeywords || defaultKeywords,
    openGraph: {
      title: post.seo?.openGraph?.title || post.seo?.metaTitle || post.title,
      description: post.seo?.openGraph?.description || post.seo?.metaDescription || post.excerpt || defaultDesc,
      url: canonical,
      siteName: post.seo?.openGraph?.siteName || 'Nano Diesel',
      images: post.seo?.openGraph?.imageUrl || post.seo?.metaImageUrl ? [
        {
          url: post.seo?.openGraph?.imageUrl || post.seo?.metaImageUrl,
        }
      ] : [],
    },
    twitter: {
      card: (post.seo?.twitter?.cardType as any) || 'summary_large_image',
      site: post.seo?.twitter?.site || '@nanodiesel',
      creator: post.seo?.twitter?.creator || '@nanodiesel',
    }
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const draft = await draftMode();
  
  console.log(`[Article Page] Fetching slug: ${slug}`);
  console.log(`[Article Page] Draft Mode Enabled: ${draft.isEnabled}`);
  console.log(`[Article Page] Token exists: ${!!process.env.SANITY_API_READ_TOKEN}`);

  const fetchClient = draft.isEnabled
    ? client.withConfig({
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: 'previewDrafts',
        useCdn: false,
        ignoreBrowserTokenWarning: true,
      })
    : client;

  const post = await fetchClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { 
      ..., 
      "mainImageUrl": mainImage.asset->url,
      content[] {
        ...,
        _type == "productCard" => {
          ...,
          "imageUrl": image.asset->url
        },
        markDefs[] {
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug.current
          }
        }
      }
    }`,
    { slug }
  );

  if (!post) {
    return (
      <main className="pt-[72px] min-h-screen">
        <div className="-mt-[72px] bg-brand-dark text-white px-6 lg:px-12 py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-black mb-6">Artikel Tidak Ditemukan</h1>
            <p className="text-olive-300 mb-8">Halaman yang Anda cari tidak tersedia.</p>
            <Link href="/artikel" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all">
              Kembali
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // JSON-LD: Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.mainImageUrl ? [post.mainImageUrl] : [],
    url: `${BASE_URL}/artikel/${slug}`,
    dateModified: post._updatedAt || new Date().toISOString(),
    datePublished: post._createdAt || post._updatedAt || new Date().toISOString(),
    author: [
      {
        '@type': 'Organization',
        name: 'Nano Diesel',
        url: BASE_URL,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Nano Diesel',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo/nanodiesel-logo-brand.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/artikel/${slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="pt-[72px] min-h-screen">
      {/* Page Header */}
      <div
        className="-mt-[72px] bg-brand-dark text-white px-6 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: (post.mainImageUrl || post.imageUrl) ? `url(${post.mainImageUrl || post.imageUrl})` : 'none' }}
      >
        <div className="absolute inset-0 bg-brand-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-transparent to-brand-dark" />
        <div className="max-w-[1000px] mx-auto text-left relative z-10">
          <Link href="/artikel" className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 inline-block hover:text-emerald-300 transition-colors">
            &larr; Kembali
          </Link>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black mb-6 max-w-4xl leading-tight">{post.title}</h1>
          {post.excerpt && (
            <p className="text-base md:text-xl text-olive-200 max-w-2xl leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[750px] mx-auto">
          <div className="prose prose-lg max-w-none prose-a:no-underline">
            <PortableText 
              value={post.content} 
              components={{
                types: {
                  productCard: ({ value }: any) => {
                    if (!value) return null;
                    return (
                      <div className="my-10 rounded-2xl border border-olive-200 bg-olive-50 overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow not-prose">
                        {value.imageUrl && (
                          <div className="sm:w-1/3 aspect-square sm:aspect-auto sm:min-h-[200px] bg-white relative border-b sm:border-b-0 sm:border-r border-olive-100 flex items-center justify-center p-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={value.imageUrl} alt={value.title || 'Product Image'} className="max-w-full max-h-full object-contain" />
                          </div>
                        )}
                        <div className="p-6 sm:p-8 flex flex-col justify-center flex-1">
                          <h3 className="text-2xl font-bold text-brand-dark mb-3 leading-tight">{value.title}</h3>
                          {value.description && <p className="text-olive-700 text-base mb-6 leading-relaxed">{value.description}</p>}
                          {value.linkUrl && (
                            <a href={value.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl text-sm w-fit transition-all shadow-sm shadow-emerald-900/10">
                              {value.buttonText || 'Lihat Produk'}
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  }
                },
                marks: {
                  internalLink: ({value, children}: any) => {
                    const slug = value?.slug || '';
                    return (
                      <Link href={`/artikel/${slug}`} className="text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-600/30 underline-offset-2">
                        {children}
                      </Link>
                    );
                  },
                  link: ({value, children}: any) => {
                    const { blank, href } = value || {};
                    return blank ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-dark hover:text-emerald-600 font-semibold underline decoration-brand-dark/30 underline-offset-2">
                        {children}
                      </a>
                    ) : (
                      <a href={href} className="text-brand-dark hover:text-emerald-600 font-semibold underline decoration-brand-dark/30 underline-offset-2">
                        {children}
                      </a>
                    );
                  }
                }
              }}
            />
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
