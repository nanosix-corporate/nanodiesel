import { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nanodiesel.id';

export const metadata: Metadata = {
  title: 'Bukti Uji Nano Diesel',
  description: 'Bukti uji Nano Diesel: hasil dyno LC200, Fortuner, Pajero Sport Dakar, data LEMIGAS & PT Mutuagung Lestari dengan nomor LHU lengkap.',
  openGraph: {
    title: 'Bukti Uji Nano Diesel',
    description: 'Bukti uji Nano Diesel: hasil dyno LC200, Fortuner, Pajero Sport Dakar, data LEMIGAS & PT Mutuagung Lestari dengan nomor LHU lengkap.',
    siteName: 'Nano Diesel',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Article', 'Dataset'],
  name: 'Bukti Uji Nano Diesel',
  description: 'Hasil pengujian Nano Diesel oleh LEMIGAS, PT Mutuagung Lestari Tbk, Dastek Dynamometer, dan Elika Automotive Performance pada kendaraan Land Cruiser 200, Fortuner, dan Pajero Sport Dakar.',
  url: `${BASE_URL}/bukti-uji`,
  creator: {
    '@type': 'Organization',
    name: 'NanoSix',
  },
};

export default function BuktiUjiPage() {
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
              Bukti Uji Nano Diesel
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-brand-copy mb-6 max-w-3xl leading-snug">
              Nano Diesel diuji oleh LEMIGAS, PT Mutuagung Lestari Tbk, dan dyno independen (Dastek, Elika).
            </p>
            <p className="text-base md:text-lg text-olive-700 max-w-[800px] leading-relaxed">
              Ringkasan singkat: Pengujian dilakukan pada 3 kendaraan (Land Cruiser 200, Fortuner, Pajero Sport Dakar) dan 3 jenis bahan bakar (B30, B50, B100).
            </p>
          </div>
        </div>

        <article className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 md:py-24">
          <header className="mb-12 max-w-4xl">
            <div className="text-sm text-brand-dark bg-white border border-olive-200 p-6 rounded-xl shadow-sm">
              <p className="mb-2"><strong>Nomor LHU:</strong> 202402108/LHU/DPMA/XII/2024 · 202400375/LHU/B.15/III/2024 · 202201234/LHU/B.15/X/2022</p>
              <p><strong>Nomor Mutuagung:</strong> 18247-18250/SL/XI/2024 <br/><em className="text-olive-500 mt-2 block">Hasil dapat bervariasi tergantung kondisi mesin dan bahan bakar.</em></p>
            </div>
          </header>

          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-6 text-emerald-800">Siapa yang menguji Nano Diesel?</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-olive-200">
              <table className="w-full text-left border-collapse">
                <thead className="bg-olive-100">
                  <tr>
                    <th className="p-4 border-b border-olive-200 font-bold text-brand-dark">Penguji</th>
                    <th className="p-4 border-b border-olive-200 font-bold text-brand-dark">Peran</th>
                    <th className="p-4 border-b border-olive-200 font-bold text-brand-dark">Yang diuji</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-olive-100">
                  <tr>
                    <td className="p-4 font-bold">LEMIGAS</td>
                    <td className="p-4">Lab milik negara</td>
                    <td className="p-4">Karakteristik fisika-kimia & kinerja mesin (B30/B100)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">PT Mutuagung Lestari Tbk</td>
                    <td className="p-4">Lembaga terakreditasi</td>
                    <td className="p-4">Emisi (B50/B100)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Dastek Dynamometer</td>
                    <td className="p-4">Dyno independen</td>
                    <td className="p-4">Land Cruiser 200, Pertamina Dex</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Elika Automotive Performance</td>
                    <td className="p-4">Dyno independen</td>
                    <td className="p-4">Fortuner & Pajero Sport Dakar, B100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-4 text-olive-400 italic">Standar acuan: SNI 7182:2015, diverifikasi LEMIGAS & PT Mutuagung Lestari Tbk.</p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 text-emerald-800 border-b pb-2 border-emerald-100">Hasil berdasarkan kebutuhan Anda</h2>
            
            <div className="mb-12 bg-white p-8 rounded-2xl border border-olive-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Punya SUV diesel premium (LC200 / Fortuner / Pajero)?
              </h3>
              <p className="text-lg mb-6 bg-emerald-50 text-emerald-900 p-4 rounded-lg font-medium border border-emerald-100">
                <strong className="text-xl">Torsi +14,9% · Tenaga +9,1%</strong> <br/>
                <span className="text-base font-normal">— dyno Dastek, Land Cruiser 200, gigi 4, 19 Mei 2026.</span>
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-olive-200">
                  <thead className="bg-olive-50">
                    <tr>
                      <th className="p-3 border border-olive-200">Parameter</th>
                      <th className="p-3 border border-olive-200">Tanpa aditif</th>
                      <th className="p-3 border border-olive-200 bg-emerald-50 font-bold text-emerald-900">Nano Diesel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-olive-200">Torsi puncak</td>
                      <td className="p-3 border border-olive-200">620,8 Nm</td>
                      <td className="p-3 border border-olive-200 bg-emerald-50/50"><strong>713,4 Nm</strong> (+14,9%)</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-olive-200">Tenaga puncak</td>
                      <td className="p-3 border border-olive-200">232,9 BHP</td>
                      <td className="p-3 border border-olive-200 bg-emerald-50/50"><strong>254,1 BHP</strong> (+9,1%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-3 text-olive-400 italic">*Kondisi: Pertamina Dex, gigi 4, Dastek Dynamometer, 19 Mei 2026. Hasil dapat bervariasi.*</p>
            </div>

            <div className="mb-12 bg-white p-8 rounded-2xl border border-olive-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Operasikan armada / usaha logistik?
              </h3>
              <p className="mb-6">
                Bukti tidak hanya dari satu mobil — ada data terpisah dari Fortuner dan Pajero Sport Dakar (B100, dyno Elika).
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-olive-200">
                  <thead className="bg-olive-50">
                    <tr>
                      <th className="p-3 border border-olive-200">Kendaraan</th>
                      <th className="p-3 border border-olive-200">Torsi maks</th>
                      <th className="p-3 border border-olive-200">Daya maks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-olive-200">Toyota Fortuner</td>
                      <td className="p-3 border border-olive-200">310,9 → <strong>318,9 Nm</strong> (+2,6%)</td>
                      <td className="p-3 border border-olive-200">122,0 → <strong>126,3 HP</strong> (+3,5%)</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-olive-200">Pajero Sport Dakar</td>
                      <td className="p-3 border border-olive-200">425,2 → <strong>433,4 Nm</strong> (+1,9%)</td>
                      <td className="p-3 border border-olive-200">174,4 → 174,2 HP (setara)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-3 text-olive-400 italic">*Sumber: Elika Automotive Performance, B100. Diuji terpisah dari sesi LC200.*</p>
            </div>

            <div className="mb-12 bg-white p-8 rounded-2xl border border-olive-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Suka off-road / medan berat?
              </h3>
              <p className="text-lg mb-6 bg-emerald-50 text-emerald-900 p-4 rounded-lg font-medium border border-emerald-100">
                <strong className="text-xl">Torsi @1.500 rpm naik +38,5%</strong> <br/>
                <span className="text-base font-normal">— rentang RPM yang paling sering dipakai saat menanjak dan bawa beban.</span>
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-olive-200">
                  <thead className="bg-olive-50">
                    <tr>
                      <th className="p-3 border border-olive-200">Parameter</th>
                      <th className="p-3 border border-olive-200">Tanpa aditif</th>
                      <th className="p-3 border border-olive-200 bg-emerald-50 font-bold text-emerald-900">Nano Diesel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-olive-200">Torsi @1.500 rpm</td>
                      <td className="p-3 border border-olive-200">374,2 Nm</td>
                      <td className="p-3 border border-olive-200 bg-emerald-50/50"><strong>518,1 Nm</strong> (+38,5%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-3 text-olive-400 italic">*Dyno Dastek, Land Cruiser 200, 19 Mei 2026. Hasil dapat bervariasi.*</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-olive-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Pakai diesel harian / mobil keluarga?
              </h3>
              <p className="mb-6">
                Fokus Anda mungkin bukan tenaga ekstra, tapi keausan mesin. Ini datanya:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-olive-200">
                  <thead className="bg-olive-50">
                    <tr>
                      <th className="p-3 border border-olive-200">Parameter</th>
                      <th className="p-3 border border-olive-200">B100</th>
                      <th className="p-3 border border-olive-200 bg-emerald-50 font-bold text-emerald-900">+ Nano Diesel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-olive-200">Keausan (HFRR, mikron — makin kecil makin baik)</td>
                      <td className="p-3 border border-olive-200">280,5</td>
                      <td className="p-3 border border-olive-200 bg-emerald-50/50"><strong>249</strong></td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-olive-200">Stabilitas oksidasi (menit — makin lama makin baik)</td>
                      <td className="p-3 border border-olive-200">227</td>
                      <td className="p-3 border border-olive-200 bg-emerald-50/50"><strong>295</strong></td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-olive-200">Angka setana</td>
                      <td className="p-3 border border-olive-200">63,8</td>
                      <td className="p-3 border border-olive-200 bg-emerald-50/50">63,2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-3 text-olive-400 italic">*Sumber: LEMIGAS. Ini indikator keausan berkurang, bukan klaim umur mesin lebih panjang (belum ada data khusus untuk itu).*</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 text-emerald-800 border-b pb-2 border-emerald-100">Data lengkap kinerja mesin</h2>
            
            <details className="mb-4 bg-white rounded-xl border border-olive-200 shadow-sm group">
              <summary className="p-4 font-bold cursor-pointer hover:bg-olive-50 transition-colors rounded-xl flex items-center justify-between">
                <span>LEMIGAS — B100, torsi & daya per RPM</span>
                <span className="text-emerald-600 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 pt-0 border-t border-olive-100 mt-2">
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse border border-olive-200 text-sm">
                    <thead className="bg-olive-50">
                      <tr>
                        <th className="p-2 border border-olive-200">RPM</th>
                        <th className="p-2 border border-olive-200">Torsi B100 (Nm)</th>
                        <th className="p-2 border border-olive-200 bg-emerald-50">Torsi + Nano Diesel (Nm)</th>
                        <th className="p-2 border border-olive-200">Daya B100 (HP)</th>
                        <th className="p-2 border border-olive-200 bg-emerald-50">Daya + Nano Diesel (HP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-olive-100">
                      <tr><td className="p-2 border border-olive-200">2000</td><td className="p-2 border border-olive-200">235</td><td className="p-2 border border-olive-200 bg-emerald-50/30">244</td><td className="p-2 border border-olive-200">68</td><td className="p-2 border border-olive-200 bg-emerald-50/30">70</td></tr>
                      <tr><td className="p-2 border border-olive-200">2500</td><td className="p-2 border border-olive-200">284,8</td><td className="p-2 border border-olive-200 bg-emerald-50/30">294,2</td><td className="p-2 border border-olive-200">102,9</td><td className="p-2 border border-olive-200 bg-emerald-50/30">104,8</td></tr>
                      <tr><td className="p-2 border border-olive-200">3000</td><td className="p-2 border border-olive-200">272</td><td className="p-2 border border-olive-200 bg-emerald-50/30">280,9</td><td className="p-2 border border-olive-200">117,2</td><td className="p-2 border border-olive-200 bg-emerald-50/30">121,1</td></tr>
                      <tr><td className="p-2 border border-olive-200">3500</td><td className="p-2 border border-olive-200">239</td><td className="p-2 border border-olive-200 bg-emerald-50/30">242,2</td><td className="p-2 border border-olive-200">115,9</td><td className="p-2 border border-olive-200 bg-emerald-50/30">119,4</td></tr>
                      <tr><td className="p-2 border border-olive-200">4000</td><td className="p-2 border border-olive-200">194,1</td><td className="p-2 border border-olive-200 bg-emerald-50/30">200,9</td><td className="p-2 border border-olive-200">109,5</td><td className="p-2 border border-olive-200 bg-emerald-50/30">113,1</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-3 text-olive-400 italic">Sumber: LEMIGAS, LHU 202402108/LHU/DPMA/XII/2024.</p>
              </div>
            </details>

            <details className="mb-4 bg-white rounded-xl border border-olive-200 shadow-sm group">
              <summary className="p-4 font-bold cursor-pointer hover:bg-olive-50 transition-colors rounded-xl flex items-center justify-between">
                <span>B50 — Fortuner, torsi & daya per RPM</span>
                <span className="text-emerald-600 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="p-4 pt-0 border-t border-olive-100 mt-2">
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse border border-olive-200 text-sm">
                    <thead className="bg-olive-50">
                      <tr>
                        <th className="p-2 border border-olive-200">RPM</th>
                        <th className="p-2 border border-olive-200">Torsi B50 (Nm)</th>
                        <th className="p-2 border border-olive-200 bg-emerald-50">Torsi + Nano Diesel (Nm)</th>
                        <th className="p-2 border border-olive-200">Daya B50 (HP)</th>
                        <th className="p-2 border border-olive-200 bg-emerald-50">Daya + Nano Diesel (HP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-olive-100">
                      <tr><td className="p-2 border border-olive-200">2500</td><td className="p-2 border border-olive-200">423,4</td><td className="p-2 border border-olive-200 bg-emerald-50/30">446,2</td><td className="p-2 border border-olive-200">148,6</td><td className="p-2 border border-olive-200 bg-emerald-50/30">156,6</td></tr>
                      <tr><td className="p-2 border border-olive-200">3000</td><td className="p-2 border border-olive-200">418,8</td><td className="p-2 border border-olive-200 bg-emerald-50/30 font-bold">447,6 (+6,9%)</td><td className="p-2 border border-olive-200">176,4</td><td className="p-2 border border-olive-200 bg-emerald-50/30 font-bold">188,5 (+6,9%)</td></tr>
                      <tr><td className="p-2 border border-olive-200">3500</td><td className="p-2 border border-olive-200">382</td><td className="p-2 border border-olive-200 bg-emerald-50/30">385,7</td><td className="p-2 border border-olive-200">187,7</td><td className="p-2 border border-olive-200 bg-emerald-50/30">189,5</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-3 text-olive-400 italic">Relevan untuk konteks B50 (mandat efektif 1 Juli 2026).</p>
              </div>
            </details>
          </section>

          <section className="mb-16 bg-white p-8 rounded-2xl border border-olive-200 shadow-sm">
            <h2 className="text-3xl font-headline font-bold mb-8 text-emerald-800">Pertanyaan yang sering muncul</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-brand-dark">"Satu dyno test bukan bukti."</h3>
                <p className="mt-2 text-brand-copy">Betul — makanya data di sini dari 3 kendaraan berbeda, 2 dyno independen, dan 2 lab, bukan satu angka dari satu sumber.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-brand-dark">"Kalau sebagus itu, kenapa pabrikan tidak pakai dari pabrik?"</h3>
                <p className="mt-2 text-brand-copy">Pabrikan merancang mesin untuk jutaan unit lintas kualitas bahan bakar dunia — tidak bisa berasumsi semua orang pakai aditif. Nano Diesel bekerja di sisi bahan bakar, melengkapi bukan menggantikan rekayasa mesin.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-brand-dark">"Berlaku untuk semua mobil?"</h3>
                <p className="mt-2 text-brand-copy">Tidak. Angka di atas spesifik untuk kendaraan dan kondisi uji yang disebutkan. Hasil dapat bervariasi.</p>
              </div>
            </div>
          </section>

        </article>
      </main>
    </>
  );
}
