import TestResultsChart from '../../components/TestResultsChart';

export default function OurTechnologyPage() {
  const features = [
    {
      icon: 'shield_with_heart',
      title: 'Bersihkan Injektor & Ruang Bakar',
      desc: 'Membersihkan injektor diesel dan ruang bakar dari deposit karbon sisa pembakaran Biodiesel secara menyeluruh.'
    },
    {
      icon: 'bolt',
      title: 'Cetane Booster Bertenaga',
      desc: 'Meningkatkan cetane number solar secara efektif untuk pembakaran yang lebih sempurna dan tarikan mesin lebih responsif.'
    },
    {
      icon: 'eco',
      title: 'Emisi Lebih Rendah',
      desc: 'Menurunkan kadar asap hitam dan emisi gas buang mesin diesel secara signifikan — ramah lingkungan dan lulus uji emisi.'
    },
    {
      icon: 'account_balance_wallet',
      title: 'Hemat BBM Diesel Terukur',
      desc: 'Efisiensi konsumsi bahan bakar diesel meningkat signifikan — terbukti pada uji jalan raya hingga 17,5 km/L.'
    }
  ];

  return (
    <main className="pt-[72px] min-h-screen">
      {/* Hero Section */}
      <div className="-mt-[72px] bg-brand-white px-6 lg:px-12 pt-32 md:pt-44 pb-24 md:pb-36 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-brand-dark leading-tight mb-6 max-w-4xl">
            Teknologi Kami
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-brand-copy mb-6 max-w-3xl leading-snug">
            Bio Nano Aditif dengan Oxygenated Technology — dirancang khusus untuk mendukung pembakaran yang lebih bersih, efisien, dan optimal pada Mesin Diesel.
          </p>
          <p className="text-base md:text-lg text-olive-700 max-w-[800px] leading-relaxed">
            Ketika biodiesel (B30, B35, B50) mulai diwajibkan, pengemudi diesel menghadapi tantangan baru:
            pembakaran tidak sempurna, injektor kotor, dan konsumsi bahan bakar membengkak. Nano Diesel hadir
            sebagai solusi — formula Bio Nano Aditif dengan Oxygenated Technology yang memperbaiki kualitas
            atomisasi bahan bakar secara fundamental.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-headline font-black text-brand-dark leading-tight mb-4">
            Atomisasi Sempurna, Pembakaran Bersih
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-2xl mb-14 leading-relaxed">
            <strong>Bukan sekadar aditif biasa.</strong> Nano Diesel mengubah cara bahan bakar diesel berinteraksi
            dengan ruang bakar — dari tetesan besar yang tidak efisien menjadi kabut halus yang terbakar sempurna.
          </p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl blur-sm" />
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[400px]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/video/technology.webm" type="video/webm" />
                </video>
              </div>
            </div>
            <div className="space-y-5 text-brand-copy leading-relaxed">
              <p>
                Nano Diesel adalah <strong className="text-brand-dark">Bio Nano Aditif dengan Oxygenated Technology</strong> yang dirancang khusus untuk mendukung pembakaran yang lebih bersih, efisien, dan optimal pada <strong className="text-brand-dark">Mesin Diesel</strong>.
              </p>
              <p>
                Biodiesel secara alami memiliki molekul asam lemak tak jenuh yang tidak stabil — bersifat higroskopis (menyerap air) dan mudah terdekomposisi. Akibatnya, bahan bakar menjadi jauh lebih kental sehingga ketika dipompa, bahan bakar <strong className="text-brand-dark">gagal teratomisasi</strong> di dalam injektor: menghasilkan tetesan besar & lambat, bukan kabut halus yang ideal. Residu karbon padat pun menumpuk dan merusak ruang bakar.
              </p>
              <p>
                Formula Nano Diesel mengubah atomisasi buruk ini menjadi <strong className="text-brand-dark">kabut halus & cepat</strong> — memastikan setiap tetes bahan bakar terbakar habis, sempurna, dan bersih. Hasilnya: tenaga mesin meningkat, konsumsi <strong className="text-brand-dark">BBM lebih hemat</strong>, dan emisi gas buang turun secara signifikan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-olive-50 border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-headline font-black text-brand-dark leading-tight mb-4">
            Apa yang Dilakukan Nano Diesel?
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-2xl mb-14 leading-relaxed">
            Empat manfaat utama yang membuat Nano Diesel berbeda dari aditif biasa — dirancang untuk menjawab
            tantangan nyata pengguna diesel di Indonesia.
          </p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {features.map((item) => (
              <div key={item.title}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-2xl text-emerald-600">{item.icon}</span>
                  <h4 className="text-xl md:text-2xl font-headline font-bold text-brand-dark">
                    {item.title}
                  </h4>
                </div>
                <p className="text-base text-brand-copy leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Results */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-white border-t border-olive-200">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-headline font-black text-brand-dark leading-tight mb-4">
            Ringkasan Hasil Uji Nano Diesel
          </h2>
          <p className="text-base md:text-lg text-brand-copy max-w-2xl mb-14 leading-relaxed">
            Nano Diesel telah diuji oleh lembaga riset independen. Pilih kategori untuk melihat perbandingan hasil sebelum dan sesudah penggunaan Nano Diesel.
          </p>
          <TestResultsChart />
          <div className="mt-12 text-center">
            <a
              href="/bukti-uji"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-full transition-all text-lg hover:shadow-lg hover:shadow-brand-dark/20"
            >
              Lihat Bukti Uji Selengkapnya <span className="material-symbols-outlined text-[0.9em] font-bold">arrow_forward_ios</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
