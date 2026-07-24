'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { OrderModal } from '../components/OrderModal';

const products = [
  {
    id: 'Nano Diesel 1 Botol (70ml)',
    title: '1 Botol',
    subtitle: 'Nano Diesel (70 ml)',
    label: 'Cocok Untuk Satu Isi Tangki',
    price: 'Rp 70.000',
    description: 'Cocok untuk satu kali pengisian penuh. Coba rasakan perbedaannya di tangki kendaraan Anda.',
    image: '/images/product/product-image-1.webp',
    badge: null,
    badgeColor: '',
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Hemat-BBM-Boost-Performa-Mesin-Diesel-70-ml-1-botol-Aditif-Solar-Premium-i.1822722168.47810303561',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/hemat-bbm-aditif-solar-diesel-nanodiesel-70ml-performa-mesin-diesel-lebih-maksimal-1-botol-1735927704744003386',
    wa: 'Nano Diesel 1 Botol (70ml)',
  },
  {
    id: 'Nano Diesel 2 Botol (2x70ml)',
    title: '2 Botol',
    subtitle: 'Nano Diesel (2 × 70 ml)',
    label: 'Pilihan Paling Populer',
    price: 'Rp 135.000',
    description: 'Pilihan paling populer. Cukup untuk dua kali pengisian dan merasakan manfaat penuh Nano Diesel.',
    image: '/images/product/product-image-2.webp',
    badge: 'Best Seller',
    badgeColor: 'bg-emerald-500',
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Value-Pack-2-botol-Hemat-Bahan-Bakar-Aditif-Solar-Premium-i.1822722168.46911170264',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/paket-hemat-nanodiesel-70ml-2-botol-aditif-solar-diesel-hemat-bahan-bakar-1735928198678349626',
    wa: 'Nano Diesel 2 Botol (2x70ml)',
  },
  {
    id: 'Nano Diesel 6 Botol (6x70ml)',
    title: '5 Botol Gratis 1 Botol',
    subtitle: 'Nano Diesel (6 × 70 ml)',
    label: 'Paket Ekonomis Armada',
    price: 'Rp 350.000',
    description: 'Paket ekonomis untuk pemakaian rutin. Ideal untuk armada kecil atau stok bulanan kendaraan diesel Anda.',
    image: '/images/product/product-image-3.webp',
    badge: 'Hemat',
    badgeColor: 'bg-amber-500',
    dark: false,
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Hemat-Operasional-Diesel-PAKET-5-Botol-1-70-ml-Adtif-Solar-Premium-i.1822722168.55661503493',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/fleet-pack-beli-5-gratis-1-nanodiesel-70ml-untuk-mobil-diesel-truk-kendaraan-diesel-lain-1735928297609987898',
    wa: 'Nano Diesel 6 Botol (6x70ml)',
  },
  {
    id: 'Bulk Industri',
    title: 'Skala Industri',
    subtitle: 'Drum Industri (Bulk)',
    label: 'Khusus B2B & Armada Besar',
    price: 'B2B Spesial',
    description: 'Drum industri (Bulk) khusus untuk perusahaan pertambangan, pabrik, perkapalan, & alat berat.',
    image: '/images/product/product-image-4.webp',
    badge: 'B2B',
    badgeColor: 'border border-emerald-500/30 text-emerald-400 bg-transparent',
    dark: true,
    shopee: null,
    tokopedia: null,
    wa: 'Skala Industri',
  },
];

const benefits = [
  {
    icon: 'shield_with_heart',
    title: 'Bersihkan Injektor & Ruang Bakar',
    description: 'Membantu membersihkan kerak kotoran dan deposit karbon pada injektor akibat sisa pembakaran. Injektor yang bersih membuat mesin lebih awet dan tarikan tetap stabil.',
  },
  {
    icon: 'bolt',
    title: 'Cetane Booster Bertenaga',
    description: 'Meningkatkan cetane number solar secara efektif untuk pembakaran yang lebih sempurna. Rasakan tarikan yang lebih ringan, dan responsif di berbagai kondisi jalan.',
  },
  {
    icon: 'eco',
    title: 'Emisi Lebih Rendah',
    description: 'Menurunkan kadar asap hitam dan emisi gas buang mesin diesel secara signifikan — ramah lingkungan dan lulus uji emisi.',
  },
  {
    icon: 'account_balance_wallet',
    title: 'Hemat BBM Diesel Terukur',
    description: 'Efisiensi konsumsi bahan bakar diesel meningkat signifikan — terbukti pada uji jalan raya hingga 17,5 km/L.',
  },
];

