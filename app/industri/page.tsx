import Link from 'next/link';
import Image from 'next/image';
import { generateSeoMetadata } from '../../lib/seo';
import { industriList } from '../../lib/industri-data';

export const metadata = generateSeoMetadata({
  title: 'Solusi Aditif Solar untuk Industri | Nano Diesel B2B',
  description:
    'Nano Diesel hadir untuk setiap segmen industri diesel: pertambangan, perkebunan, transportasi, marine, genset, konstruksi, hingga agribisnis. Teruji LEMIGAS, kompatibel Biosolar B50 - B100.',
  path: '/industri',
});

const trustItems = [
  { icon: 'verified', text: 'Kompatibel dengan Biosolar B50 - B100' },
  { icon: 'science', text: 'Teruji oleh LEMIGAS — Kementerian ESDM' },
  { icon: 'shield_with_heart', text: 'Aman untuk mesin common rail & injeksi modern' },
  { icon: 'local_shipping', text: 'Tersedia program untuk armada skala besar' },
];

export default function IndustriPage() {
  return (
    <main className="pt-[72px] min-h-screen">

      {/* ─── Hero Section ─── */}
      <div className="-mt-[72px] relative bg-brand-dark px-6 lg:px-12 pt-36 md:pt-52 pb-20 md:pb-28 overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/industry/industri.webp"
            alt="Solusi Industri Diesel"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40 lg:to-transparent" />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Decorative gradient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-32 w-[600px] h-[600px] rounded-full opacity-10 z-10"
          style={{ background: 'radial-gradient(circle, #528247 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-10 z-10"
          style={{ background: 'radial-gradient(circle, #7D9D3A 0%, transparent 70%)' }}
        />

        <div className="max-w-[1200px] mx-auto w-full relative z-20">
          {/* Text & Trust Bar */}
          <div className="max-w-3xl space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-white leading-tight mb-6">
                Solusi Aditif Solar<br />
                <span className="text-emerald-400">untuk Industri</span>
              </h1>
              <p className="text-lg md:text-xl text-olive-200 leading-relaxed">
                Setiap industri punya tantangan operasional yang berbeda. Nano Diesel dirancang
                untuk bekerja di kondisi paling berat — dari tambang Kalimantan hingga kapal
                di tengah laut.
              </p>
            </div>

            <div>
              <a
                id="hero-cta-b2b"
                href="mailto:corporate@nanosix.net"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full transition-all text-base hover:shadow-lg hover:shadow-emerald-900/50 hover:-translate-y-0.5"
              >
                Konsultasi dengan Kami
                <span className="material-symbols-outlined text-[1em]">arrow_forward_ios</span>
              </a>
            </div>

            {/* ─── Trust Bar ─── */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2.5">
                {trustItems.map((item) => (
                  <div
                    key={item.text}
                    className="inline-flex items-center gap-2 bg-brand-dark/75 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-full"
                  >
                    <span className="material-symbols-outlined text-emerald-300" style={{ fontSize: '14px' }}>
                      {item.icon}
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ─── Industry Grid ─── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-headline font-black text-brand-dark leading-tight mb-4">
              Pilih Segmen Industri Anda
            </h2>
            <p className="text-base md:text-lg text-brand-copy max-w-2xl leading-relaxed">
              Temukan solusi spesifik yang dirancang untuk tantangan operasional industri Anda —
              dengan daftar kendaraan dan peralatan yang kompatibel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {industriList.map((industri) => (
              <Link
                key={industri.slug}
                href={`/industri/${industri.slug}`}
                id={`industri-card-${industri.slug}`}
                className="group relative flex flex-col bg-olive-50 hover:bg-white border border-olive-200 hover:border-emerald-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/10 hover:-translate-y-1"
              >
                {/* Icon area */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-600 transition-colors duration-300">
                    <span
                      className="material-symbols-outlined text-emerald-600 group-hover:text-white transition-colors duration-300"
                      style={{ fontSize: '24px' }}
                    >
                      {industri.icon}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-headline font-bold text-brand-dark mb-2 leading-tight">
                  {industri.name}
                </h3>
                <p className="text-xs text-olive-600 font-medium mb-4 leading-relaxed flex-1">
                  {industri.keyword}
                </p>

                <div className="flex items-center gap-1 text-emerald-600 group-hover:text-emerald-700 text-sm font-bold transition-colors">
                  Lihat Detail
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontSize: '16px' }}>
                    arrow_forward_ios
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer CTA ─── */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-olive-50 border-t border-olive-200">
        <div className="max-w-[800px] mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-headline font-black text-brand-dark leading-tight mb-4">
            Siap menghitung potensi penghematan<br className="hidden md:block" />
            untuk armada Anda?
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-2xl mx-auto leading-relaxed mb-10">
            Maksimalkan efisiensi biaya operasional armada Anda. Nano Diesel hadir untuk membantu bisnis anda dengan penggunaan aditif yang dipersonalisasi sesuai skala unit dan konsumsi solar perusahaan Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="footer-cta-hubungi"
              href="https://wa.me/622122483303?text=Halo%20Nano%20Diesel%2C%20saya%20ingin%20berkonsultasi%20mengenai%20solusi%20aditif%20solar%20untuk%20industri%20kami."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-brand-dark/20 hover:-translate-y-0.5 text-base w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-[1em]">chat</span>
              Hubungi Kami
            </a>
            <Link
              id="footer-cta-bukti-uji"
              href="/bukti-uji"
              className="inline-flex items-center gap-2 bg-white hover:bg-olive-50 text-brand-dark border border-olive-300 hover:border-emerald-400 font-bold py-4 px-8 rounded-full transition-all text-base w-full sm:w-auto justify-center"
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
