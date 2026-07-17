import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getProductBySlug, getAllSlugs } from '../../../lib/product-details';
import { BackButton } from '../../../components/BackButton';
import { MarketplaceButtons } from '../../../components/MarketplaceButtons';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nanodiesel.id';

// Parse harga "Rp 70.000" → 70000
function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Produk Tidak Ditemukan | Nano Diesel' };
  }

  const canonical = `https://www.nanodiesel.id/produk/${slug}`;

  return {
    title: `Beli Aditif Solar ${product.title} - Nano Diesel Original`,
    description: `Beli aditif solar ${product.title.toLowerCase()} dari Nano Diesel. Praktis untuk pemakaian, hemat BBM, dan bersihkan injektor. Pesan sekarang untuk mesin awet!`,
    alternates: { canonical },
    keywords: [
      'aditif solar',
      'aditif diesel',
      'nano diesel',
      product.title,
      'hemat bbm',
      'aditif bahan bakar diesel',
      `beli aditif solar ${product.title.toLowerCase()}`
    ],
    openGraph: {
      title: `Beli Aditif Solar ${product.title} - Nano Diesel Original`,
      description: `Beli aditif solar ${product.title.toLowerCase()} dari Nano Diesel. Praktis untuk pemakaian, hemat BBM, dan bersihkan injektor. Pesan sekarang untuk mesin awet!`,
      url: canonical,
      siteName: 'Nano Diesel',
      images: [{ url: `${BASE_URL}${product.image}` }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="pt-[72px] min-h-screen bg-olive-50">
        <div className="max-w-[800px] mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-headline font-black text-brand-dark mb-4">
            Produk Tidak Ditemukan
          </h1>
          <p className="text-brand-copy mb-6">
            Maaf, produk yang Anda cari tidak tersedia.
          </p>
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold py-3 px-6 rounded-xl text-sm hover:bg-emerald-600 transition-all"
          >
            Kembali ke Shop
          </Link>
        </div>
      </main>
    );
  }

  const price = parsePrice(product.price);

  // JSON-LD: Product Schema
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.subtitle,
    description: product.description,
    image: `${BASE_URL}${product.image}`,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Nano Diesel',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: price,
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/produk/${slug}`,
      seller: {
        '@type': 'Organization',
        name: 'Nano Diesel',
      },
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <main className="pt-[72px] min-h-screen bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12 py-8 md:py-12">
          {/* Tombol Kembali — Client Component karena pakai useSearchParams */}
          <Suspense
            fallback={
              <Link
                href="/produk"
                className="inline-flex items-center gap-1 text-sm text-olive-500 hover:text-emerald-600 transition-colors mb-6"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Kembali ke Shop
              </Link>
            }
          >
            <BackButton />
          </Suspense>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-olive-100">
              <img
                src={product.image}
                alt={product.subtitle}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col">
              <div className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-2">
                Nano Diesel
              </div>
              <h1 className="text-3xl md:text-4xl font-headline font-black text-brand-dark leading-tight mb-1">
                {product.title}
              </h1>
              <p className="text-sm md:text-base text-olive-500 font-medium mb-4">
                {product.subtitle}
              </p>
              <p className="text-brand-copy leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="text-2xl md:text-3xl font-black text-emerald-700 mb-6">
                {product.price}
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <MarketplaceButtons
                  productTitle={product.title}
                  shopeeUrl={product.shopee}
                  tokopediaUrl={product.tokopedia}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20 max-w-[800px]">
            {product.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-lg md:text-xl font-headline font-bold text-brand-dark mb-3">
                  {section.heading}
                </h2>
                <ul className="space-y-1.5">
                  {section.body.map((item, j) => (
                    <li
                      key={j}
                      className="text-sm md:text-base text-brand-copy leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-emerald-600 mt-1.5 flex-shrink-0">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