const dosageRows = [
  { vehicle: 'Mobil Keluarga & SUV', examples: 'Innova, Fortuner, Pajero Sport, Palisade', capacity: '55 – 80 Liter', dose: '55 – 80 ml' },
  { vehicle: 'Pickup & Truk Engkel (Niaga)', examples: 'Targa, L300, Elf Engkel', capacity: '50 – 75 Liter', dose: '50 – 75 ml' },
  { vehicle: 'Truk Medium & Canter (CDE/CDD)', examples: 'Fuso Canter, Hino Dutro', capacity: '100 – 200 Liter', dose: '100 – 200 ml' },
  { vehicle: 'Truk Besar & Bus AKAP', examples: 'Fuso Fighter, Hino500, Bus Mercedes-Benz', capacity: '200 – 400 Liter', dose: '200 – 400 ml' },
];

function useCounterAnimation(target: number, isDecimal = false, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const duration = 2000;
    const startTime = performance.now();
    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = eased * target;
      setCount(isDecimal ? parseFloat(value.toFixed(1)) : Math.floor(value));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(target);
    };
    requestAnimationFrame(update);
  }, [shouldStart, target, isDecimal]);
  return count;
}

export default function HomeContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [perfVisible, setPerfVisible] = useState(false);
  const perfRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPerfVisible(true); },
      { threshold: 0.2 }
    );
    if (perfRef.current) obs.observe(perfRef.current);
    return () => obs.disconnect();
  }, []);

  const hp = useCounterAnimation(30, false, perfVisible);
  const hpLow = useCounterAnimation(20, false, perfVisible);
  const kmpl = useCounterAnimation(17.5, true, perfVisible);
  const km = useCounterAnimation(1168, false, perfVisible);

  return (
    <main className="pt-[72px] bg-brand-darkest">

      {/* ── Hero (Full-Width Video Background) ── */}
      <section className="relative -mt-[72px] overflow-hidden bg-brand-darkest px-6 lg:px-12 text-white pt-[72px]">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline preload="auto" poster="/images/og-image.webp" className="h-full w-full object-cover opacity-80">
            <source src="/video/hero-n6.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        </div>

        {/* Marquee Ticker Strip */}
        <div className="relative -mx-6 lg:-mx-12 pb-4 md:pb-5 z-20">
          <div className="overflow-hidden border border-brand-primary bg-brand-primary py-2 z-20">
            <div className="animate-marquee min-w-max flex items-center whitespace-nowrap text-sm md:text-base text-[#F5F9FA] will-change-transform">
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">verified</span>
                Tersertifikasi Lemigas dan Mutuagung Lestari
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">speed</span>
                Teruji Dyno
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">water_drop</span>
                Meningkatkan Kualitas BBM
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">local_gas_station</span>
                Efisiensi Konsumsi BBM Terukur
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">oil_barrel</span>
                Cocok Untuk Biodiesel B30–B100
              </span>
              {/* Duplicate for seamless loop */}
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">verified</span>
                Tersertifikasi Lemigas dan Mutuagung Lestari
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">speed</span>
                Teruji Dyno
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">water_drop</span>
                Meningkatkan Kualitas BBM
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">local_gas_station</span>
                Efisiensi Konsumsi BBM Terukur
              </span>
              <span className="inline-flex items-center gap-2 px-8">
                <span className="material-symbols-outlined text-base md:text-lg text-[#F5F9FA]">oil_barrel</span>
                Cocok Untuk Biodiesel B30–B100
              </span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-[1200px] pt-24 md:pt-36 pb-24">
          <div className="text-center">
            <h1 className="mx-auto max-w-4xl text-fs-xl font-headline font-normal tracking-tight text-white md:text-fs-xxl leading-[1.1]">
              Aditif Solar Diesel Premium
              <br />
              <span className="font-extrabold">Performa Maksimal, Konsumsi Optimal</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-fs-base leading-relaxed text-slate-200 md:text-fs-md">
              Nano Diesel adalah aditif diesel premium dengan formulasi Bio Nano Aditif dan <strong>Oxygenated Technology</strong> yang dirancang untuk mengoptimalkan molekul pembakaran. Menjaga mesin tetap awet dan menghasilkan tenaga ekstra. Solusi andal untuk pemakaian harian mobil keluarga maupun armada niaga, sangat cocok untuk <strong>Biodiesel B30 hingga B50</strong>.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-7 py-3.5 text-fs-base font-bold text-white transition hover:bg-brand-accent"
              >
                <span className="material-symbols-outlined text-fs-base">shopping_cart</span>
                Beli Sekarang
              </a>
              <a
                href="#technology"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/40 px-7 py-3.5 text-fs-base font-bold text-white transition hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-fs-base">biotech</span>
                Pelajari Teknologi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-16 md:py-24 px-6 lg:px-12 bg-olive-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <h2 className="text-fs-lg md:text-fs-xl font-headline font-black text-brand-dark">Pilih Sesuai Kebutuhan Anda</h2>
            <a href="/produk" className="text-fs-base md:text-fs-md font-bold text-brand-dark hover:text-emerald-600 no-underline hover:underline underline-offset-4 decoration-2 decoration-emerald-600 transition-all whitespace-nowrap inline-flex items-center gap-1">
              Lihat Semua Produk
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className={`rounded-2xl overflow-hidden transition-all duration-300 flex flex-col relative ${product.dark
                  ? 'bg-brand-dark shadow-lg shadow-black/20'
                  : 'bg-white border border-olive-200 shadow-sm hover:shadow-xl hover:border-emerald-200'
                  }`}
              >
                {product.badge && (
                  <div className={`absolute top-3 right-3 text-white text-fs-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-lg ${product.badge === 'Best Seller' ? 'bg-emerald-600' :
                    product.badge === 'B2B' ? 'bg-brand-dark border border-emerald-500/40 text-emerald-400' :
                      'bg-amber-500'
                    }`}>
                    {product.badge}
                  </div>
                )}
                <div className={`aspect-[4/3] relative overflow-hidden ${product.dark ? 'bg-brand-darkest' : 'bg-olive-100'}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
                </div>
                <div className="p-5 md:p-6 flex-grow flex flex-col gap-2">
                  <h3 className={`text-fs-base md:text-fs-md font-bold font-headline leading-tight line-clamp-2 ${product.dark ? 'text-white' : 'text-brand-dark'}`}>
                    {product.title}
                  </h3>
                  <span className={`text-fs-sm font-medium ${product.dark ? 'text-olive-400/70' : 'text-olive-400'}`}>
                    {product.subtitle}
                  </span>
                  <p className={`text-fs-sm leading-relaxed line-clamp-1 ${product.dark ? 'text-olive-400' : 'text-brand-copy/80'}`}>
                    {product.description}
                  </p>
                  {!product.dark && (
                    <a
                      href={`/produk/${product.id.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}?from=home`}
                      className="inline-flex items-center gap-1 text-fs-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-2 transition-all my-2"
                    >
                      Lihat deskripsi produk
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform group-hover:translate-x-0.5">
                        <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                  <div className="mt-auto">
                    {product.dark ? (
                      <>
                        <div className="text-fs-md md:text-fs-lg font-black mb-3 text-brand-white">
                          {product.price}
                        </div>
                        <a
                          href={`https://wa.me/622122483303?text=Halo%20Nano%20Diesel%2C%20saya%20ingin%20bertanya%20mengenai%20produk%20${encodeURIComponent(product.wa)}`}
                          target="_blank" rel="noreferrer"
                          className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg                           text-xs md:text-sm text-center transition-all hover:shadow-lg hover:shadow-emerald-600/20 block"
                        >
                          Hubungi via WhatsApp
                        </a>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="text-sm md:text-base font-black text-brand-dark whitespace-nowrap">
                          {product.price}
                        </div>
                        <button
                          type="button"
                          onClick={() => { setSelectedProduct(product); setModalOpen(true); }}
                          className="w-full py-2 px-3 bg-brand-dark hover:bg-emerald-600 text-white font-bold rounded-lg                           text-xs md:text-sm transition-all"
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
        </div>
      </section>

      {/* ── Key Benefits ── */}
      <section id="benefits" className="py-16 md:py-24 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-black text-brand-dark">
              Mengapa Memilih Nano Diesel sebagai Aditif Solar Anda?
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-5 md:p-8 rounded-2xl bg-olive-50 border border-olive-100 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl md:text-3xl text-emerald-600">{benefit.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-brand-dark mb-2 md:mb-3">{benefit.title}</h3>
                <p className="text-brand-copy leading-relaxed text-[12px] md:text-[15px]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology ── */}
      <section id="technology" className="py-16 md:py-24 px-6 lg:px-12 border-t border-olive-200 bg-olive-50">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-headline font-black text-brand-dark leading-tight mb-6">
            Presisi Ilmiah dalam Setiap Tetes
          </h2>
          <p className="text-brand-copy leading-relaxed mb-8">
            Nano Diesel hadir sebagai solusi yang dirancang dengan presisi ilmiah. Kita memahami bahwa bahan bakar masa kini—dengan segala sifat alaminya—sering kali menghambat potensi mesin Anda. Melalui <strong className="text-brand-dark">Oxygenated Technology</strong>, kami memperbaiki apa yang tidak bisa dilakukan mesin secara alami: mengubah tetesan bahan bakar yang berat menjadi kabut halus yang sempurna.
          </p>
          <a
            href="/teknologi-kami"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full transition-all text-lg hover:shadow-lg hover:shadow-brand-dark/20"
          >
            <span className="material-symbols-outlined text-base">biotech</span>
            Lihat Teknologi Kami
          </a>
        </div>
      </section>

      {/* ── Performance / Results ── */}
      <section ref={perfRef} id="performance" className="py-16 md:py-24 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-black text-brand-dark">
              Hasil Uji Nyata Nano Diesel: Performa Aditif Solar Diesel di Jalan Raya
            </h2>
            <p className="text-brand-copy mt-4 max-w-2xl">
              Biaya bahan bakar menyerap hingga <strong className="text-brand-dark">40% dari total OPEX</strong> operasional kendaraan berat. Sedikit saja inefisiensi akan langsung menggerus margin keuntungan perusahaan. Nano Diesel hadir memutus rantai kerusakan ini dari akarnya.
            </p>
          </div>

          <div className="flex flex-col border-t border-olive-200 divide-y divide-olive-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 gap-6 md:gap-8 px-6 -mx-6">
              <div className="md:w-5/12">
                <div className="text-5xl md:text-6xl font-headline font-black tracking-tighter mb-2 text-emerald-600">
                  +{hpLow}–{hp}
                  <span className="text-2xl md:text-3xl font-medium tracking-normal text-olive-400"> HP</span>
                </div>
                <h4 className="font-bold text-brand-dark">Peningkatan Tenaga</h4>
              </div>
              <div className="md:w-7/12 text-brand-copy leading-relaxed md:border-l border-olive-200 md:pl-10">
                Diuji dan diverifikasi oleh Elika Automotive Performance. Uji Dyno ketat pada kendaraan seperti <strong className="text-brand-dark">Pajero Sport Dakar</strong> membuktikan lonjakan tenaga (Horsepower) yang signifikan — hasil langsung dari atomisasi bahan bakar yang sempurna dan pembakaran yang jauh lebih efisien.
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 gap-6 md:gap-8 px-6 -mx-6">
              <div className="md:w-5/12">
                <div className="text-5xl md:text-6xl font-headline font-black tracking-tighter mb-2 text-emerald-600">
                  {kmpl}
                  <span className="text-2xl md:text-3xl font-medium tracking-normal text-olive-400"> km/L</span>
                </div>
                <h4 className="font-bold text-brand-dark">Efisiensi BBM Terukur</h4>
              </div>
              <div className="md:w-7/12 text-brand-copy leading-relaxed md:border-l border-olive-200 md:pl-10">
                Pada uji jalan raya dengan <strong className="text-brand-dark">Biodiesel B35</strong>, kendaraan konsisten mencetak efisiensi yang menakjubkan. Pembakaran sempurna berarti setiap persen bahan bakar benar-benar menjadi energi kinetik — bukan asap hitam yang terbuang percuma dari knalpot.
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 gap-6 md:gap-8 px-6 -mx-6">
              <div className="md:w-5/12">
                <div className="text-5xl md:text-6xl font-headline font-black tracking-tighter mb-2 text-emerald-600">
                  {km.toLocaleString('en-US')}
                  <span className="text-2xl md:text-3xl font-medium tracking-normal text-olive-400"> km</span>
                </div>
                <h4 className="font-bold text-brand-dark">Durabilitas Mesin Terjaga</h4>
              </div>
              <div className="md:w-7/12 text-brand-copy leading-relaxed md:border-l border-olive-200 md:pl-10">
                Uji durabilitas rute <strong className="text-brand-dark">Bali – Jakarta</strong> mencatat konsumsi stabil 15.04 km/L dengan <strong className="text-brand-dark">B50</strong>. Injektor terlindung dari korosi, filter tidak tersumbat, dan piston terjaga dari gesekan ekstrem — menekan <em>downtime</em> operasional dan memperpanjang usia aset kendaraan.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dosage Table ── */}
      <section id="dosis" className="py-16 md:py-24 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-black text-brand-dark">
              Tabel Dosis Pemakaian
              <br />
              (1 ml Nano Diesel per 1L Bahan Bakar)
            </h2>
            <p className="text-brand-copy mt-4 max-w-2xl mx-auto">
              Ikuti panduan takaran berikut untuk mendapatkan hasil performa dan efisiensi mesin yang paling optimal pada kendaraan Anda.
            </p>
          </div>

          <div className="md:hidden flex items-center justify-center gap-2 mb-4 text-olive-400">
            <span className="material-symbols-outlined text-sm">swipe_left</span>
            <span className="text-xs uppercase tracking-widest font-bold">Geser untuk melihat tabel</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-olive-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-brand-dark text-white font-headline text-sm md:text-base">
                    <th className="py-4 md:py-5 px-4 md:px-6 font-bold w-[45%]">Jenis Kendaraan</th>
                    <th className="py-4 md:py-5 px-4 md:px-6 font-bold w-[27%]">Kapasitas Tangki</th>
                    <th className="py-4 md:py-5 px-4 md:px-6 font-bold w-[28%]">Dosis Nano Diesel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-olive-200 text-brand-copy text-sm md:text-base">
                  {dosageRows.map((row, i) => (
                    <tr key={i} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-4 md:px-6">
                        <div className="font-bold text-brand-dark text-sm md:text-base">{i + 1}. {row.vehicle}</div>
                        <div className="text-xs md:text-sm text-brand-copy opacity-75 mt-0.5">{row.examples}</div>
                      </td>
                      <td className="py-4 px-4 md:px-6 font-semibold">{row.capacity}</td>
                      <td className="py-4 px-4 md:px-6 text-emerald-700 font-bold">{row.dose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-brand-dark relative overflow-hidden">
        <div className="max-w-[px] mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-5xl font-headline font-black text-white mb-6">
            Tingkatkan Performa Mesin Anda Sekarang
          </h2>
          <p className="text-base md:text-lg text-olive-300 mb-8 md:mb-10 leading-relaxed">
            Bergabunglah dengan pengguna mesin diesel cerdas lainnya yang sudah merasakan peningkatan performa dari kendaraannya.
            <br /> Cukup dengan <strong className="text-white">Nano Diesel</strong> untuk mesin yang lebih bertenaga. Tersedia di Shopee dan Tokopedia Official Store.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
            <a
              href="https://shopee.co.id/nanodiesel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 justify-center bg-white hover:bg-olive-100 text-brand-dark font-bold py-3 md:py-4 px-5 md:px-8 rounded-2xl text-sm md:text-base w-full sm:w-auto transition-all"
            >
              <Image src="/images/icon/shopee_icon.svg" alt="Shopee" width={20} height={20} className="object-contain flex-shrink-0" />
              Beli di Shopee
            </a>
            <a
              href="https://www.tokopedia.com/nanodiesel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 justify-center bg-white hover:bg-olive-100 text-brand-dark font-bold py-3 md:py-4 px-5 md:px-8 rounded-2xl text-sm md:text-base w-full sm:w-auto transition-all"
            >
              <Image src="/images/icon/tokopedia_icon.svg" alt="Tokopedia" width={20} height={20} className="object-contain flex-shrink-0" />
              Beli di Tokopedia
            </a>
            <a
              href="https://wa.me/+622122483303?text=Halo%20Nano%20Diesel%2C%20saya%20ingin%20memesan%20Nano%20Diesel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 justify-center bg-brand-primary hover:bg-brand-accent text-white font-bold py-3 md:py-4 px-5 md:px-8 rounded-2xl text-sm md:text-base w-full sm:w-auto transition-all"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Hubungi via WhatsApp
            </a>
          </div>
          <p className="mt-8 text-xs text-olive-500">
            Untuk pembelian bulk & B2B, hubungi langsung melalui WhatsApp atau email{' '}
            <a href="mailto:corporate@nanosix.net" className="text-olive-300 hover:text-white transition-colors">corporate@nanosix.net</a>
          </p>
        </div>
      </section>

      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} product={selectedProduct} />
    </main>
  );
}
