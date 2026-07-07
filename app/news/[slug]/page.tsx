import { client } from '../../../sanity/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import ArticleImage from '../../../components/ArticleImage';
import { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { title, excerpt, seo { ..., "metaImageUrl": metaImage.asset->url, openGraph { ..., "imageUrl": image.asset->url } } }`,
    { slug }
  );

  if (!post) {
    return { title: 'Artikel Tidak Ditemukan | Nano Diesel' };
  }

  const defaultDesc = 'Baca artikel dan edukasi terbaru seputar perawatan mesin diesel, aditif solar terbaik, dan cara hemat bbm.';
  const defaultKeywords = ['aditif solar terbaik', 'aditif bahan bakar', 'hemat bbm diesel', 'solar murah jadi rasa premium'];

  return {
    title: post.seo?.metaTitle || `${post.title} | Nano Diesel`,
    description: post.seo?.metaDescription || post.excerpt || defaultDesc,
    keywords: post.seo?.seoKeywords || defaultKeywords,
    openGraph: {
      title: post.seo?.openGraph?.title || post.seo?.metaTitle || post.title,
      description: post.seo?.openGraph?.description || post.seo?.metaDescription || post.excerpt || defaultDesc,
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
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ..., "mainImageUrl": mainImage.asset->url }`,
    { slug }
  );

  if (!post) {
    return (
      <main className="pt-[72px] min-h-screen">
        <div className="-mt-[72px] bg-brand-dark text-white px-6 lg:px-12 py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-black mb-6">Artikel Tidak Ditemukan</h1>
            <p className="text-olive-300 mb-8">Halaman yang Anda cari tidak tersedia.</p>
            <Link href="/news" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all">
              Kembali
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] min-h-screen">
      {/* Page Header */}
      <div
        className="-mt-[72px] bg-brand-dark text-white px-6 lg:px-12 pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: (post.mainImageUrl || post.imageUrl) ? `url(${post.mainImageUrl || post.imageUrl})` : 'none' }}
      >
        <div className="absolute inset-0 bg-brand-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-transparent to-brand-dark" />
        <div className="max-w-[1000px] mx-auto text-left relative z-10">
          <Link href="/news" className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 inline-block hover:text-emerald-300 transition-colors">
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
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content} />
          </div>
        </div>
      </section>
    </main>
  );
}
