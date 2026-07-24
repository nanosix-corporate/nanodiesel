export interface ProductDetail {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  image: string;
  sections: { heading: string; body: string[] }[];
  faq: { q: string; a: string }[];
  shopee: string | null;
  tokopedia: string | null;
}

const productDetails: Record<string, ProductDetail> = {
  'nano-diesel-1-botol-70ml': {
    id: 'Nano Diesel 1 Botol (70ml)',
    title: '1 Botol',
    subtitle: 'Nano Diesel 70ml — Aditif Solar Premium untuk Perlindungan Mesin dan Performa Optimal',
    price: 'Rp 70.000',
    description: 'Cocok untuk satu kali pengisian penuh. Coba rasakan perbedaannya di tangki kendaraan Anda.',
    image: '/images/product/product-image-1.webp',
    sections: [
      {
        heading: 'Cocok Digunakan Untuk',
        body: [
          'Mobil Keluarga & SUV Diesel (Innova, Fortuner, Pajero, dll)',
          'Truk, Bus & Kendaraan Niaga',
          'Alat Berat (Excavator, Bulldozer, Dump Truck)',
        ],
      },
      {
        heading: 'Keunggulan Nanodiesel',
        body: [
          'Teknologi nanopartikel ramah lingkungan berbasis karbon',
        ],
      },
      {
        heading: 'Manfaat Penggunaan',
        body: [
          'Tarikan terasa lebih ringan dan responsif',
          'Suara mesin menjadi lebih halus',
          'Membantu mengoptimalkan efisiensi konsumsi solar',
          'Menjaga injektor dari sumbatan kotoran',
          'Membantu memperpanjang usia pakai mesin',
        ],
      },
      {
        heading: 'Cara Kerja Nanodiesel',
        body: [
          'Meningkatkan penguapan bahan bakar',
          'Membantu proses pembakaran lebih merata',
          'Menjaga nyala pembakaran lebih stabil',
          'Mendukung sistem pelumasan modern',
        ],
      },
      {
        heading: 'Cara Pakai',
        body: [
          '1 mL Nanodiesel dicampurkan untuk 1 Liter Solar atau Biosolar',
          '1 botol Nanodiesel 70 mL untuk pencampuran Full tanki bahan bakar mobil diesel kapasitas 70 L',
        ],
      },
      {
        heading: 'Isi & Ukuran',
        body: [
          'Isi : 1 botol',
          'Ukuran : 70 ml',
        ],
      },
      {
        heading: 'Hasil Pengujian Performa',
        body: [
          'Peningkatan efisiensi & kualitas pelumasan',
          'Penurunan hidrokarbon tidak terbakar (HC) hingga >99%',
          'Peningkatan tenaga maksimum',
          'Peningkatan torsi maksimum',
          'Pembakaran lebih bersih & efisien',
        ],
      },
      {
        heading: 'Kenapa Pilih Nano Diesel?',
        body: [
          'Tersertifikasi resmi LEMIGAS & Mutuagung Lestari',
          'Teruji di Dyno Test: Peningkatan HP (Horsepower) signifikan',
          'Satu solusi premium untuk merawat semua jenis mesin diesel',
          'Andal menaklukkan berbagai kualitas Biodiesel (B30 hingga B100)',
          'Performa maksimal dengan efisiensi biaya operasional',
        ],
      },
      {
        heading: 'Cara Simpan',
        body: [
          'Simpan di tempat yang sejuk dan jauhkan dari jangkauan anak-anak',
        ],
      },
    ],
    faq: [
      { q: 'Apakah Nano Diesel cocok untuk mobil diesel saya?', a: 'Ya. Nano Diesel cocok untuk semua jenis mesin diesel, termasuk mobil keluarga, SUV, truk, dan alat berat yang menggunakan bahan bakar Solar, Dexlite, Pertamina Dex, maupun Biodiesel B30 hingga B100.' },
      { q: 'Berapa dosis pemakaian Nano Diesel?', a: 'Dosis pemakaian adalah 1 ml Nano Diesel untuk setiap 1 liter solar. Satu botol 70 ml cukup untuk satu kali pengisian tangki penuh (kapasitas ±70 liter).' },
      { q: 'Kapan saya bisa merasakan hasilnya?', a: 'Sebagian besar pengguna merasakan perbedaan tarikan mesin sejak pengisian pertama. Hasil optimal, seperti penurunan suara mesin dan peningkatan efisiensi BBM.' },
      { q: 'Apakah Nano Diesel sudah memiliki sertifikasi resmi?', a: 'Ya. Nano Diesel telah tersertifikasi oleh LEMIGAS dan Mutuagung Lestari, serta teruji melalui Dyno Test. Anda dapat melihat detail hasil uji kami di <a href="/teknologi-kami" class="text-emerald-600 hover:underline">Halaman Teknologi Kami</a>.' },
      { q: 'Apakah aman digunakan bersama Biodiesel B35 atau B50?', a: 'Nano Diesel dirancang khusus untuk bekerja optimal dengan Biodiesel B30 hingga B100. Formulasi Oxygenated Technology-nya membantu mengatasi masalah atomisasi dan residu karbon yang umum terjadi pada Biodiesel.' }
    ],
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Hemat-BBM-Boost-Performa-Mesin-Diesel-70-ml-1-botol-Aditif-Solar-Premium-i.1822722168.47810303561',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/hemat-bbm-aditif-solar-diesel-nanodiesel-70ml-performa-mesin-diesel-lebih-maksimal-1-botol-1735927704744003386',
  },
  'nano-diesel-2-botol-2x70ml': {
    id: 'Nano Diesel 2 Botol (2x70ml)',
    title: '2 Botol',
    subtitle: 'Nano Diesel 70ml (Value Pack 2 Botol) — Aditif Solar Premium untuk Perlindungan Mesin dan Performa Optimal',
    price: 'Rp 135.000',
    description: 'Pilihan paling populer. Cukup untuk dua kali pengisian dan merasakan manfaat penuh Nano Diesel.',
    image: '/images/product/product-image-2.webp',
    sections: [
      {
        heading: 'Cocok Digunakan Untuk',
        body: [
          'Semua jenis mobil diesel',
          'Truk & kendaraan logistik',
          'Alat berat',
        ],
      },
      {
        heading: 'Keunggulan Nanodiesel',
        body: [
          'Teknologi nanopartikel ramah lingkungan berbasis karbon',
        ],
      },
      {
        heading: 'Manfaat Penggunaan',
        body: [
          'Menaikan angkat Cetane',
          'Konsumsi bahan bakar mesin lebih hemat',
          'Tarikan mesin lebih responsif',
          'Mesin lebih halus',
          'Membantu memperpanjang umur mesin',
          'Biaya operasional lebih efisien',
        ],
      },
      {
        heading: 'Cara Kerja Nanodiesel',
        body: [
          'Meningkatkan penguapan bahan bakar',
          'Membantu proses pembakaran lebih merata',
          'Menjaga nyala pembakaran lebih stabil',
          'Mendukung sistem pelumasan modern',
        ],
      },
      {
        heading: 'Cara Pakai',
        body: [
          '1 mL Nanodiesel dicampurkan untuk 1 Liter Solar atau Biosolar',
          '1 botol Nanodiesel 70 mL untuk pencampuran Full tanki bahan bakar mobil diesel kapasitas 70 L',
        ],
      },
      {
        heading: 'Isi & Ukuran',
        body: [
          'Isi : 2 botol',
          'Ukuran : 70 ml/botol',
        ],
      },
      {
        heading: 'Hasil Pengujian Performa',
        body: [
          'Peningkatan efisiensi & kualitas pelumasan',
          'Penurunan hidrokarbon tidak terbakar (HC) hingga >99%',
          'Peningkatan tenaga maksimum',
          'Peningkatan torsi maksimum',
          'Pembakaran lebih bersih & efisien',
        ],
      },
      {
        heading: 'Kenapa Pilih Nano Diesel?',
        body: [
          'Teknologi telah diuji berdasarkan data dari LEMIGAS dan Mutu Agung Lestari',
          'Satu solusi untuk semua mesin diesel',
          'Performa maksimal, biaya operasional lebih rendah',
        ],
      },
      {
        heading: 'Cara Simpan',
        body: [
          'Simpan di tempat yang sejuk dan jauhkan dari jangkauan anak-anak',
        ],
      },
    ],
    faq: [
      { q: 'Apakah Nano Diesel cocok untuk mobil diesel saya?', a: 'Ya. Nano Diesel cocok untuk semua jenis mesin diesel, termasuk mobil keluarga, SUV, truk, dan alat berat yang menggunakan bahan bakar Solar, Dexlite, Pertamina Dex, maupun Biodiesel B30 hingga B100.' },
      { q: 'Berapa dosis pemakaian Nano Diesel?', a: 'Dosis pemakaian adalah 1 ml Nano Diesel untuk setiap 1 liter solar. Satu botol 70 ml cukup untuk satu kali pengisian tangki penuh (kapasitas ±70 liter).' },
      { q: 'Kapan saya bisa merasakan hasilnya?', a: 'Sebagian besar pengguna merasakan perbedaan tarikan mesin sejak pengisian pertama. Hasil optimal, seperti penurunan suara mesin dan peningkatan efisiensi BBM.' },
      { q: 'Apakah Nano Diesel sudah memiliki sertifikasi resmi?', a: 'Ya. Nano Diesel telah tersertifikasi oleh LEMIGAS dan Mutuagung Lestari, serta teruji melalui Dyno Test. Anda dapat melihat detail hasil uji kami di <a href="/teknologi-kami" class="text-emerald-600 hover:underline">Halaman Teknologi Kami</a>.' },
      { q: 'Apakah aman digunakan bersama Biodiesel B35 atau B50?', a: 'Nano Diesel dirancang khusus untuk bekerja optimal dengan Biodiesel B30 hingga B100. Formulasi Oxygenated Technology-nya membantu mengatasi masalah atomisasi dan residu karbon yang umum terjadi pada Biodiesel.' }
    ],
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Value-Pack-2-botol-Hemat-Bahan-Bakar-Aditif-Solar-Premium-i.1822722168.46911170264',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/paket-hemat-nanodiesel-70ml-2-botol-aditif-solar-diesel-hemat-bahan-bakar-1735928198678349626',
  },
  'nano-diesel-3-botol-3x70ml': {
    id: 'Nano Diesel 3 Botol (3x70ml)',
    title: '3 Botol',
    subtitle: 'Nano Diesel 70ml (Paket 3 Botol) — Aditif Solar Premium untuk Perlindungan Mesin dan Performa Optimal',
    price: 'Rp 185.000',
    description: 'Pilihan tengah yang pas untuk pemakaian beberapa kali. Cocok untuk perjalanan jauh dan aktivitas harian.',
    image: '/images/product/product-image-5.webp',
    sections: [
      {
        heading: 'Cocok Digunakan Untuk',
        body: [
          'Semua jenis mobil diesel',
          'Truk & kendaraan logistik',
          'Alat berat',
        ],
      },
      {
        heading: 'Keunggulan Nanodiesel',
        body: [
          'Teknologi nanopartikel ramah lingkungan berbasis karbon',
        ],
      },
      {
        heading: 'Manfaat Penggunaan',
        body: [
          'Menaikan angkat Cetane',
          'Konsumsi bahan bakar mesin lebih hemat',
          'Tarikan mesin lebih responsif',
          'Mesin lebih halus',
          'Membantu memperpanjang umur mesin',
          'Biaya operasional lebih efisien',
        ],
      },
      {
        heading: 'Cara Kerja Nanodiesel',
        body: [
          'Meningkatkan penguapan bahan bakar',
          'Membantu proses pembakaran lebih merata',
          'Menjaga nyala pembakaran lebih stabil',
          'Mendukung sistem pelumasan modern',
        ],
      },
      {
        heading: 'Cara Pakai',
        body: [
          '1 mL Nanodiesel dicampurkan untuk 1 Liter Solar atau Biosolar',
          '1 botol Nanodiesel 70 mL untuk pencampuran Full tanki bahan bakar mobil diesel kapasitas +-70 L',
        ],
      },
      {
        heading: 'Isi & Ukuran',
        body: [
          'Isi : 3 botol',
          'Ukuran : 70 ml/botol',
        ],
      },
      {
        heading: 'Hasil Pengujian Performa',
        body: [
          'Peningkatan efisiensi & kualitas pelumasan',
          'Penurunan hidrokarbon tidak terbakar (HC) hingga >99%',
          'Peningkatan tenaga maksimum',
          'Peningkatan torsi maksimum',
          'Pembakaran lebih bersih & efisien',
        ],
      },
      {
        heading: 'Kenapa Pilih Nano Diesel?',
        body: [
          'Teknologi telah diuji berdasarkan data dari LEMIGAS dan Mutu Agung Lestari',
          'Satu solusi untuk semua mesin diesel',
          'Performa maksimal, biaya operasional lebih rendah',
        ],
      },
      {
        heading: 'Cara Simpan',
        body: [
          'Simpan di tempat yang sejuk dan jauhkan dari jangkauan anak-anak',
        ],
      },
    ],
    faq: [
      { q: 'Apakah Nano Diesel cocok untuk mobil diesel saya?', a: 'Ya. Nano Diesel cocok untuk semua jenis mesin diesel, termasuk mobil keluarga, SUV, truk, dan alat berat yang menggunakan bahan bakar Solar, Dexlite, Pertamina Dex, maupun Biodiesel B30 hingga B100.' },
      { q: 'Berapa dosis pemakaian Nano Diesel?', a: 'Dosis pemakaian adalah 1 ml Nano Diesel untuk setiap 1 liter solar. Satu botol 70 ml cukup untuk satu kali pengisian tangki penuh (kapasitas ±70 liter).' },
      { q: 'Kapan saya bisa merasakan hasilnya?', a: 'Sebagian besar pengguna merasakan perbedaan tarikan mesin sejak pengisian pertama. Hasil optimal, seperti penurunan suara mesin dan peningkatan efisiensi BBM.' },
      { q: 'Apakah Nano Diesel sudah memiliki sertifikasi resmi?', a: 'Ya. Nano Diesel telah tersertifikasi oleh LEMIGAS dan Mutuagung Lestari, serta teruji melalui Dyno Test. Anda dapat melihat detail hasil uji kami di <a href="/teknologi-kami" class="text-emerald-600 hover:underline">Halaman Teknologi Kami</a>.' },
      { q: 'Apakah aman digunakan bersama Biodiesel B35 atau B50?', a: 'Nano Diesel dirancang khusus untuk bekerja optimal dengan Biodiesel B30 hingga B100. Formulasi Oxygenated Technology-nya membantu mengatasi masalah atomisasi dan residu karbon yang umum terjadi pada Biodiesel.' }
    ],
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-PAKET-3-BOTOL-Boost-Performa-Mesin-Lubrikasi-Maksimal-Mesin-Awet-Aditif-Solar-Premium-i.1822722168.56511892375',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/aditif-solar-diesel-nanodiesel-paket-3-botol-boost-performa-mesin-lubrikasi-maksimal-mesin-awet-1735997067861460794',
  },
  'nano-diesel-6-botol-6x70ml': {
    id: 'Nano Diesel 6 Botol (6x70ml)',
    title: '5 Botol Gratis 1 Botol',
    subtitle: 'Nano Diesel 70ml (Paket Hemat 6 Botol) — Aditif Solar Premium untuk Perlindungan Mesin dan Performa Optimal',
    price: 'Rp 350.000',
    description: 'Paket ekonomis untuk pemakaian rutin. Ideal untuk armada kecil atau stok bulanan kendaraan diesel Anda.',
    image: '/images/product/product-image-3.webp',
    sections: [
      {
        heading: 'Cocok Digunakan Untuk',
        body: [
          'Semua jenis mobil diesel',
          'Truk & kendaraan logistik',
          'Alat berat',
        ],
      },
      {
        heading: 'Keunggulan Nanodiesel',
        body: [
          'Teknologi nanopartikel ramah lingkungan berbasis karbon',
        ],
      },
      {
        heading: 'Manfaat Penggunaan',
        body: [
          'Menaikan angkat Cetane',
          'Konsumsi bahan bakar mesin lebih hemat',
          'Tarikan mesin lebih responsif',
          'Mesin lebih halus',
          'Membantu memperpanjang umur mesin',
          'Biaya operasional lebih efisien',
        ],
      },
      {
        heading: 'Cara Kerja Nanodiesel',
        body: [
          'Meningkatkan penguapan bahan bakar',
          'Membantu proses pembakaran lebih merata',
          'Menjaga nyala pembakaran lebih stabil',
          'Mendukung sistem pelumasan modern',
        ],
      },
      {
        heading: 'Cara Pakai',
        body: [
          '1 mL Nanodiesel dicampurkan untuk 1 Liter Solar atau Biosolar',
          '1 botol Nanodiesel 70 mL untuk pencampuran Full tanki bahan bakar mobil diesel kapasitas 70 L',
        ],
      },
      {
        heading: 'Isi & Ukuran',
        body: [
          'Isi : 5 botol GRATIS 1',
          'Ukuran : 70 ml/botol',
        ],
      },
      {
        heading: 'Hasil Pengujian Performa',
        body: [
          'Peningkatan efisiensi & kualitas pelumasan',
          'Penurunan hidrokarbon tidak terbakar (HC) hingga >99%',
          'Peningkatan tenaga maksimum',
          'Peningkatan torsi maksimum',
          'Pembakaran lebih bersih & efisien',
        ],
      },
      {
        heading: 'Kenapa Pilih Nano Diesel?',
        body: [
          'Teknologi telah diuji berdasarkan data dari LEMIGAS dan Mutu Agung Lestari',
          'Satu solusi untuk semua mesin diesel',
          'Performa maksimal, biaya operasional lebih rendah',
        ],
      },
      {
        heading: 'Cara Simpan',
        body: [
          'Simpan di tempat yang sejuk dan jauhkan dari jangkauan anak-anak',
        ],
      },
    ],
    faq: [
      { q: 'Apakah Nano Diesel cocok untuk mobil diesel saya?', a: 'Ya. Nano Diesel cocok untuk semua jenis mesin diesel, termasuk mobil keluarga, SUV, truk, dan alat berat yang menggunakan bahan bakar Solar, Dexlite, Pertamina Dex, maupun Biodiesel B30 hingga B100.' },
      { q: 'Berapa dosis pemakaian Nano Diesel?', a: 'Dosis pemakaian adalah 1 ml Nano Diesel untuk setiap 1 liter solar. Satu botol 70 ml cukup untuk satu kali pengisian tangki penuh (kapasitas ±70 liter).' },
      { q: 'Kapan saya bisa merasakan hasilnya?', a: 'Sebagian besar pengguna merasakan perbedaan tarikan mesin sejak pengisian pertama. Hasil optimal, seperti penurunan suara mesin dan peningkatan efisiensi BBM.' },
      { q: 'Apakah Nano Diesel sudah memiliki sertifikasi resmi?', a: 'Ya. Nano Diesel telah tersertifikasi oleh LEMIGAS dan Mutuagung Lestari, serta teruji melalui Dyno Test. Anda dapat melihat detail hasil uji kami di <a href="/teknologi-kami" class="text-emerald-600 hover:underline">Halaman Teknologi Kami</a>.' },
      { q: 'Apakah aman digunakan bersama Biodiesel B35 atau B50?', a: 'Nano Diesel dirancang khusus untuk bekerja optimal dengan Biodiesel B30 hingga B100. Formulasi Oxygenated Technology-nya membantu mengatasi masalah atomisasi dan residu karbon yang umum terjadi pada Biodiesel.' }
    ],
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Hemat-Operasional-Diesel-PAKET-5-Botol-1-70-ml-Adtif-Solar-Premium-i.1822722168.55661503493',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/fleet-pack-beli-5-gratis-1-nanodiesel-70ml-untuk-mobil-diesel-truk-kendaraan-diesel-lain-1735928297609987898',
  },
  'nano-diesel-12-botol-12x70ml': {
    id: 'Nano Diesel 12 Botol (12x70ml)',
    title: '10 Botol Gratis 2 Botol',
    subtitle: 'Nano Diesel 70ml (Fleet Pack Pro 12 Botol) — Aditif Solar Premium untuk Perlindungan Mesin dan Performa Optimal',
    price: 'Rp 700.000',
    description: 'Paket super hemat untuk pemakaian jangka panjang. Solusi paling ekonomis untuk armada atau stok besar.',
    image: '/images/product/product-image-6.webp',
    sections: [
      {
        heading: 'Cocok Digunakan Untuk',
        body: [
          'Semua jenis mobil diesel',
          'Truk & kendaraan logistik',
          'Alat berat',
        ],
      },
      {
        heading: 'Keunggulan Nanodiesel',
        body: [
          'Teknologi nanopartikel ramah lingkungan berbasis karbon',
        ],
      },
      {
        heading: 'Manfaat Penggunaan',
        body: [
          'Menaikan angkat Cetane',
          'Konsumsi bahan bakar mesin lebih hemat',
          'Tarikan mesin lebih responsif',
          'Mesin lebih halus',
          'Membantu memperpanjang umur mesin',
          'Biaya operasional lebih efisien',
        ],
      },
      {
        heading: 'Cara Kerja Nanodiesel',
        body: [
          'Meningkatkan penguapan bahan bakar',
          'Membantu proses pembakaran lebih merata',
          'Menjaga nyala pembakaran lebih stabil',
          'Mendukung sistem pelumasan modern',
        ],
      },
      {
        heading: 'Cara Pakai',
        body: [
          '1 mL Nanodiesel dicampurkan untuk 1 Liter Solar atau Biosolar',
          '1 botol Nanodiesel 70 mL untuk pencampuran Full tanki bahan bakar mobil diesel kapasitas 70 L',
        ],
      },
      {
        heading: 'Isi & Ukuran',
        body: [
          'Isi : 12 botol',
          'Ukuran : 70 ml/botol',
        ],
      },
      {
        heading: 'Hasil Pengujian Performa',
        body: [
          'Peningkatan efisiensi & kualitas pelumasan',
          'Penurunan hidrokarbon tidak terbakar (HC) hingga >99%',
          'Peningkatan tenaga maksimum',
          'Peningkatan torsi maksimum',
          'Pembakaran lebih bersih & efisien',
        ],
      },
      {
        heading: 'Kenapa Pilih Nano Diesel?',
        body: [
          'Teknologi telah diuji berdasarkan data dari LEMIGAS dan Mutu Agung Lestari',
          'Satu solusi untuk semua mesin diesel',
          'Performa maksimal, biaya operasional lebih rendah',
        ],
      },
      {
        heading: 'Cara Simpan',
        body: [
          'Simpan di tempat yang sejuk dan jauhkan dari jangkauan anak-anak',
        ],
      },
    ],
    faq: [
      { q: 'Apakah Nano Diesel cocok untuk mobil diesel saya?', a: 'Ya. Nano Diesel cocok untuk semua jenis mesin diesel, termasuk mobil keluarga, SUV, truk, dan alat berat yang menggunakan bahan bakar Solar, Dexlite, Pertamina Dex, maupun Biodiesel B30 hingga B100.' },
      { q: 'Berapa dosis pemakaian Nano Diesel?', a: 'Dosis pemakaian adalah 1 ml Nano Diesel untuk setiap 1 liter solar. Satu botol 70 ml cukup untuk satu kali pengisian tangki penuh (kapasitas ±70 liter).' },
      { q: 'Kapan saya bisa merasakan hasilnya?', a: 'Sebagian besar pengguna merasakan perbedaan tarikan mesin sejak pengisian pertama. Hasil optimal, seperti penurunan suara mesin dan peningkatan efisiensi BBM.' },
      { q: 'Apakah Nano Diesel sudah memiliki sertifikasi resmi?', a: 'Ya. Nano Diesel telah tersertifikasi oleh LEMIGAS dan Mutuagung Lestari, serta teruji melalui Dyno Test. Anda dapat melihat detail hasil uji kami di <a href="/teknologi-kami" class="text-emerald-600 hover:underline">Halaman Teknologi Kami</a>.' },
      { q: 'Apakah aman digunakan bersama Biodiesel B35 atau B50?', a: 'Nano Diesel dirancang khusus untuk bekerja optimal dengan Biodiesel B30 hingga B100. Formulasi Oxygenated Technology-nya membantu mengatasi masalah atomisasi dan residu karbon yang umum terjadi pada Biodiesel.' }
    ],
    shopee: 'https://shopee.co.id/Aditif-Solar-Nanodiesel-Fleet-Pack-Pro-70ml-Paket-Hemat-Operasional-Diesel-10-2-Aditif-Solar-Premium-i.1822722168.51361706484',
    tokopedia: 'https://www.tokopedia.com/nanodiesel/beli-10-gratis-2-nanodiesel-fleet-pack-pro-70ml-paket-hemat-operasional-diesel-1735928328344602426',
  },
};

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}

export function getAllSlugs(): string[] {
  return Object.keys(productDetails);
}

export default productDetails;
