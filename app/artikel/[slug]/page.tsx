import { client } from '../../../sanity/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import ArticleImage from '../../../components/ArticleImage';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getProductBySlug } from '../../../lib/product-details';
import { buildMarketplaceUrl } from '../../../lib/utm';
import { ArticleProductCardButtons } from '../../../components/ArticleProductCardButtons';
import { PriceTooltip } from '../../../components/PriceTooltip';

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

  // JSON-LD: FAQPage Schema — dibangun otomatis dari blok faqSection dalam konten
  const faqItems = (post.content || [])
    .filter((block: any) => block._type === 'faqSection' && Array.isArray(block.items) && block.items.length > 0)
    .flatMap((block: any) => block.items)
    .filter((item: any) => item.question && item.answer);

  const faqPageJsonLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item: any) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      {/* JSON-LD: Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* JSON-LD: FAQPage (hanya jika artikel mengandung Modul FAQ) */}
      {faqPageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
        />
      )}
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
                    
                    const productInfo = value.productId ? getProductBySlug(value.productId) : null;
                    const displayTitle = productInfo ? `Nano Diesel ${productInfo.title}` : value.title;
                    const displayDesc = productInfo ? productInfo.subtitle : value.description;
                    const displayImage = productInfo ? productInfo.image : value.imageUrl;
                    
                    let buttonsToRender: any[] = [];

                    // Label produk: dipakai untuk GA4 event & UTM campaign & aria-label SEO
                    const productLabel = productInfo
                      ? `Nano Diesel ${productInfo.title}`
                      : (value.title || 'Nano Diesel');
                    
                    if (productInfo) {
                      // Ambil target (bisa array atau string, default ['internal'])
                      // Khusus produk bulk (tidak punya Shopee/Tokopedia), default ke ['whatsapp']
                      const isBulkProduct = !productInfo.shopee && !productInfo.tokopedia;
                      let targets = isBulkProduct ? ['whatsapp'] : ['internal'];
                      if (Array.isArray(value.buttonTarget) && value.buttonTarget.length > 0) {
                        targets = value.buttonTarget;
                      } else if (typeof value.buttonTarget === 'string' && value.buttonTarget.trim() !== '') {
                        targets = [value.buttonTarget];
                      }

                      targets.forEach((t: string) => {
                        if (t === 'shopee' && productInfo.shopee) {
                          buttonsToRender.push({
                            // UTM di-inject di server — medium: article_card
                            url: buildMarketplaceUrl(productInfo.shopee, 'shopee', productLabel, 'article_card'),
                            text: 'Shopee',
                            // aria-label: keyword transactional Purchase-stage (SEO)
                            ariaLabel: `Beli aditif solar ${productLabel} di Shopee`,
                            platform: 'shopee',
                            productLabel,
                            btnClass: "bg-[#EE4D2D] hover:bg-[#D74326] text-white shadow-[#EE4D2D]/20 border border-[#EE4D2D]",
                            isExternal: true
                          });
                        } else if (t === 'tokopedia' && productInfo.tokopedia) {
                          buttonsToRender.push({
                            // UTM di-inject di server — medium: article_card
                            url: buildMarketplaceUrl(productInfo.tokopedia, 'tokopedia', productLabel, 'article_card'),
                            text: 'Tokopedia',
                            // aria-label: keyword transactional Purchase-stage (SEO)
                            ariaLabel: `Beli aditif solar ${productLabel} di Tokopedia`,
                            platform: 'tokopedia',
                            productLabel,
                            btnClass: "bg-[#00AA5B] hover:bg-[#008F4C] text-white shadow-[#00AA5B]/20 border border-[#00AA5B]",
                            isExternal: true
                          });
                        } else if (t === 'whatsapp') {
                          const waText = encodeURIComponent(`Halo Nano Diesel, saya berminat memesan ${productLabel} (order via Artikel)`);
                          buttonsToRender.push({
                            url: `https://wa.me/+622122483303?text=${waText}`,
                            text: 'Pesan via WhatsApp',
                            ariaLabel: `Order aditif solar ${productLabel} via WhatsApp`,
                            platform: 'whatsapp',
                            productLabel,
                            btnClass: "bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[#25D366]/20 border border-[#25D366]",
                            isExternal: true
                          });
                        } else if (t === 'internal') {
                          buttonsToRender.push({
                            url: `/produk/${value.productId}`,
                            text: 'Lihat Detail Produk',
                            ariaLabel: `Lihat detail produk aditif solar ${productLabel}`,
                            productLabel,
                            btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/10 border border-emerald-600",
                            isExternal: false
                          });
                        }
                      });
                    } else if (value.linkUrl) {
                      // Fallback untuk artikel lama
                      const isExt = value.linkUrl.includes('shopee') || value.linkUrl.includes('tokopedia');
                      const legacyPlatform = value.linkUrl.includes('shopee') ? 'shopee' : value.linkUrl.includes('tokopedia') ? 'tokopedia' : undefined;
                      buttonsToRender.push({
                        url: legacyPlatform
                          ? buildMarketplaceUrl(value.linkUrl, legacyPlatform, productLabel, 'article_card')
                          : value.linkUrl,
                        text: value.buttonText || 'Lihat Produk',
                        ariaLabel: legacyPlatform
                          ? `Beli aditif solar ${productLabel} di ${legacyPlatform.charAt(0).toUpperCase() + legacyPlatform.slice(1)}`
                          : undefined,
                        platform: legacyPlatform,
                        productLabel,
                        btnClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/10 border border-emerald-600",
                        isExternal: isExt
                      });
                    }

                    return (
                      <div className="my-10 rounded-2xl border border-olive-200 bg-olive-50 overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow not-prose">
                        {displayImage && (
                          <div className="sm:w-1/3 aspect-square sm:aspect-auto sm:min-h-[200px] bg-white relative border-b sm:border-b-0 sm:border-r border-olive-100 flex items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={displayImage} alt={displayTitle || 'Product Image'} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="p-5 sm:p-7 flex flex-col justify-center flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-2 leading-tight">{displayTitle}</h3>
                          {displayDesc && <p className="text-olive-700 text-sm sm:text-base mb-3 leading-relaxed">{displayDesc}</p>}
                          
                          {/* Harga + Tooltip Disclaimer */}
                          {productInfo?.price && (
                            <div className="flex items-center gap-1.5 text-base sm:text-lg font-black text-emerald-700 mb-4">
                              {productInfo.price}
                              {productInfo.price.startsWith('Rp') && <PriceTooltip size={15} />}
                            </div>
                          )}

                          {/* ArticleProductCardButtons: Client Component untuk GA4 onClick + aria-label SEO */}
                          <ArticleProductCardButtons buttons={buttonsToRender} />
                        </div>
                      </div>
                    );
                  }
                },
                // ─── TABLE BLOCK RENDERER ──────────────────────────
                tableBlock: ({ value }: any) => {
                  if (!value) return null;
                  const { caption, headers, rows } = value;
                  const hasHeaders = Array.isArray(headers) && headers.length > 0;
                  const hasRows = Array.isArray(rows) && rows.length > 0;
                  if (!hasHeaders && !hasRows) return null;
                  return (
                    <div className="my-10 not-prose overflow-x-auto rounded-xl border border-olive-200 shadow-sm">
                      {caption && (
                        <p className="px-4 py-2 text-xs font-semibold text-olive-500 uppercase tracking-wider bg-olive-50 border-b border-olive-200">
                          {caption}
                        </p>
                      )}
                      <table className="w-full text-sm text-left">
                        {hasHeaders && (
                          <thead className="bg-emerald-900 text-white">
                            <tr>
                              {headers.map((header: string, i: number) => (
                                <th
                                  key={i}
                                  scope="col"
                                  className="px-4 py-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        {hasRows && (
                          <tbody className="divide-y divide-olive-100">
                            {rows.map((row: any, rowIdx: number) => (
                              <tr
                                key={rowIdx}
                                className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-olive-50'}
                              >
                                {Array.isArray(row.cells) && row.cells.map((cell: string, cellIdx: number) => (
                                  <td
                                    key={cellIdx}
                                    className="px-4 py-3 text-brand-dark align-top"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  );
                },
                // ─── FAQ SECTION RENDERER ─────────────────────────
                faqSection: ({ value }: any) => {
                  if (!value || !Array.isArray(value.items) || value.items.length === 0) return null;
                  return (
                    <div className="my-10 not-prose">
                      {value.sectionTitle && (
                        <h2 className="text-xl font-headline font-bold text-brand-dark mb-4">
                          {value.sectionTitle}
                        </h2>
                      )}
                      <div className="divide-y divide-olive-200 border border-olive-200 rounded-xl overflow-hidden">
                        {value.items.map((item: any, idx: number) => (
                          <details
                            key={idx}
                            name={`faq-article-${value._key || 'block'}`}
                            className="group bg-white"
                          >
                            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-brand-dark text-base list-none [&::-webkit-details-marker]:hidden hover:bg-olive-50 transition-colors">
                              <span>{item.question}</span>
                              <div className="w-7 h-7 rounded bg-olive-100 text-brand-dark flex items-center justify-center shrink-0 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-800">
                                <span className="text-xl leading-none font-normal mt-[-2px] group-open:hidden">+</span>
                                <span className="text-xl leading-none font-normal mt-[-2px] hidden group-open:block">&#8722;</span>
                              </div>
                            </summary>
                            <div className="px-5 pb-5 pt-3 text-brand-copy text-sm leading-relaxed border-t border-olive-100 bg-olive-50">
                              {item.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  );
                },
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
