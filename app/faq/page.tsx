import { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nanodiesel.id';

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan Umum Nano Diesel',
  description: 'Pertanyaan yang sering diajukan mengenai Nano Diesel: keamanan mesin, cara kerja, peningkatan performa, cara pakai, hingga garansi mobil.',
  openGraph: {
    title: 'FAQ - Pertanyaan Umum Nano Diesel',
    description: 'Pertanyaan yang sering diajukan mengenai Nano Diesel: keamanan mesin, cara kerja, peningkatan performa, cara pakai, hingga garansi mobil.',
    siteName: 'Nano Diesel',
  },
};

const faqs = [
  {
    question: 'Apakah Nano Diesel aman untuk mesin diesel harian?',
    answer: 'Ya. Nano Diesel bekerja di sisi bahan bakar, bukan memodifikasi komponen mesin, dan nanopartikel karbonnya terbakar habis saat proses pembakaran tanpa meninggalkan residu. Uji lubrisitas LEMIGAS pada B100 menunjukkan keausan komponen (HFRR wear scar) turun dari 280,5 menjadi 249 mikron — artinya gesekan pada injektor dan ruang bakar berkurang, bukan bertambah. <br/><br/><em>Catatan penting: ikuti takaran sesuai kemasan. Konsentrasi berlebih berisiko aglomerasi nanopartikel dan tidak menambah manfaat.</em>',
  },
  {
    question: 'Apa itu Nano Diesel dan bagaimana cara kerjanya?',
    answer: 'Nano Diesel adalah aditif bahan bakar diesel berbasis teknologi nanopartikel karbon (N6) dengan struktur cincin aromatik, dikembangkan NanoSix — perusahaan riset nanomaterial sejak 2016. Nano Diesel bekerja melalui empat mekanisme:<br/><br/><ol className="list-decimal pl-5 space-y-2"><li><strong>Atomisasi & pengapian lebih baik</strong> — memecah bahan bakar menjadi butiran lebih halus sehingga bercampur udara lebih merata.</li><li><strong>Pembakaran lebih efisien</strong> — nanopartikel berperan sebagai titik nukleasi dan sumber panas tambahan yang menjaga nyala tetap stabil.</li><li><strong>Super-lubrikasi</strong> — melapisi permukaan logam (surface lamination) dan mengisi goresan mikro (scratch filling) untuk mengurangi gesekan.</li><li><strong>Anti-oksidan</strong> — struktur cincin aromatik menangkap radikal bebas yang memicu oksidasi biodiesel, sehingga bahan bakar lebih tahan disimpan.</li></ol>',
  },
  {
    question: 'Apakah Nano Diesel terbukti secara ilmiah? Ada data lab?',
    answer: 'Ya. Nano Diesel diuji oleh tiga pihak independen: <strong>LEMIGAS</strong> (laboratorium milik negara, nomor LHU 202402108/LHU/DPMA/XII/2024, 202400375/LHU/DPMA/III/2024, dan 202201234/LHU/B.15/X/2022), <strong>PT Mutuagung Lestari Tbk</strong> (lembaga uji terakreditasi, No. 18247-18250/SL/XI/2024), serta dua bengkel dyno independen — <strong>Elika Automotive Performance</strong> dan <strong>Dastek Dynamometer</strong>.<br/><br/>Pengujian dilakukan pada tiga kendaraan: Toyota Land Cruiser 200, Toyota Fortuner, dan Mitsubishi Pajero Sport Dakar — serta pada tiga campuran biodiesel: B30, B50, dan B100.<br/><br/><strong>Hasil kunci dari LEMIGAS (B100):</strong><ul className="list-disc pl-5 mt-2 space-y-1"><li>Stabilitas oksidasi (rancimat): 227 &rarr; 295 menit</li><li>Lubrisitas (HFRR wear scar): 280,5 &rarr; 249 mikron</li><li>HC tak terbakar (Mutuagung, B100): 13,7 &rarr; &lt;0,10 ppm</li></ul><br/>Nomor LHU tersedia dan dapat ditunjukkan bila diminta.',
  },
  {
    question: 'Berapa peningkatan torsi dan tenaga dari Nano Diesel?',
    answer: 'Berdasarkan hasil dyno test Toyota Land Cruiser 200, gigi 4, 19 Mei 2026 (Dastek Dynamometer): torsi puncak naik dari 620,8 menjadi 713,4 Nm (+14,9%), dan tenaga puncak naik dari 232,9 menjadi 254,1 BHP (+9,1%). Torsi pada 1.500 rpm — rentang yang paling sering dipakai saat macet, menanjak, atau membawa beban — melonjak dari 374,2 menjadi 518,1 Nm (+38,5%).<br/><br/><em>Hasil dapat bervariasi tergantung kondisi mesin dan bahan bakar.</em>',
  },
  {
    question: 'Apakah Nano Diesel terbukti untuk armada/fleet, bukan cuma satu mobil?',
    answer: 'Ya. Selain LC200, Nano Diesel diuji terpisah pada Toyota Fortuner dan Mitsubishi Pajero Sport Dakar (Elika Automotive Performance, bahan bakar B100):<br/><br/><ul className="list-disc pl-5 space-y-2"><li><strong>Toyota Fortuner:</strong> torsi maksimal 310,9 &rarr; 318,9 Nm; tenaga maksimal 122,0 &rarr; 126,3 HP</li><li><strong>Pajero Sport Dakar:</strong> torsi maksimal 425,2 &rarr; 433,4 Nm; tenaga maksimal setara (174,4 vs 174,2 HP)</li></ul><br/>Bukti performa Nano Diesel tidak bertumpu pada satu kendaraan saja.',
  },
  {
    question: 'Apakah Nano Diesel membuat konsumsi BBM lebih irit?',
    answer: 'Belum ada data pembanding konsumsi BBM dengan-vs-tanpa Nano Diesel, sehingga Nano Diesel <strong>tidak mengklaim</strong> "lebih irit BBM". Data konsumsi yang tersedia (Toyota 2GD-FTV 2.4L, B35+N6, SNI 7554:2010) bersifat nilai absolut tanpa baseline pembanding, sehingga tidak bisa dipakai untuk klaim penghematan.<br/><br/>Yang sudah terbukti melalui uji lab dan dyno independen: peningkatan torsi/tenaga, pembakaran lebih tuntas (HC turun drastis), keausan komponen berkurang, dan stabilitas penyimpanan bahan bakar meningkat.',
  },
  {
    question: 'Apakah Nano Diesel bekerja untuk B30, B50, dan B100 — termasuk untuk mandat B50 2026?',
    answer: 'Ya. Nano Diesel dirancang dan diuji langsung pada B30, B50, dan B100 (bukan hanya solar murni). Ini relevan karena Indonesia menjalankan program B40 saat ini dan berencana B50 pada 2026 — semakin tinggi kandungan biodiesel, semakin relevan tantangan alami biodiesel seperti stabilitas oksidasi dan degradasi saat penyimpanan, dua area yang menjadi fokus mekanisme kerja Nano Diesel.<br/><br/>Pada B50 (Toyota Fortuner), torsi pada 3.000 rpm meningkat dari 418,8 menjadi 447,6 Nm, dan tenaga pada rpm yang sama meningkat dari 176,4 menjadi 188,5 HP.',
  },
  {
    question: 'Bagaimana cara pakai dan berapa dosis Nano Diesel?',
    answer: 'Tuang Nano Diesel ke tangki saat mengisi bahan bakar, sesuai takaran pada kemasan, lalu isi bahan bakar seperti biasa. Tidak perlu ke bengkel dan tidak perlu membuka kap mesin.<br/><br/><strong>Dosis:</strong> 1 mL Nano Diesel untuk setiap 1 liter bahan bakar.',
  },
  {
    question: 'Apakah Nano Diesel memengaruhi garansi mobil?',
    answer: 'Kebijakan garansi adalah wewenang masing-masing dealer/APM (Agen Pemegang Merek), sehingga Nano Diesel tidak dapat menjanjikan status garansi kendaraan tertentu — disarankan mengecek langsung ke dealer terkait. Secara teknis, Nano Diesel bekerja di sisi bahan bakar dan terbakar habis saat pembakaran, bukan memodifikasi komponen mesin.',
  },
  {
    question: 'Kalau Nano Diesel sebagus itu, kenapa pabrikan tidak memakainya langsung dari pabrik?',
    answer: 'Pabrikan merancang mesin untuk jutaan unit yang dijual ke seluruh dunia, dengan kualitas bahan bakar dan regulasi yang berbeda-beda di tiap negara — sehingga tidak bisa berasumsi semua pemilik kendaraan memakai aditif tertentu. Nano Diesel bekerja di sisi bahan bakar dan pembakaran, area yang secara struktural tidak dioptimalkan dari pabrik, sehingga posisinya melengkapi rekayasa mesin, bukan menggantikannya.',
  }
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer.replace(/<[^>]*>?/gm, ''), // Remove HTML tags for structured data
    },
  })),
};

