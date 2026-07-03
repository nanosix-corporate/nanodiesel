import { client } from '../../sanity/client';
import ArticleImage from '../../components/ArticleImage';
import SearchForm from './SearchForm';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Berita & Artikel | Nano Diesel',
  description: 'Baca berita, artikel, dan edukasi terbaru seputar perawatan mesin diesel, aditif solar terbaik, dan cara hemat bbm.',
  keywords: 'aditif solar terbaik, aditif bahan bakar, hemat bbm diesel, solar murah jadi rasa premium',
};

const categories = ['Semua', 'Pembaruan Produk', 'Berita Industri', 'Studi Kasus', 'Tips & Edukasi'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildQuery(searchParams: { category?: string; q?: string }) {
  const filters = [`_type == "post"`];
  if (searchParams.category && searchParams.category !== 'Semua') {
    filters.push(`category == "${searchParams.category}"`);
  }
  if (searchParams.q) {
    const q = searchParams.q.replace(/"/g, '\\"');
    filters.push(`title match "*${q}*" || excerpt match "*${q}*"`);
  }
  return `*[${filters.join(' && ')}] | order(_createdAt desc) { ..., "mainImageUrl": mainImage.asset->url }`;
}

function buildHref(category: string, searchParams: { q?: string }) {
  const params = new URLSearchParams();
  if (category !== 'Semua') params.set('category', category);
  if (searchParams.q) params.set('q', searchParams.q);
  const qs = params.toString();
  return `/news${qs ? `?${qs}` : ''}`;
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const activeCategory = sp.category || 'Semua';
  const query = buildQuery(sp);
  const posts = await client.fetch(query);

  return (
    <main className="pt-[72px] min-h-screen bg-white">
      <section className="py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-4 py-1.5 rounded-full mb-4">
              Artikel & Berita
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-brand-dark leading-tight">
              Artikel & Edukasi Terbaru
            </h2>
          </div>

          {/* Filter & Search Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={buildHref(cat, sp)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-brand-dark text-white'
                      : 'bg-olive-100 text-brand-copy hover:bg-olive-200'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <SearchForm initialQuery={sp.q || ''} />
          </div>

          {/* Article Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-olive-300 mb-4">article</span>
              <p className="text-brand-copy text-lg">Belum ada artikel tersedia.</p>
              <p className="text-sm text-olive-400 mt-2">Artikel terbaru akan muncul di sini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post: any) => (
                <a
                  key={post._id}
                  href={`/news/${post.slug?.current || '#'}`}
                  className="group flex flex-col rounded-2xl border border-olive-100 bg-white overflow-hidden hover:shadow-lg hover:border-olive-200 transition-all duration-300"
                >
                  {/* Image Thumbnail */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-olive-100">
                    {(post.mainImageUrl || post.imageUrl) ? (
                      <ArticleImage
                        src={post.mainImageUrl || post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-olive-300">image</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    {post.category && (
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                        {post.category}
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl font-headline font-bold text-brand-dark leading-snug mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-brand-copy leading-relaxed mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-olive-100 mt-auto">
                      <span className="text-xs font-semibold text-brand-dark">
                        {post.author || 'Nano Diesel'}
                      </span>
                      <span className="text-xs text-olive-400">
                        {formatDate(post._createdAt)}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
