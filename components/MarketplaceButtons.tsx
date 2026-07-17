'use client';

import { buildMarketplaceUrl, trackMarketplaceClick } from '../lib/utm';

interface MarketplaceButtonsProps {
  productTitle: string;
  shopeeUrl: string | null | undefined;
  tokopediaUrl: string | null | undefined;
}

/**
 * Tombol Shopee & Tokopedia dengan UTM + GA4 tracking
 * untuk dipakai di Product Detail Page (Server Component).
 */
export function MarketplaceButtons({
  productTitle,
  shopeeUrl,
  tokopediaUrl,
}: MarketplaceButtonsProps) {
  const trackedShopeeUrl = shopeeUrl
    ? buildMarketplaceUrl(shopeeUrl, 'shopee', productTitle, 'product_page')
    : null;

  const trackedTokopediaUrl = tokopediaUrl
    ? buildMarketplaceUrl(tokopediaUrl, 'tokopedia', productTitle, 'product_page')
    : null;

  if (!trackedShopeeUrl && !trackedTokopediaUrl) return null;

  return (
    <div className="flex gap-3">
      {trackedShopeeUrl && (
        <a
          href={trackedShopeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMarketplaceClick('shopee', productTitle, 'product_page')}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-olive-200 hover:border-emerald-200 rounded-xl text-sm font-bold text-brand-dark transition-all"
        >
          <img
            src="/images/icon/shopee_icon.svg"
            alt="Shopee"
            className="w-4 h-4 object-contain"
          />
          Shopee
        </a>
      )}
      {trackedTokopediaUrl && (
        <a
          href={trackedTokopediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMarketplaceClick('tokopedia', productTitle, 'product_page')}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-olive-200 hover:border-emerald-200 rounded-xl text-sm font-bold text-brand-dark transition-all"
        >
          <img
            src="/images/icon/tokopedia_icon.svg"
            alt="Tokopedia"
            className="w-4 h-4 object-contain"
          />
          Tokopedia
        </a>
      )}
    </div>
  );
}
