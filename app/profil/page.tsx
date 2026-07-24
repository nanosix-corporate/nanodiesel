import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tentang Kami | Nano Diesel Indonesia',
  description: 'Mengenal Nano Diesel — produsen aditif bahan bakar solar berbasis teknologi nano untuk industri dan kendaraan diesel Indonesia.',
  alternates: { canonical: 'https://www.nanodiesel.id/profil' },
  openGraph: {
    title: 'Profil Perusahaan Nano Diesel',
    description: 'Cerita dan visi Nano Diesel — lahir dari kebutuhan nyata: membawa teknologi diesel yang lebih bersih, efisien, dan tangguh ke jalanan Indonesia.',
    siteName: 'Nano Diesel',
  },
};

export default function OurStoryPage() {
  const pillars = [
    {
      title: 'Teknologi Oxygenated',
      desc: 'Formula Bio Nano Aditif dengan Oxygenated Technology yang memperbaiki kualitas atomisasi bahan bakar diesel, membuat pembakaran lebih sempurna dan efisien.'
    },
    {
      title: 'Melindungi Mesin Diesel',
      desc: 'Membersihkan injektor dan ruang bakar dari kerak karbon akibat Biodiesel, memperpanjang usia mesin dan menekan biaya perawatan kendaraan.'
    },
    {
      title: 'Teruji & Tersertifikasi',
      desc: 'Telah teruji melalui Dyno Test dan tersertifikasi resmi oleh Lemigas, memastikan kualitas dan keamanan produk untuk kendaraan diesel Anda.'
    },
    {
      title: 'Solusi untuk Semua',
      desc: 'Cocok untuk kendaraan pribadi hingga armada industri berat — dari mesin diesel modern hingga konvensional, cukup satu botol setiap pengisian.'
    }
  ];

  const goals = [
    'Menghadirkan aditif diesel berkualitas premium yang terjangkau untuk semua pengguna',
    'Membantu pengemudi dan pemilik armada menghemat biaya operasional secara nyata',
    'Menjaga kesehatan mesin diesel Indonesia di tengah transisi ke Biodiesel',
    'Terus berinovasi mengembangkan formula yang lebih ramah lingkungan',
    'Menjadi merek aditif diesel terpercaya dari Indonesia untuk Indonesia'
  ];

  return (
    <main className="pt-[72px] min-h-screen">
      {/* Hero Section */}
      <div className="-mt-[72px] bg-brand-white px-6 lg:px-12 pt-32 md:pt-44 pb-24 md:pb-36 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-brand-dark leading-tight mb-6 max-w-4xl">
            Cerita Kami
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-brand-copy mb-6 max-w-3xl leading-snug">
            Nano Diesel lahir dari kebutuhan nyata: membawa solusi aditif diesel premium yang lebih bersih, lebih efisien, dan bertenaga — untuk pengguna yang peduli dengan performa dan umur panjang kendaraannya.
          </p>
          <p className="text-base md:text-lg text-olive-700 max-w-[800px] leading-relaxed">
            Ketika pemerintah mulai mewajibkan Biodiesel B30, B35, dan B50, para pengemudi merasakan dampaknya:
            mesin lebih berat, konsumsi solar meningkat, dan injektor cepat kotor. Dari sanalah Nano Diesel
            hadir, dengan formula Bio Nano Aditif dengan Oxygenated Technology yang memperbaiki kualitas atomisasi
            bahan bakar secara fundamental.
          </p>
        </div>
      </div>

      {/* What We Do / Pilar Fokus */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-headline font-black text-brand-dark leading-tight mb-4">
            Mengapa Nano Diesel?
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-2xl mb-14 leading-relaxed">
            <strong>Bukan sekadar aditif biasa.</strong> Setiap tetes Nano Diesel dirancang untuk menjawab tantangan
            nyata yang dihadapi pengguna diesel di Indonesia.
          </p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {pillars.map((item) => (
              <div key={item.title}>
                <h4 className="text-xl md:text-2xl font-headline font-bold text-brand-dark mb-3">
                  {item.title}
                </h4>
                <p className="text-base text-brand-copy leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Goals */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-olive-50 border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-headline font-black text-brand-dark leading-tight mb-4">
            Komitmen Kami
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-2xl mb-14 leading-relaxed">
            Kami percaya bahwa solusi terbaik lahir dari pemahaman mendalam terhadap masalah —
            dan itulah yang mendorong setiap langkah Nano Diesel sejak hari pertama.
          </p>
          <div className="space-y-6">
            {goals.map((goal, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-1 self-stretch bg-emerald-600 rounded-full" />
                <p className="text-lg md:text-xl font-bold text-brand-dark leading-relaxed">
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-headline font-black text-brand-dark mb-6">
            Siap Mencoba Nano Diesel?
          </h2>
          <p className="text-base md:text-lg text-brand-copy mb-10 max-w-xl mx-auto leading-relaxed">
            Dapatkan Nano Diesel sekarang dan rasakan perbedaan performa mesin diesel Anda
            setelah satu kali pengisian.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://shopee.co.id/nanodiesel"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white border-2 border-brand-dark text-brand-dark font-bold py-3.5 px-7 rounded-xl text-sm transition-all hover:shadow-lg hover:bg-olive-100"
            >
              <Image src="/images/icon/shopee_icon.svg" alt="Shopee" width={20} height={20} className="object-contain" />
              Shopee Official Store
            </a>
            <a
              href="https://www.tokopedia.com/nanodiesel"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white border-2 border-brand-dark text-brand-dark font-bold py-3.5 px-7 rounded-xl text-sm transition-all hover:shadow-lg hover:bg-olive-100"
            >
              <Image src="/images/icon/tokopedia_icon.svg" alt="Tokopedia" width={20} height={20} className="object-contain" />
              Tokopedia Official Store
            </a>
            <a
              href="https://wa.me/622122483303"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-brand-dark border-2 border-transparent hover:bg-brand-darkest text-white font-bold text-sm py-3.5 px-7 rounded-xl transition-all duration-300 hover:opacity-90"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
