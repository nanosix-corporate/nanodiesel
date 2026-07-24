'use client';

import Link from 'next/link';
import { trackMarketplaceClick } from '../lib/utm';

interface ButtonConfig {
  url: string;
  text: string;
  btnClass: string;
  isExternal: boolean;
  /** Platform untuk GA4 event — hanya diisi untuk tombol Shopee & Tokopedia */
  platform?: 'shopee' | 'tokopedia';
  /** Nama produk untuk GA4 event & UTM campaign */
  productLabel: string;
  /** aria-label yang mengandung keyword transactional untuk SEO */
  ariaLabel?: string;
}

interface ArticleProductCardButtonsProps {
  buttons: ButtonConfig[];
}

/**
 * Render tombol Shopee, Tokopedia, & internal dari Product Card Sanity.
 *
 * Dipisah sebagai Client Component karena:
 * - `onClick` (untuk GA4 trackMarketplaceClick) tidak bisa berjalan di Server Component.
 * - URL marketplace sudah di-inject UTM parameter dari server sebelum dikirim sebagai props.
 *
 * SEO: Setiap tombol eksternal memiliki `aria-label` yang mengandung keyword
 * Purchase-stage dari analisis keyword Nano Diesel (e.g., "Beli aditif solar … di Shopee").
 *
 * Analytics: Klik Shopee & Tokopedia mengirim event `marketplace_click` ke GA4
 * dengan `medium: article_card`, sehingga mudah dibedakan dari klik di halaman produk.
 */
export function ArticleProductCardButtons({ buttons }: ArticleProductCardButtonsProps) {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-auto">
      {buttons.map((btn, idx) =>
        btn.isExternal ? (
          <a
            key={idx}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={btn.ariaLabel}
            onClick={() => {
              if (btn.platform) {
                trackMarketplaceClick(btn.platform, btn.productLabel, 'article_card');
              }
            }}
            className={`inline-flex items-center justify-center font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-sm ${btn.btnClass}`}
          >
            {btn.text}
          </a>
        ) : (
          <Link
            key={idx}
            href={btn.url}
            aria-label={btn.ariaLabel}
            className={`inline-flex items-center justify-center font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-sm ${btn.btnClass}`}
          >
            {btn.text}
          </Link>
        )
      )}
    </div>
  );
}
