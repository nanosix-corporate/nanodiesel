/**
 * Utility terpusat untuk UTM tracking semua link marketplace Nano Diesel.
 *
 * utm_source  = nanodiesel_web   (selalu dari website kita)
 * utm_medium  = product_page | order_modal | article_card
 * utm_campaign= nama produk yang diklik (slug-friendly)
 * utm_content = shopee | tokopedia
 */

export type UtmMedium = 'product_page' | 'order_modal' | 'article_card';

/**
 * Menyuntikkan UTM parameters ke URL marketplace.
 * Jika URL sudah punya query string, parameter UTM akan ditambahkan.
 */
export function buildMarketplaceUrl(
  baseUrl: string,
  platform: 'shopee' | 'tokopedia',
  productName: string,
  medium: UtmMedium
): string {
  try {
    const url = new URL(baseUrl);
    const campaign = productName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_');

    url.searchParams.set('utm_source', 'nanodiesel_web');
    url.searchParams.set('utm_medium', medium);
    url.searchParams.set('utm_campaign', campaign);
    url.searchParams.set('utm_content', platform);

    return url.toString();
  } catch {
    // Fallback jika URL tidak valid
    return baseUrl;
  }
}

/**
 * Mengirim event klik ke Google Analytics 4.
 * Event name: marketplace_click (custom event)
 */
export function trackMarketplaceClick(
  platform: 'shopee' | 'tokopedia' | 'whatsapp',
  productName: string,
  medium: UtmMedium
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'marketplace_click', {
    event_category: 'outbound',
    event_label: platform,
    product_name: productName,
    medium: medium,
    platform: platform,
  });
}