export default function FaqPage() {
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
              Pertanyaan Umum (FAQ)
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-brand-copy mb-6 max-w-3xl leading-snug">
              Jawaban atas pertanyaan seputar cara kerja, bukti ilmiah, dan penggunaan Nano Diesel.
            </p>
            <p className="text-base md:text-lg text-olive-700 max-w-[800px] leading-relaxed">
              Jika Anda tidak menemukan jawaban yang dicari di sini, jangan ragu untuk menghubungi tim ahli kami melalui WhatsApp. Kami siap membantu pertanyaan teknis maupun aplikasi spesifik Anda.
            </p>
          </div>
        </div>

        <article className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 md:py-24">

          <div className="divide-y divide-olive-200 border-b border-olive-200">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                name="faq-accordion"
                className="group py-6 first:pt-0"
              >
                <summary className="font-headline font-bold text-lg md:text-xl text-brand-dark cursor-pointer flex items-center justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
                  <span className="pr-4">{faq.question}</span>
                  <div className="w-10 h-10 rounded bg-olive-100 text-brand-dark flex items-center justify-center shrink-0 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-800">
                    <span className="text-2xl leading-none font-normal mt-[-2px] group-open:hidden">+</span>
                    <span className="text-2xl leading-none font-normal mt-[-2px] hidden group-open:block">-</span>
                  </div>
                </summary>
                <div 
                  className="pt-6 text-brand-copy prose prose-olive prose-p:my-2 prose-ul:my-2 prose-ol:my-2 max-w-none text-base md:text-lg"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </details>
            ))}
          </div>

          <div className="mt-16 bg-emerald-900 text-white p-8 rounded-2xl text-center shadow-lg">
            <h2 className="text-2xl font-headline font-bold mb-4">Masih punya pertanyaan?</h2>
            <p className="mb-6 text-emerald-100">
              Tim Nano Diesel siap membantu menjawab pertanyaan teknis Anda.
            </p>
            <a 
              href="https://wa.me/622122483303" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
