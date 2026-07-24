import Link from 'next/link';
import Image from 'next/image';
import { ShopModalController } from '../../components/ShopModalController';
import { generateSeoMetadata, BASE_URL } from '../../lib/seo';

export const metadata = generateSeoMetadata({
  title: 'Aditif Solar Premium Nano Diesel | Proteksi & Performa Optimal',
  description: 'Beli aditif solar diesel Nano Diesel mulai 1 botol 70ml. Pengiriman ke seluruh Indonesia.',
  path: '/produk',
});

// Data produk didefinisikan di server — tidak ada 'use client'
export const shopProducts = [
  {
    id: 'Nano Diesel 1 Botol (70ml)',
    slug: 'nano-diesel-1-botol-70ml',
    title: '1 Botol',
    subtitle: 'Nano Diesel (70 ml)',
    label: 'Cocok Untuk Satu Isi Tangki',
    price: 'Rp 70.000',
    numericPrice: 70000,
    description:
      'Cocok untuk satu kali pengisian penuh. Coba rasakan perbedaannya di tangki kendaraan Anda.',
    image: '/images/product/product-image-1.webp',
    badge: null as string | null,
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Hemat-BBM-Boost-Performa-Mesin-Diesel-70-ml-1-botol-Aditif-Solar-Premium-i.1822722168.47810303561',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/hemat-bbm-aditif-solar-diesel-nanodiesel-70ml-performa-mesin-diesel-lebih-maksimal-1-botol-1735927704744003386',
    wa: 'Nano Diesel 1 Botol (70ml)',
  },
  {
    id: 'Nano Diesel 2 Botol (2x70ml)',
    slug: 'nano-diesel-2-botol-2x70ml',
    title: '2 Botol',
    subtitle: 'Nano Diesel (2 × 70 ml)',
    label: 'Pilihan Paling Populer',
    price: 'Rp 135.000',
    numericPrice: 135000,
    description:
      'Pilihan paling populer. Cukup untuk dua kali pengisian dan merasakan manfaat penuh Nano Diesel.',
    image: '/images/product/product-image-2.webp',
    badge: 'Best Seller' as string | null,
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Value-Pack-2-botol-Hemat-Bahan-Bakar-Aditif-Solar-Premium-i.1822722168.46911170264',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/paket-hemat-nanodiesel-70ml-2-botol-aditif-solar-diesel-hemat-bahan-bakar-1735928198678349626',
    wa: 'Nano Diesel 2 Botol (2x70ml)',
  },
  {
    id: 'Nano Diesel 3 Botol (3x70ml)',
    slug: 'nano-diesel-3-botol-3x70ml',
    title: '3 Botol',
    subtitle: 'Nano Diesel (3 × 70 ml)',
    label: 'Cocok Untuk Perjalanan Jauh',
    price: 'Rp 185.000',
    numericPrice: 185000,
    description:
      'Pilihan tengah yang pas untuk pemakaian beberapa kali. Cocok untuk perjalanan jauh dan aktivitas harian.',
    image: '/images/product/product-image-5.webp',
    badge: null as string | null,
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-PAKET-3-BOTOL-Boost-Performa-Mesin-Lubrikasi-Maksimal-Mesin-Awet-Aditif-Solar-Premium-i.1822722168.56511892375',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/aditif-solar-diesel-nanodiesel-paket-3-botol-boost-performa-mesin-lubrikasi-maksimal-mesin-awet-1735997067861460794',
    wa: 'Nano Diesel 3 Botol (3x70ml)',
  },
  {
    id: 'Nano Diesel 6 Botol (6x70ml)',
    slug: 'nano-diesel-6-botol-6x70ml',
    title: '5 Botol Gratis 1 Botol',
    subtitle: 'Nano Diesel (6 × 70 ml)',
    label: 'Paket Paling Hemat',
    price: 'Rp 350.000',
    numericPrice: 350000,
    description:
      'Paket ekonomis untuk pemakaian rutin. Ideal untuk armada kecil atau stok bulanan kendaraan diesel Anda.',
    image: '/images/product/product-image-3.webp',
    badge: 'Hemat' as string | null,
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Hemat-Operasional-Diesel-PAKET-5-Botol-1-70-ml-Adtif-Solar-Premium-i.1822722168.55661503493',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/fleet-pack-beli-5-gratis-1-nanodiesel-70ml-untuk-mobil-diesel-truk-kendaraan-diesel-lain-1735928297609987898',
    wa: 'Nano Diesel 6 Botol (6x70ml)',
  },
  {
    id: 'Nano Diesel 12 Botol (12x70ml)',
    slug: 'nano-diesel-12-botol-12x70ml',
    title: '10 Botol Gratis 2 Botol',
    subtitle: 'Nano Diesel (12 × 70 ml)',
    label: 'Super Hemat Untuk Armada',
    price: 'Rp 700.000',
    numericPrice: 700000,
    description:
      'Paket super hemat untuk pemakaian jangka panjang. Solusi paling ekonomis untuk armada atau stok besar.',
    image: '/images/product/product-image-6.webp',
    badge: 'Hemat' as string | null,
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Fleet-Pack-Pro-70ml-Paket-Hemat-Operasional-Diesel-10-2-Aditif-Solar-Premium-i.1822722168.51361706484',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/beli-10-gratis-2-nanodiesel-fleet-pack-pro-70ml-paket-hemat-operasional-diesel-1735928328344602426',
    wa: 'Nano Diesel 12 Botol (12x70ml)',
  },
  {
    id: 'Bulk Industri',
    slug: null as string | null,
    title: 'Skala Industri',
    subtitle: 'Drum Industri (Bulk)',
    label: 'Harga Negosiasi B2B',
    price: 'B2B Spesial',
    numericPrice: 0,
    description:
      'Drum industri (Bulk) khusus untuk perusahaan pertambangan, pabrik, perkapalan, & alat berat.',
    image: '/images/product/product-image-4.webp',
    badge: 'B2B' as string | null,
    dark: true,
    shopee: null,
    tokopedia: null,
    wa: 'Skala Industri',
  },
];

