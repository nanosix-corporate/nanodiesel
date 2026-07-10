import { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nanodiesel.id';

export const metadata: Metadata = {
  title: 'Cara Pakai Nano Diesel',
  description: 'Cara pakai Nano Diesel: takaran 1mL per 1L bahan bakar, tanpa bongkar mesin. Panduan lengkap untuk semua jenis diesel B30-B100.',
  openGraph: {
    title: 'Cara Pakai Nano Diesel',
    description: 'Cara pakai Nano Diesel: takaran 1mL per 1L bahan bakar, tanpa bongkar mesin. Panduan lengkap untuk semua jenis diesel B30-B100.',
    siteName: 'Nano Diesel',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cara Pakai Nano Diesel',
  description: 'Panduan lengkap cara menggunakan aditif Nano Diesel pada tangki bahan bakar kendaraan.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Tentukan takaran',
      text: '1 mL Nano Diesel untuk setiap 1 liter bahan bakar. Contoh: tangki diisi 40 liter solar → tuang 40 mL Nano Diesel.',
    },
    {
      '@type': 'HowToStep',
      name: 'Tuang ke tangki',
      text: 'Tuang Nano Diesel ke tangki terlebih dahulu, sebelum atau saat mengisi bahan bakar di SPBU — proses pengisian solar akan otomatis mencampurkannya.',
    },
    {
      '@type': 'HowToStep',
      name: 'Isi bahan bakar seperti biasa',
      text: 'Tidak ada langkah tambahan. Kendaraan bisa langsung dipakai setelah tangki terisi penuh.',
    }
  ]
};

export default function CaraPakaiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-[72px] min-h-screen bg-olive-50 text-brand-dark">
        {/* Hero Section */}
        <div className="-mt-[72px] bg-brand-white px-6 lg:px-12 pt-32 md:pt-44 pb-24 md:pb-36 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-brand-dark leading-tight mb-6 max-w-4xl">
              Cara Pakai Nano Diesel
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-brand-copy mb-6 max-w-3xl leading-snug">
              Tuang Nano Diesel ke tangki dengan takaran 1 mL per 1 liter bahan bakar, lalu isi solar seperti biasa.
            </p>
            <p className="text-base md:text-lg text-olive-700 max-w-[800px] leading-relaxed">
              Panduan lengkap cara menggunakan aditif Nano Diesel pada tangki bahan bakar kendaraan. Tidak perlu ke bengkel, tidak perlu membuka kap mesin.
            </p>
          </div>
        </div>

        <article className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 md:py-24">

          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 text-emerald-800 border-b pb-2 border-emerald-100">3 Langkah Mudah</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-olive-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-emerald-100 text-emerald-800 font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Tentukan takaran</h3>
                  <p className="text-brand-copy">1 mL Nano Diesel untuk setiap 1 liter bahan bakar. <br/><span className="text-olive-500 italic mt-1 block">Contoh: tangki diisi 40 liter solar &rarr; tuang 40 mL Nano Diesel.</span></p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-olive-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-emerald-100 text-emerald-800 font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Tuang ke tangki</h3>
                  <p className="text-brand-copy">Tuang Nano Diesel ke tangki terlebih dahulu, sebelum atau saat mengisi bahan bakar di SPBU — proses pengisian solar akan otomatis mencampurkannya.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-olive-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-emerald-100 text-emerald-800 font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Isi bahan bakar seperti biasa</h3>
                  <p className="text-brand-copy">Tidak ada langkah tambahan. Kendaraan bisa langsung dipakai setelah tangki terisi penuh.</p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-olive-600 font-medium bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
              Tidak perlu modifikasi mesin, tidak perlu remap, tidak perlu ke bengkel.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-6 text-emerald-800">Kompatibilitas</h2>
            <p className="mb-6 font-medium">
              <strong className="text-brand-dark">Cocok untuk mesin diesel dengan bahan bakar solar biasa maupun campuran biodiesel</strong> (B30, B50, hingga B100), termasuk Pertamina Dex.
            </p>
            
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-olive-200 w-full mb-12">
              <table className="w-full text-left border-collapse">
                <thead className="bg-olive-100">
                  <tr>
                    <th className="p-4 border-b border-olive-200 font-bold text-brand-dark">Bahan bakar</th>
                    <th className="p-4 border-b border-olive-200 font-bold text-brand-dark text-center">Kompatibel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-olive-100">
                  <tr>
                    <td className="p-4 font-bold">Solar / Pertamina Dex</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">Ya</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">B30</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">Ya</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">B50</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">Ya</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">B100</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">Ya</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-brand-copy leading-relaxed">
              Nano Diesel diuji pada Toyota Land Cruiser 200, Toyota Fortuner, dan Mitsubishi Pajero Sport Dakar — cocok untuk mesin diesel SUV, mobil keluarga, hingga kendaraan niaga/armada.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <section className="bg-white p-8 rounded-2xl border border-olive-200 shadow-sm">
              <h2 className="text-2xl font-headline font-bold mb-4 text-emerald-800">Seberapa sering dipakai?</h2>
              <p className="text-brand-copy">
                Tuang Nano Diesel <strong>setiap kali mengisi bahan bakar</strong>, dengan takaran mengikuti volume pengisian (1 mL per 1 liter). Tidak perlu jeda atau "masa istirahat" antar penggunaan.
              </p>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>
              <h2 className="text-2xl font-headline font-bold mb-4 text-amber-800">Yang perlu diperhatikan</h2>
              <p className="text-brand-copy">
                <strong>Ikuti takaran yang tertera pada kemasan.</strong> Menambah takaran melebihi anjuran tidak menambah manfaat — konsentrasi berlebih justru berisiko menggumpal (aglomerasi) dan tidak disarankan.
              </p>
            </section>
          </div>

          <section className="mb-16 bg-white p-8 rounded-2xl border border-olive-200 shadow-sm">
            <h2 className="text-3xl font-headline font-bold mb-8 text-emerald-800">Pertanyaan yang sering muncul</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-brand-dark">Apakah aman dicampur langsung di tangki?</h3>
                <p className="mt-2 text-brand-copy">Ya — Nano Diesel dirancang untuk dituang langsung ke tangki dan bercampur secara alami dengan bahan bakar saat pengisian.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-brand-dark">Apakah perlu ke bengkel untuk aplikasi pertama?</h3>
                <p className="mt-2 text-brand-copy">Tidak. Nano Diesel bekerja di sisi bahan bakar, bukan komponen mesin, jadi tidak ada instalasi atau kunjungan bengkel yang diperlukan.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-brand-dark">Bagaimana kalau tangki belum kosong saat mau menambah Nano Diesel?</h3>
                <p className="mt-2 text-brand-copy">Hitung takaran berdasarkan jumlah bahan bakar yang akan diisi (bukan kapasitas total tangki), lalu tuang sebelum atau saat pengisian berlangsung.</p>
              </div>
            </div>
          </section>

        </article>
      </main>
    </>
  );
}
