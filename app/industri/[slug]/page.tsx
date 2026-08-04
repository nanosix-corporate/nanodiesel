import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { generateSeoMetadata } from '../../../lib/seo';
import { getIndustriBySlug, getAllIndustriSlugs, industriList } from '../../../lib/industri-data';

const imageMap: Record<string, string> = {
  pertambangan: '/images/industry/tambang.webp',
  perkebunan: '/images/industry/perkebunan.webp',
  transportasi: '/images/industry/logistik.webp',
  kapal: '/images/industry/marine.webp',
  genset: '/images/industry/genset.webp',
  konstruksi: '/images/industry/konstruksi.webp',
  agribisnis: '/images/industry/agribisnis.webp',
  'solar-industri': '/images/industry/solar-industri.webp',
};

// ─── Static Params (SSG) ───────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllIndustriSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ──────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industri = getIndustriBySlug(slug);
  if (!industri) return {};
  const baseSeo = generateSeoMetadata({
    title: `${industri.name} — Solusi Aditif Solar | Nano Diesel`,
    description: industri.metaDescription || `${industri.subheadline} Nano Diesel — aditif solar teruji LEMIGAS untuk ${industri.name.toLowerCase()}.`,
    path: `/industri/${industri.slug}`,
  });
  return {
    ...baseSeo,
    keywords: industri.keywords,
  };
}