// JSON-LD: ItemList Schema
const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Produk Nano Diesel — Aditif Solar Diesel',
  description:
    'Daftar produk Nano Diesel dalam berbagai kemasan untuk kendaraan dan industri.',
  url: `${BASE_URL}/produk`,
  itemListElement: shopProducts
    .filter((p) => p.slug)
    .map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${p.id} - Aditif Solar Nano Diesel`,
      url: `${BASE_URL}/produk/${p.slug}`,
      item: {
        '@type': 'Product',
        name: `${p.id} - Aditif Solar Nano Diesel`,
        image: `${BASE_URL}${p.image}`,
        description: p.description,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: p.numericPrice,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
};

export default function ShopPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <main className="pt-[72px] min-h-screen">
        {/* Page Header */}
        <div className="-mt-[72px] bg-brand-dark text-brand-white px-6 lg:px-12 pt-28 md:pt-40 pb-16 md:pb-20 relative overflow-hidden bg-[url('/images/shop-banner.webp')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/70 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="max-w-[1200px] mx-auto text-left relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-brand-white leading-tight mb-6">
                Pilih Sesuai Kebutuhan Anda
              </h1>
              <p className="text-base md:text-lg text-olive-300 leading-relaxed max-w-2xl mb-8">
                Mesin diesel Anda layak mendapat perlindungan terbaik. Pilih kemasan Nano Diesel yang sesuai — dan hitung langsung seberapa efisien pengeluaran Anda setiap bulannya.
              </p>
              <Link
                href="/kalkulator-hemat-bbm"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-sm md:text-base transition-all hover:shadow-lg hover:shadow-emerald-600/25 group"
              >
                Coba Kalkulator Hemat BBM
                <span className="material-symbols-outlined text-[1em] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>



        {/* Product Grid */}
        <section className="py-16 md:py-24 px-6 lg:px-12 bg-olive-50 border-t border-olive-200">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {shopProducts.map((product) => (
                <div
                  key={product.id}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 flex flex-col relative ${product.dark
                    ? 'bg-brand-dark shadow-lg shadow-black/20'
                    : 'bg-white border border-olive-200 shadow-sm hover:shadow-xl hover:border-emerald-200'
                    }`}
                >
                  {product.badge && (
                    <div
                      className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-lg ${product.badge === 'Best Seller'
                        ? 'bg-emerald-600'
                        : product.badge === 'B2B'
                          ? 'bg-brand-dark border border-emerald-500/40 text-emerald-400'
                          : 'bg-amber-500'
                        }`}
                    >
                      {product.badge}
                    </div>
                  )}
                  <div
                    className={`aspect-[4/3] relative overflow-hidden ${product.dark ? 'bg-brand-darkest' : 'bg-olive-100'
                      }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
                  </div>
                  <div className="p-3 flex-grow flex flex-col gap-1">
                    <h3
                      className={`text-xs md:text-sm font-bold font-headline leading-tight line-clamp-2 ${product.dark ? 'text-white' : 'text-brand-dark'
                        }`}
                    >
                      {product.title}
                    </h3>
                    <span
                      className={`text-xs font-medium ${product.dark ? 'text-olive-400/70' : 'text-olive-400'
                        }`}
                    >
                      {product.subtitle}
                    </span>
                    <p
                      className={`text-xs leading-relaxed line-clamp-1 ${product.dark ? 'text-olive-400' : 'text-brand-copy/80'
                        }`}
                    >
                      {product.description}
                    </p>
                    {!product.dark && product.slug && (
                      <Link
                        href={`/produk/${product.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 transition-all my-2"
                      >
                        Lihat deskripsi produk
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          <path
                            d="M3 1L7 5L3 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    )}
                    <div className="mt-auto">
                      {product.dark ? (
                        <>
                          <div className="text-lg md:text-xl font-black mb-3 text-brand-white">
                            {product.price}
                          </div>
                          <a
                            href={`https://wa.me/622122483303?text=Halo%20Nano%20Diesel%2C%20saya%20ingin%20bertanya%20mengenai%20produk%20${encodeURIComponent(product.wa)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs md:text-sm text-center transition-all hover:shadow-lg hover:shadow-emerald-600/20 block"
                          >
                            Hubungi via WhatsApp
                          </a>
                        </>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="text-sm md:text-base font-black text-brand-dark whitespace-nowrap">
                            {product.price}
                          </div>
                          {/* Placeholder — akan di-hydrate oleh ShopModalController */}
                          <button
                            type="button"
                            data-buy-product-id={product.id}
                            className="w-full py-2 px-3 bg-brand-dark hover:bg-emerald-600 text-white font-bold rounded-lg text-xs md:text-sm transition-all"
                          >
                            Beli Sekarang
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Store Links */}
            <div className="mt-16 md:mt-20 rounded-2xl bg-gradient-to-br from-brand-dark via-brand-dark to-brand-darkest border border-emerald-900/20 p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-headline font-black mb-4">
                  Tersedia di Marketplace Resmi
                </h2>
                <p className="text-olive-300 mb-8 max-w-lg mx-auto leading-relaxed">
                  Dapatkan Nano Diesel dengan mudah
                  <br />
                  <strong>
                    melalui Shopee dan Tokopedia Official Store kami.
                  </strong>
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://shopee.co.id/nanodiesel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-white hover:bg-olive-100 text-brand-dark font-bold py-3.5 px-7 rounded-xl text-sm transition-all hover:shadow-lg"
                  >
                    <Image
                      src="/images/icon/shopee_icon.svg"
                      alt="Shopee"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    Shopee Official Store
                  </a>
                  <a
                    href="https://www.tokopedia.com/nanodiesel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-white hover:bg-olive-100 text-brand-dark font-bold py-3.5 px-7 rounded-xl text-sm transition-all hover:shadow-lg"
                  >
                    <Image
                      src="/images/icon/tokopedia_icon.svg"
                      alt="Tokopedia"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                    Tokopedia Official Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
          Client Component yang attach event listener ke tombol [data-buy-product-id]
          dan mengelola OrderModal. Tidak mengubah tampilan server-rendered HTML.
        */}
        <ShopModalController products={shopProducts} />
      </main>
    </>
  );
}
