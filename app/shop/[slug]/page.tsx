'use client';

import { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug } from '../../../lib/product-details';
import { OrderModal } from '../../../components/OrderModal';

function ProductDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const from = searchParams.get('from');
  const backHref = from === 'home' ? '/' : '/shop';
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="pt-[72px] min-h-screen bg-olive-50">
        <div className="max-w-[800px] mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-headline font-black text-brand-dark mb-4">Produk Tidak Ditemukan</h1>
          <p className="text-brand-copy mb-6">Maaf, produk yang Anda cari tidak tersedia.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold py-3 px-6 rounded-xl text-sm hover:bg-emerald-600 transition-all">
            Kembali ke Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 py-8 md:py-12">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-olive-500 hover:text-emerald-600 transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          {from === 'home' ? 'Kembali ke Beranda' : 'Kembali ke Shop'}
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-olive-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col">
            <div className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-2">Nano Diesel</div>
            <h1 className="text-3xl md:text-4xl font-headline font-black text-brand-dark leading-tight mb-1">
              {product.title}
            </h1>
            <p className="text-sm md:text-base text-olive-500 font-medium mb-4">{product.subtitle}</p>
            <p className="text-brand-copy leading-relaxed mb-6">{product.description}</p>

            <div className="text-2xl md:text-3xl font-black text-emerald-700 mb-6">{product.price}</div>

            <div className="flex flex-col gap-3 mt-auto">
              <div className="flex gap-3">
                {product.shopee && (
                  <a
                    href={product.shopee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-olive-200 hover:border-emerald-200 rounded-xl text-sm font-bold text-brand-dark transition-all"
                  >
                    <img src="/images/icon/shopee_icon.svg" alt="Shopee" className="w-4 h-4 object-contain" />
                    Shopee
                  </a>
                )}
                {product.tokopedia && (
                  <a
                    href={product.tokopedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-olive-200 hover:border-emerald-200 rounded-xl text-sm font-bold text-brand-dark transition-all"
                  >
                    <img src="/images/icon/tokopedia_icon.svg" alt="Tokopedia" className="w-4 h-4 object-contain" />
                    Tokopedia
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 max-w-[800px]">
          {product.sections.map((section, i) => (
            <div key={i} className="mb-8">
              <h2 className="text-lg md:text-xl font-headline font-bold text-brand-dark mb-3">{section.heading}</h2>
              <ul className="space-y-1.5">
                {section.body.map((item, j) => (
                  <li key={j} className="text-sm md:text-base text-brand-copy leading-relaxed flex items-start gap-2">
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
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <main className="pt-[72px] min-h-screen bg-white flex items-center justify-center">
        <p className="text-brand-copy">Memuat...</p>
      </main>
    }>
      <ProductDetail />
    </Suspense>
  );
}