// ─── Page Component ────────────────────────────────────────────────────────
export default async function IndustriSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industri = getIndustriBySlug(slug);
  if (!industri) notFound();

  // Adjacent industries for bottom nav
  const currentIndex = industriList.findIndex((i) => i.slug === slug);
  const prevIndustri = currentIndex > 0 ? industriList[currentIndex - 1] : null;
  const nextIndustri = currentIndex < industriList.length - 1 ? industriList[currentIndex + 1] : null;

  return (
    <main className="pt-[72px] min-h-screen">

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <div className="-mt-[72px] relative bg-brand-dark px-6 lg:px-12 pt-36 md:pt-52 pb-20 md:pb-28 overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageMap[industri.slug] || '/images/industry/industri.webp'}
            alt={industri.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40 lg:to-transparent" />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Decorative orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-32 w-[500px] h-[500px] rounded-full opacity-10 z-10"
          style={{ background: 'radial-gradient(circle, #528247 0%, transparent 70%)' }}
        />

        <div className="max-w-[1200px] mx-auto w-full relative z-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-olive-400 text-sm mb-8 flex-wrap">
              <Link href="/" className="hover:text-emerald-300 transition-colors">Beranda</Link>
              <span aria-hidden="true" className="text-olive-600">›</span>
              <Link href="/industri" className="hover:text-emerald-300 transition-colors">Industri</Link>
              <span aria-hidden="true" className="text-olive-600">›</span>
              <span className="text-olive-200 font-semibold">{industri.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-black text-white leading-tight mb-5">
              {industri.headline}
            </h1>
            <p className="text-lg md:text-xl text-olive-200 leading-relaxed mb-10">
              {industri.subheadline}
            </p>

            <a
              id={`hero-cta-${industri.slug}`}
              href="mailto:corporate@nanosix.net"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full transition-all text-base hover:shadow-lg hover:shadow-emerald-900/50 hover:-translate-y-0.5"
            >
              {industri.cta}
              <span className="material-symbols-outlined text-[1em]">arrow_forward_ios</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Industry Navigation ─────────────────────────────────────── */}
      <nav
        aria-label="Navigasi industri lainnya"
        className="px-6 lg:px-12 py-6 bg-olive-100/50 border-y border-olive-200"
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          {prevIndustri ? (
            <Link
              href={`/industri/${prevIndustri.slug}`}
              className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-emerald-700 transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              <span className="hidden sm:inline">{prevIndustri.name}</span>
            </Link>
          ) : <div />}

          <Link
            href="/industri"
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
          >
            Semua Industri
          </Link>

          {nextIndustri ? (
            <Link
              href={`/industri/${nextIndustri.slug}`}
              className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-emerald-700 transition-colors"
            >
              <span className="hidden sm:inline">{nextIndustri.name}</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
          ) : <div />}
        </div>
      </nav>

      {/* ─── Body Copy ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          {/* Main copy */}
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-headline font-black text-brand-dark leading-tight mb-6">
              Mengapa {industri.name} Butuh Perlindungan Ekstra pada Bahan Bakar?
            </h2>
            <div className="space-y-5 text-brand-copy leading-relaxed text-base md:text-lg">
              {industri.bodyCopy.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Internal Links Sidebar */}
          <aside className="space-y-4">
            <h3 className="text-sm font-bold text-olive-600 uppercase tracking-widest">
              Pelajari Lebih Lanjut
            </h3>
            <div className="space-y-3">
              {[
                { href: '/bukti-uji', icon: 'verified', label: 'Bukti Uji LEMIGAS', desc: 'Validasi klaim dengan data resmi' },
                { href: '/teknologi-kami', icon: 'science', label: 'Teknologi Kami', desc: 'Bio Nano Aditif + Oxygenated Technology' },
                { href: '/produk', icon: 'shopping_cart', label: 'Produk & Pemesanan', desc: 'Varian produk & harga' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-olive-50 hover:bg-emerald-50 border border-olive-200 hover:border-emerald-300 transition-all group"
                >
                  <span
                    className="material-symbols-outlined text-emerald-600 mt-0.5 flex-shrink-0"
                    style={{ fontSize: '20px' }}
                  >
                    {link.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-brand-dark group-hover:text-emerald-700 transition-colors">
                      {link.label}
                    </p>
                    <p className="text-xs text-olive-600 mt-0.5">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Pain Points ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-olive-50 border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-headline font-black text-brand-dark leading-tight mb-3">
            Tantangan Nyata di Lapangan
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-xl mb-12 leading-relaxed">
            Pain points yang sering dihadapi operator {industri.name.toLowerCase()} — dan bagaimana
            Nano Diesel menjawabnya.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industri.painPoints.map((point, idx) => {
              const [before, after] = point.split(' → ');
              return (
                <div
                  key={idx}
                  className="bg-white border-l-4 border-emerald-500 rounded-r-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-emerald-600 flex-shrink-0 mt-0.5"
                      style={{ fontSize: '20px' }}
                    >
                      warning
                    </span>
                    <div>
                      <p className="text-sm font-black text-brand-dark mb-1">{before}</p>
                      {after && (
                        <p className="text-sm text-brand-copy leading-relaxed">{after}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Equipment Compatibility ──────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-headline font-black text-brand-dark leading-tight mb-3">
            Kompatibel dengan Armada Anda
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-xl mb-12 leading-relaxed">
            Nano Diesel telah teruji pada berbagai jenis kendaraan dan peralatan diesel di segmen {industri.name.toLowerCase()}.
          </p>

          <div className="space-y-10">
            {Object.entries(industri.equipmentCategories).map(([categoryName, items]) => (
              <div key={categoryName}>
                <h3 className="text-base font-bold text-olive-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="inline-block w-6 h-0.5 bg-emerald-500" aria-hidden="true" />
                  {categoryName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Footer ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-brand-dark border-t border-olive-800/50">
        <div className="max-w-[800px] mx-auto text-center">

          <h2 className="text-2xl md:text-3xl font-headline font-black text-white leading-tight mb-4">
            {industri.cta}
          </h2>
          <p className="text-base md:text-lg text-olive-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Maksimalkan efisiensi biaya operasional armada Anda. Nano Diesel hadir untuk membantu bisnis anda dengan penggunaan aditif yang dipersonalisasi sesuai skala unit dan konsumsi solar perusahaan Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id={`cta-bottom-${industri.slug}`}
              href={`https://wa.me/622122483303?text=Halo%20Nano%20Diesel%2C%20saya%20ingin%20berkonsultasi%20mengenai%20solusi%20aditif%20solar%20untuk%20industri%20${encodeURIComponent(industri.name)}.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-emerald-900/50 hover:-translate-y-0.5 text-base w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-[1em]">chat</span>
              Hubungi Tim Kami
            </a>
            <Link
              id={`cta-buktiuji-${industri.slug}`}
              href="/bukti-uji"
              className="inline-flex items-center gap-2 border border-olive-600 hover:border-emerald-400 text-olive-300 hover:text-white font-bold py-4 px-8 rounded-full transition-all text-base w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-[1em]">verified</span>
              Lihat Bukti Uji
            </Link>
          </div>
        </div>
      </section>


    </main>
  );
}
