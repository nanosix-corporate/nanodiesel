// lib/industri-data.ts
// Data layer terpusat untuk halaman Industri — mengikuti pola lib/product-details.ts

export interface IndustriData {
  slug: string;
  name: string;
  emoji: string;
  icon: string; // Material Symbols Outlined icon name
  keyword: string;
  headline: string;
  subheadline: string;
  bodyCopy: string;
  painPoints: string[];
  cta: string;
  equipmentCategories: Record<string, string[]>;
  keywords?: string[];
  metaDescription?: string;
}

const industriList: IndustriData[] = [
  {
    slug: 'pertambangan',
    name: 'Pertambangan',
    emoji: '🪨',
    icon: 'construction',
    keyword: 'aditif solar pertambangan',
    headline: 'Operasional 24 Jam Tidak Kenal Kompromi. Bahan Bakarnya Juga Harus Begitu.',
    subheadline:
      'Alat berat tambang mengonsumsi ratusan liter solar per hari. Di era Biosolar B50, setiap liter yang tidak terbakar sempurna adalah biaya yang bocor diam-diam.',
    bodyCopy:
      'Operasional tambang tidak berjalan dalam kondisi ideal. Excavator, dump truck, dan dozer bekerja dalam siklus berat — beban penuh, suhu ekstrem, idle panjang — selama puluhan jam tanpa henti.\n\nMasalah yang paling sering diabaikan justru bukan di mesin — tapi di tangki.\n\nSolar industri menempuh perjalanan panjang sebelum sampai ke unit mesin: dari kilang, ke depot, ke truk tangki, ke tangki penampungan lapangan. Di setiap titik perpindahan, ada potensi kontaminasi air, oksidasi, dan pertumbuhan mikroba. Solar yang tiba di lokasi tambang tidak selalu dalam kondisi yang sama dengan saat keluar dari kilang — dan di industri ini, kondisi itu dikenal sebagai solar busuk.\n\nKerugiannya berlapis: bahan bakar yang dibeli dengan harga penuh tidak terbakar optimal, injektor menanggung deposit yang seharusnya tidak ada, dan konsumsi solar merayap naik tanpa penyebab yang jelas.\n\nNano Diesel bekerja di dalam bahan bakar sebelum solar masuk ke sistem injeksi — menstabilkan dari oksidasi, memecah kandungan air, dan membersihkan deposit secara bertahap. Solar yang Anda beli benar-benar terbakar — bukan terbuang sebagai asap atau endapan.',
    painPoints: [
      'Injektor kotor → konsumsi solar naik tanpa tambah beban',
      'Tangki depot lapangan → risiko kontaminasi air & bio-sludge tinggi',
      'Downtime alat berat → biaya yang jauh lebih besar dari harga aditif',
    ],
    cta: 'Konsultasikan kebutuhan armada tambang Anda',
    keywords: [
      'aditif solar pertambangan',
      'fuel additive alat berat tambang',
      'aditif solar alat berat',
      'solar busuk tambang',
      'aditif solar excavator',
      'fuel treatment tambang batubara',
    ],
    metaDescription:
      'Butuh aditif solar pertambangan? Nano Diesel adalah fuel additive alat berat tambang, excavator & bulldozer. Solusi ampuh atasi solar busuk tambang.',
    equipmentCategories: {
      'Alat Berat Tambang': [
        'Excavator (Komatsu PC200, PC300, Hitachi ZX200, CAT 320)',
        'Dump Truck Tambang (Komatsu HD785, CAT 777, Rigid Dumper)',
        'Bulldozer (Komatsu D85, D155, CAT D6, D8)',
        'Motor Grader (CAT 140, Komatsu GD555)',
        'Wheel Loader (Komatsu WA380, CAT 966)',
        'Articulated Dump Truck / ADT (Volvo A40, Bell B30)',
      ],
      'Armada Pendukung Tambang': [
        'Truk Tangki Bahan Bakar (Fuel Truck / Lube Truck)',
        'Truk Service & Maintenance Lapangan',
        'Light Vehicle Tambang (Toyota Land Cruiser 70 Series, Hilux 4x4 diesel)',
        'Bus Antar-Jemput Karyawan (Hino, Mercedes-Benz)',
        'Ambulans Tambang',
      ],
      'Power & Utilities': [
        'Genset Stasioner Kapasitas Besar (500 kVA–2.000 kVA)',
        'Genset Mobile / Trailer-mounted',
        'Pompa Air Tambang (Diesel Pump)',
        'Kompresor Udara Diesel',
      ],
    },
  },
  {
    slug: 'perkebunan',
    name: 'Perkebunan',
    emoji: '🌴',
    icon: 'forest',
    keyword: 'aditif solar perkebunan',
    headline:
      'Dari Traktor sampai Genset Pabrik — Satu Solusi untuk Seluruh Rantai Operasional Kebun.',
    subheadline:
      'Kebun sawit dan kebun karet beroperasi jauh dari bengkel terdekat. Kerusakan injektor di tengah musim panen bukan hanya masalah mesin — itu masalah jadwal.',
    bodyCopy:
      'Operasional perkebunan skala besar melibatkan banyak mesin diesel yang harus bekerja serentak — traktor lahan, harvester, truk angkut TBS, hingga genset pabrik pengolahan — semuanya bergantung pada satu sumber: tangki depot solar di lokasi.\n\nTangki depot itu sering kali diisi seminggu sekali atau lebih jarang. Solar yang tersimpan terpapar panas terik siang dan kelembaban tinggi malam hari — siklus yang mempercepat oksidasi, membentuk gum dan sedimen, serta membuka celah bagi pertumbuhan mikroba.\n\nSolar yang sudah terdegradasi tidak terlihat berbeda dari luar — tapi injektor merasakan perbedaannya. Di lokasi yang jauh dari bengkel, gejala kecil bisa berujung pada downtime yang mahal tepat di tengah musim panen yang tidak bisa ditunda.\n\nNano Diesel bekerja langsung di tangki depot maupun tangki unit mesin — memperlambat degradasi selama penyimpanan, menghambat mikroba, dan menjaga kebersihan jalur bahan bakar di seluruh unit. Satu solusi yang bekerja konsisten di semua mesin dalam operasional yang sama.',
    painPoints: [
      'Solar tersimpan lama di tangki depot lapangan → oksidasi & bio-sludge',
      'Jauh dari bengkel → downtime mahal, biaya mobilisasi tinggi',
      'Beragam mesin dalam satu operasional → butuh solusi yang kompatibel universal',
    ],
    cta: 'Diskusikan program aditif untuk kebun Anda',
    keywords: [
      'aditif solar perkebunan sawit',
      'aditif solar perkebunan',
      'fuel treatment alat berat perkebunan',
      'aditif solar traktor pertanian',
      'solar depot perkebunan',
    ],
    metaDescription:
      'Aditif solar perkebunan sawit & fuel treatment alat berat perkebunan. Solusi aditif solar traktor pertanian & stabilisator solar depot perkebunan.',
    equipmentCategories: {
      'Mesin Lahan & Panen': [
        'Traktor Roda 4 (Kubota M series, John Deere 5 series, New Holland)',
        'Traktor Roda 2 / Hand Tractor (Yanmar, Kubota)',
        'Combine Harvester Padi (Yanmar, Kubota DC series)',
        'Harvester Sawit (self-propelled, skid-steer)',
        'Mini Excavator untuk Land Clearing (Kubota KX, Yanmar ViO)',
      ],
      'Angkutan Kebun': [
        'Truk Angkut TBS / Getah (Mitsubishi Colt Diesel, Isuzu ELF, Hino 130 series)',
        'Pick Up Diesel (Mitsubishi L300, Isuzu Traga, Daihatsu Gran Max)',
        'Traktor + Trailer angkut hasil panen',
      ],
      'Pengolahan & Pabrik': [
        'Genset Pabrik Kelapa Sawit / PKS (250 kVA–1.000 kVA)',
        'Genset Pabrik Karet, Teh, Kakao',
        'Forklift Diesel (Toyota, Crown, Mitsubishi FD series)',
        'Pompa Irigasi Diesel',
      ],
    },
  },
  {
    slug: 'transportasi',
    name: 'Transportasi & Logistik',
    emoji: '🚛',
    icon: 'local_shipping',
    keyword: 'aditif solar armada truk',
    headline: 'Setiap Kilometer yang Boros Adalah Margin yang Hilang.',
    subheadline:
      'Armada truk ekspedisi dan distribusi beroperasi dengan margin tipis. Di era Biosolar B50, biaya tersembunyi dari filter buntu dan injektor kotor bisa menggerus keuntungan sebelum terdeteksi.',
    bodyCopy:
      'Di industri logistik, margin keuntungan ditentukan oleh kecepatan pengiriman dan efisiensi biaya operasional — keduanya bergantung langsung pada kondisi armada di jalan.\n\nTruk ekspedisi mengisi solar dari SPBU yang berbeda-beda di setiap kota. Armada distribusi last-mile berhenti dan jalan puluhan kali sehari. Tidak ada kontrol atas kualitas bahan bakar yang masuk ke tangki — sementara mesin harus bekerja dengan standar yang sama setiap harinya.\n\nFilter yang diganti lebih cepat dari jadwal terasa seperti biaya kecil — sampai dikalikan jumlah unit dalam setahun. Injektor yang mulai berdeposit tidak langsung rusak, tapi konsumsi solar per kilometer perlahan naik tanpa penyebab yang teridentifikasi. Dalam operasional armada skala besar, "perlahan naik" adalah kerugian nyata yang baru terasa di akhir bulan.\n\nNano Diesel digunakan sebagai bagian dari SOP armada — dicampurkan setiap kali pengisian, di setiap unit, secara konsisten. Menjaga kebersihan injektor sebelum deposit terbentuk dan menstabilkan kualitas solar dari berbagai sumber pengisian. Konsistensi performa armada adalah aset. Nano Diesel menjaganya.',
    painPoints: [
      'Operasional stop-and-go (distribusi) → deposit injektor lebih cepat terbentuk',
      'Jarak tempuh tinggi (ekspedisi) → interval perawatan harus efisien',
      'Banyak unit → biaya perawatan harus bisa distandarisasi',
    ],
    cta: 'Mulai program aditif untuk armada Anda',
    keywords: [
      'aditif solar armada truk',
      'fuel treatment armada logistik',
      'aditif solar ekspedisi',
      'penghemat solar truk',
      'aditif solar distribusi',
      'fuel additive truk diesel',
    ],
    metaDescription:
      'Aditif solar armada truk ekspedisi & logistik. Fuel treatment armada logistik & penghemat solar truk diesel untuk efisiensi biaya operasional.',
    equipmentCategories: {
      'Truk Ekspedisi & Kargo': [
        'Truk Tronton (Hino 500 series, Isuzu Giga, Mitsubishi Fuso Super Great)',
        'Truk Engkel / Colt Diesel (Mitsubishi Colt Diesel 100PS, 120PS)',
        'Truk Kontainer / Semi Trailer (Volvo FH, Scania R series, Mercedes-Benz Actros)',
        'Truk Box Ekspedisi (Isuzu ELF NMR, Hino Dutro)',
        'Truk Tangki (BBM, CPO, Kimia Cair)',
        'Truk Flatbed / Low Bed (angkut alat berat)',
      ],
      'Distribusi Last-Mile': [
        'Pick Up Diesel (Mitsubishi L300, Isuzu Traga, Gran Max Pick Up)',
        'Minibus / Blind Van Diesel (angkut paket & FMCG)',
        'Motor Roda Tiga Diesel (Viar, Kaisar — untuk distribusi pelosok)',
      ],
      'Bus & Transportasi Penumpang': [
        'Bus Antarkota (Hino RK, RM series; Scania K; Mercedes-Benz OH)',
        'Bus Pariwisata (Isuzu NQR, Hino R260)',
        'Bus Kota / Trans (Zhong Tong, Yutong, King Long — berbahan bakar diesel)',
        'Microbus (Isuzu Elf Microbus, Mitsubishi L300 Minibus)',
      ],
    },
  },
  {
    slug: 'kapal',
    name: 'Marine & Kapal',
    emoji: '⚓',
    icon: 'anchor',
    keyword: 'aditif solar kapal',
    headline: 'Di Tengah Laut, Tidak Ada Bengkel. Mesin Harus Bisa Diandalkan Sepenuhnya.',
    subheadline:
      'Kapal perikanan, tongkang, ferry, dan tugboat beroperasi jauh dari infrastruktur darat. Kualitas bahan bakar yang buruk bukan hanya masalah efisiensi — itu masalah keselamatan.',
    bodyCopy:
      'Kapal tidak bisa berhenti di pinggir jalan. Ketika mesin bermasalah di tengah pelayaran, tidak ada opsi untuk menepi. Keandalan mesin bukan sekadar faktor efisiensi — ini faktor keselamatan.\n\nKapal industri menggunakan Marine Gas Oil atau Marine Fuel Oil dari supplier bunker. Kualitas antarsupplier tidak selalu identik, dan bahan bakar yang sudah masuk ke tangki bisa tersimpan berminggu-minggu sebelum habis. Selama itu, kelembaban udara laut mempercepat masuknya uap air ke tangki, memicu pertumbuhan mikroba yang menghasilkan bio-sludge — menyumbat filter dan merusak nozzle injektor.\n\nKapal nelayan menghadapi masalah berbeda: solar subsidi di pelabuhan kecil sering kali sudah terkontaminasi sebelum masuk ke tangki kapal.\n\nNano Diesel bekerja di dalam tangki bahan bakar kapal — menstabilkan dari oksidasi, menghambat mikroba, dan membersihkan sistem injeksi secara bertahap. Hasilnya adalah mesin yang responsif, konsumsi yang terprediksi, dan perawatan yang bisa direncanakan — bukan dipaksakan oleh kerusakan mendadak di tengah laut.',
    painPoints: [
      'Tangki kapal sulit dikuras → akumulasi air dan bio-sludge',
      'Tidak ada akses bengkel di laut → keandalan mesin adalah prioritas mutlak',
      'Solar kualitas rendah di pelabuhan terpencil → butuh perlindungan tambahan',
    ],
    cta: 'Konsultasikan kebutuhan armada kapal Anda',
    keywords: [
      'aditif solar kapal',
      'fuel treatment marine diesel',
      'aditif marine gas oil',
      'fuel additive kapal nelayan',
      'aditif solar kapal tongkang',
      'marine fuel additive Indonesia',
    ],
    metaDescription:
      'Aditif solar kapal & marine gas oil (MGO). Fuel treatment marine diesel & aditif solar kapal tongkang & nelayan untuk performa mesin kapal handal.',
    equipmentCategories: {
      'Kapal Penumpang & Feri': [
        'Kapal Feri Ro-Ro (mesin MAN, Caterpillar, Mitsubishi Marine)',
        'Kapal Penumpang Antarpulau',
        'Speed Boat Penumpang (mesin outboard/inboard diesel)',
      ],
      'Kapal Industri & Logistik': [
        'Kapal Tongkang / Barge (angkut batu bara, CPO, semen)',
        'Tugboat / Kapal Tunda',
        'Kapal Tanker (BBM, CPO, Kimia)',
        'Kapal Kontainer Feeder',
        'Kapal Kargo Umum / General Cargo',
      ],
      'Kapal Perikanan & Kerja': [
        'Kapal Ikan (5–30 GT, mesin Yanmar, Mitsubishi Marine, Dongfeng)',
        'Kapal Patroli (mesin Caterpillar, Yanmar)',
        'Kapal Keruk / Dredger',
        'Kapal Survey & Riset',
      ],
      'Peralatan Pendukung Marine': [
        'Genset Kapal (Auxiliary Engine)',
        'Pompa Bilge Diesel',
        'Crane Kapal (Deck Crane, mesin diesel)',
      ],
    },
  },
  {
    slug: 'genset',
    name: 'Genset & Power Generation',
    emoji: '⚡',
    icon: 'electrical_services',
    keyword: 'aditif solar genset',
    headline: 'Listrik Tidak Boleh Mati. Mesin Genset Juga Tidak.',
    subheadline:
      'Genset adalah infrastruktur kritis — di data center, rumah sakit, pabrik, hingga tambang terpencil. Kualitas solar yang masuk ke mesin menentukan apakah genset menyala saat paling dibutuhkan.',
    bodyCopy:
      'Genset diesel adalah mesin yang paling jarang dipakai — tapi paling tidak boleh gagal saat dipakai.\n\nDi rumah sakit, genset harus menyala dalam hitungan detik. Di data center, satu detik tanpa daya bisa berarti kehilangan data bernilai miliaran. Di pabrik, genset standby adalah satu-satunya penjaga agar lini produksi tidak berhenti di tengah shift.\n\nJustru karena jarang dipakai, solar dalam tangki genset bisa tersimpan berbulan-bulan tanpa sirkulasi. Oksidasi berjalan diam-diam, menghasilkan gum, lacquer, dan sedimen. Kondensasi di dinding tangki menghasilkan air yang memicu pertumbuhan mikroba. Hasilnya: bahan bakar yang secara visual masih normal, tapi sudah terdegradasi — dan baru ketahuan saat genset dipaksa menyala di bawah beban penuh.\n\nKegagalan genset selalu terjadi di waktu yang paling tidak tepat.\n\nNano Diesel bekerja aktif selama masa standby — memperlambat oksidasi, menghambat mikroba, dan menjaga jalur bahan bakar tetap bersih. Sehingga ketika genset harus menyala, ia siap — bukan sedang berjuang melawan bahan bakarnya sendiri.',
    painPoints: [
      'Solar dalam tangki genset tersimpan lama → oksidasi dan degradasi kualitas',
      'Genset harus siap 100% saat darurat → zero tolerance untuk kegagalan start',
      'Biaya downtime listrik jauh lebih besar dari biaya perawatan',
    ],
    cta: 'Lindungi genset kritis Anda',
    keywords: [
      'aditif solar genset',
      'fuel stabilizer genset diesel',
      'fuel treatment genset standby',
      'aditif solar generator',
      'penghemat solar genset',
      'diesel fuel stabilizer genset',
    ],
    metaDescription:
      'Aditif solar genset & fuel stabilizer genset diesel standby. Solusi fuel treatment generator & penghemat solar genset kritis Anda.',
    equipmentCategories: {
      'Berdasarkan Skala': [
        'Genset Portabel / Kecil (5–30 kVA — SPBU terpencil, warung, UMKM)',
        'Genset Menengah (30–250 kVA — hotel, klinik, ruko, kantor)',
        'Genset Besar / Stasioner (250 kVA–2.000 kVA — rumah sakit, pabrik, gedung)',
        'Genset Prime Power (sumber listrik utama — daerah tanpa PLN)',
        'Genset Standby / Emergency (data center, telekomunikasi, rumah sakit)',
      ],
      'Berdasarkan Merek Mesin': [
        'Cummins (QSB, QSL, QSX series)',
        'Caterpillar (C9, C15, C18 series)',
        'Perkins (1100 series, 2000 series)',
        'Mitsubishi (S6R, S12R series)',
        'Yanmar (diesel genset 10–200 kVA)',
        'Stamford / Leroy-Somer (alternator dengan prime mover diesel)',
      ],
      'Berdasarkan Sektor Pengguna': [
        'Telekomunikasi (BTS / tower seluler — genset 10–30 kVA)',
        'Perbankan (ATM Center, Data Center Bank)',
        'Rumah Sakit & Klinik (wajib standby, regulasi BPOM/Kemenkes)',
        'Hotel & Hospitality',
        'Pertambangan & Oil & Gas (genset lapangan)',
        'Pabrik & Industri Manufaktur',
      ],
    },
  },
  {
    slug: 'konstruksi',
    name: 'Konstruksi & Alat Berat',
    emoji: '🏗️',
    icon: 'engineering',
    keyword: 'aditif alat berat diesel',
    headline: 'Proyek Tidak Bisa Menunggu. Alat Berat Juga Tidak Boleh Mogok.',
    subheadline:
      'Excavator, wheel loader, dan compactor beroperasi dalam jadwal ketat di tengah kondisi lapangan yang keras. Kerusakan mesin di tengah proyek adalah biaya yang tidak ada di anggaran.',
    bodyCopy:
      'Proyek konstruksi beroperasi dengan dua tekanan sekaligus: jadwal yang tidak fleksibel dan anggaran yang sudah dikunci. Downtime alat berat bukan sekadar masalah teknis — itu masalah finansial yang langsung mempengaruhi timeline dan potensi denda keterlambatan.\n\nTapi ada satu faktor yang sering luput dari perhatian: dari mana solar itu datang.\n\nDi lokasi konstruksi, sumber bahan bakar tidak tunggal — SPBU terdekat, tangki depot mobile di lapangan, atau kiriman dari supplier rekanan. Setiap sumber membawa kualitas berbeda. Solar dari depot mobile yang terpapar panas seharian mengalami percepatan oksidasi. Solar yang dipindahkan berkali-kali lewat selang lapangan berisiko membawa kontaminan dan air.\n\nKualitas yang tidak konsisten ini langsung dirasakan oleh komponen paling sensitif di mesin modern: sistem injeksi common rail dengan tekanan kerja hingga 2.000 bar. Penggantian satu set injektor excavator kelas menengah bisa menelan biaya puluhan juta rupiah — belum termasuk downtime dan mobilisasi teknisi ke lokasi terpencil.\n\nNano Diesel bekerja sebagai lapisan perlindungan yang konsisten di antara variabel yang tidak bisa dikontrol — menstabilkan kualitas bahan bakar dari sumber manapun sebelum mencapai sistem injeksi.',
    painPoints: [
      'Sumber solar tidak konsisten di lapangan → kualitas bahan bakar bervariasi',
      'Mesin common rail modern → sangat sensitif terhadap kualitas solar',
      'Jadwal proyek ketat → downtime berdampak pada denda keterlambatan',
    ],
    cta: 'Program aditif untuk armada konstruksi Anda',
    keywords: [
      'aditif solar alat berat konstruksi',
      'fuel additive excavator',
      'aditif solar proyek konstruksi',
      'fuel treatment alat berat',
      'aditif injektor alat berat',
      'penghemat solar alat berat',
    ],
    metaDescription:
      'Aditif solar alat berat konstruksi & proyek. Fuel additive excavator, aditif injektor alat berat, & fuel treatment alat berat modern.',
    equipmentCategories: {
      'Alat Berat Proyek': [
        'Excavator (Komatsu PC130–PC490, Hitachi ZX, CAT 320–390)',
        'Bulldozer (Komatsu D65, D155, CAT D6–D9)',
        'Wheel Loader (Komatsu WA200–WA500, CAT 950–980)',
        'Motor Grader (CAT 120–160, Komatsu GD)',
        'Compactor / Roller (Bomag, Dynapac, Sakai)',
        'Crane Crawler (Liebherr, Tadano, Kobelco)',
        'Crane Mobile (All Terrain, Tadano GR, Demag)',
        'Concrete Pump (Schwing, Putzmeister — diesel prime mover)',
        'Asphalt Finisher / Paver (Volvo P, CAT AP series)',
        'Cold Planer / Road Milling Machine',
      ],
      'Kendaraan Proyek': [
        'Dump Truck Proyek (Hino FM 260, Isuzu Giga FVZ, UD Quester)',
        'Truk Mixer Beton (Hino, Isuzu, Mitsubishi Fuso)',
        'Truk Flatbed / Low Bed (transport alat berat)',
        'Pick Up / Double Cabin Proyek (Mitsubishi Triton, Toyota Hilux, Isuzu D-Max)',
      ],
      'Mesin & Peralatan Pendukung': [
        'Genset Proyek Mobile (30–250 kVA)',
        'Kompresor Udara Diesel (Atlas Copco, Ingersoll Rand)',
        'Pompa Air Diesel (submersible & centrifugal)',
        'Light Tower Diesel (penerangan malam proyek)',
        'Jackhammer & Breaker (compressor-powered, prime mover diesel)',
      ],
    },
  },
  {
    slug: 'agribisnis',
    name: 'Agribisnis & Industri Pangan',
    emoji: '🌾',
    icon: 'agriculture',
    keyword: 'aditif solar industri pangan',
    headline: 'Mesin yang Andal, Panen yang Tepat Waktu.',
    subheadline:
      'Di industri pangan dan agribisnis, jadwal produksi tidak bisa diundur. Dari cold chain logistics hingga mesin pengolahan, diesel adalah jantung operasional.',
    bodyCopy:
      'Komoditas pangan tidak mengenal jadwal yang bisa diundur. Gabah harus segera dikeringkan setelah panen. Tebu punya jendela waktu sempit sebelum kadar gula turun. Udang tidak bisa menunggu cold storage yang generatornya bermasalah. Ketepatan waktu bukan standar pelayanan — itu kondisi minimum agar produk masih punya nilai jual.\n\nDi balik semua titik kritis itu, ada mesin diesel yang harus bekerja tanpa gagal.\n\nTantangan terbesar bukan hanya intensitas kerja mesinnya — tapi kondisi di mana solar disimpan. Tangki depot di lokasi pertanian dan pabrik pengolahan sering kali tidak mendapat perhatian yang sama dengan mesin yang menggunakannya. Solar disimpan lama, terpapar panas, dan diisi dari supplier yang kualitasnya bervariasi per pengiriman — menghasilkan solar yang terdegradasi sebelum sempat terbakar di ruang mesin.\n\nNano Diesel menjaga kualitas solar dari titik penyimpanan hingga ruang bakar — menstabilkan selama di tangki depot, menghambat mikroba, dan membersihkan sistem injeksi di seluruh unit secara bertahap. Operasional yang bisa diprediksi, bukan yang bergantung pada kondisi bahan bakar hari itu.',
    // TODO: Pain points ini perlu dikonfirmasi dengan tim sebelum go-live
    painPoints: [
      'Jadwal produksi tidak fleksibel → kerusakan mesin di musim panen berdampak langsung pada kerugian',
      'Mesin pengolah beroperasi di lingkungan lembab & berdebu → deposit injektor lebih cepat terbentuk',
      'Cold chain logistics → mesin pendingin harus beroperasi 24 jam tanpa henti, zero downtime',
    ],
    // TODO: CTA ini perlu dikonfirmasi dengan tim sebelum go-live
    cta: 'Konsultasikan kebutuhan armada agribisnis Anda',
    keywords: [
      'aditif solar industri pangan',
      'fuel treatment mesin pertanian',
      'aditif solar pabrik pengolahan',
      'aditif solar cold storage',
      'fuel additive traktor pertanian',
    ],
    metaDescription:
      'Aditif solar industri pangan, cold storage & pabrik pengolahan. Fuel treatment mesin & aditif traktor pertanian agar panen tepat waktu.',
    equipmentCategories: {
      'Mesin Produksi & Pengolahan': [
        'Mesin Giling Padi / Rice Mill (prime mover diesel)',
        'Mesin Pengering Gabah (dryer berbahan bakar diesel)',
        'Mesin Pengolah Tebu (pabrik gula — turbin uap + generator diesel)',
        'Mesin Pengolah Kopi (huller, pulper — diesel)',
        'Mesin Pengolah Tepung (wheat mill — diesel genset backup)',
      ],
      'Angkutan & Cold Chain': [
        'Truk Refrigerated / Reefer (Isuzu ELF Freezer, Mitsubishi Colt Diesel Freezer)',
        'Container Reefer (pendingin mandiri berbahan bakar diesel)',
        'Forklift Diesel Gudang (Toyota FD, Crown, Yale)',
        'Truk Distribusi Produk Pangan (FMCG, frozen food, minuman)',
      ],
      'Irigasi & Pertanian': [
        'Pompa Irigasi Diesel (Kubota, Yanmar, Honda — 5–30 HP)',
        'Traktor Multifungsi (bajak, tanam, semprot)',
        'Drone Agriculture Support Vehicle (kendaraan diesel untuk logistik lapangan)',
        'Genset Kandang Ternak & Cold Storage (ayam, sapi, udang)',
      ],
    },
  },
  {
    slug: 'solar-industri',
    name: 'Solar Industri',
    emoji: '⛽',
    icon: 'oil_barrel',
    keyword: 'aditif solar industri BBM depot tangki',
    headline: 'Jaga Kualitas Solar dari Tangki Anda. Jaga Kepercayaan Klien Anda.',
    subheadline:
      'Distributor dan pemasok solar industri menanggung konsekuensi dari kualitas bahan bakar yang diterima klien — bukan hanya yang dikirim. Nano Diesel bekerja di dalam tangki penyimpanan Anda untuk mencegah degradasi sebelum terjadi, sehingga solar yang sampai ke penerima konsisten kualitasnya — dan nama Anda terlindungi.',
    bodyCopy:
      'Solar industri dijual dengan harga tinggi — dan perusahaan penerima membelinya dengan ekspektasi kualitas yang sepadan. Tapi antara kilang dan tangki mesin penerima, ada perjalanan panjang yang tidak selalu ramah terhadap kualitas bahan bakar.\n\nTangki penyimpanan besar adalah titik paling rentan. Oksidasi berjalan diam-diam selama penyimpanan, mengubah solar menjadi gum dan lacquer. Kondensasi di dinding tangki menghasilkan air di dasar — media ideal bagi bakteri dan jamur yang menghasilkan bio-sludge. Endapan ini ikut terbawa saat solar dipompa keluar dan akhirnya masuk ke sistem injeksi mesin penerima.\n\nHasilnya: perusahaan penerima mengalami masalah operasional dari solar yang mereka beli dengan harga penuh. Bagi distributor, ini bukan hanya masalah teknis — ini masalah reputasi. Keluhan kualitas dari klien tidak hanya membawa biaya klaim, tapi mempertaruhkan kepercayaan dan kontrak berikutnya.\n\nNano Diesel ditambahkan langsung ke tangki penyimpanan atau sistem distribusi sebelum solar dikirim. Memperlambat oksidasi, menghambat mikroba, dan memecah kandungan air — sehingga solar yang sampai ke penerima dalam kondisi yang konsisten dan terlindungi. Bagi distributor, ini investasi dalam kualitas produk yang dikirimkan dan kepercayaan klien yang menerimanya.',
    painPoints: [
      'Degradasi kualitas solar dalam tangki penyimpanan besar → mesin armada tidak optimal meski solar baru',
      'Kontaminasi air kondensasi di tangki → bio-sludge, korosi, dan pertumbuhan mikroba yang merusak sistem injeksi',
      'Endapan FAME di dasar tangki → risiko penyumbatan filter & nozzle injektor pada armada penerima',
    ],
    cta: 'Konsultasikan program aditif untuk depot solar Anda',
    keywords: [
      'aditif solar industri',
      'fuel stabilizer tangki penyimpanan',
      'supplier aditif solar industri',
      'aditif solar non subsidi',
      'fuel treatment depot solar',
      'stabilizer solar industri bulk',
    ],
    metaDescription:
      'Supplier aditif solar industri & non-subsidi. Fuel stabilizer tangki penyimpanan & depot solar bulk untuk stabilitas mutu bahan bakar.',
    equipmentCategories: {
      'Depot \u0026 Penyimpanan BBM': [
        'Tangki Timbun Solar Industri (10.000–100.000 liter)',
        'Tangki Fuel Farm Bandara \u0026 Pelabuhan',
        'Tangki Mobile Penyaluran (Fuel Bowser)',
        'Sistem Perpipaan \u0026 Pompa Transfer BBM',
        'Tangki ISO Container BBM',
      ],
      'Distribusi \u0026 Penyaluran': [
        'Truk Tangki BBM (Pertamina, Vivo, Shell, PO distribusi independen)',
        'Kapal Tanker BBM Sungai \u0026 Pesisir',
        'Armada Fuel Truck Industri (pertambangan, perkebunan)',
        'Fuel Dispenser Sistem SPBU Industri',
      ],
      'Peralatan Pendukung Operasional': [
        'Pompa Sentrifugal Transfer Solar (3–20 HP)',
        'Genset Operasional Depot (200–1.000 kVA)',
        'Kompresor Udara Diesel untuk Sistem Pneumatik',
        'Kendaraan Operasional Depot (forklift, pickup, truk servis)',
      ],
    },
  },
];

export function getIndustriBySlug(slug: string): IndustriData | undefined {
  return industriList.find((i) => i.slug === slug);
}

export function getAllIndustriSlugs(): string[] {
  return industriList.map((i) => i.slug);
}

export { industriList };
export default industriList;
