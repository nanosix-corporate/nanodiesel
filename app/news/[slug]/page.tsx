import { client } from '../../../sanity/client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import ArticleImage from '../../../components/ArticleImage';
import { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { title, excerpt, seoKeywords }`,
    { slug }
  );

  if (!post) {
    return { title: 'Artikel Tidak Ditemukan | Nano Diesel' };
  }

  return {
    title: `${post.title} | Nano Diesel`,
    description: post.excerpt || 'Baca artikel dan edukasi terbaru seputar perawatan mesin diesel, aditif solar terbaik, dan cara hemat bbm.',
    keywords: post.seoKeywords || 'aditif solar terbaik, aditif bahan bakar, hemat bbm diesel, solar murah jadi rasa premium',
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
              Kembali ke News
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] min-h-screen">
      {/* Page Header */}
      <div className="-mt-[72px] bg-brand-dark text-white px-6 lg:px-12 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-transparent to-brand-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <Link href="/news" className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-4 inline-block hover:text-emerald-300 transition-colors">
            &larr; Kembali ke News
          </Link>
          <h1 className="text-3xl md:text-5xl font-headline font-black mb-6">{post.title}</h1>
          {post.excerpt && (
            <p className="text-base md:text-lg text-olive-300 max-w-2xl mx-auto leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {(post.mainImageUrl || post.imageUrl) && (
        <div className="bg-white border-t border-olive-200">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-12 pt-8 md:pt-12">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ArticleImage
                src={post.mainImageUrl || post.imageUrl}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      )}

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
