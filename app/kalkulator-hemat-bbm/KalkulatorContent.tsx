'use client';

import { useState } from 'react';
import Link from 'next/link';

// ────────────────────────────────────────────────────────────
// Types & Utilities
// ────────────────────────────────────────────────────────────
interface CalcResult {
  savingPercent: number;
  monthlyLiter: number;
  monthlySpend: number;
  savingPerMonth: number;
  bottlesNeeded: number;
}

const ADDITIVE_PRICE = 70000;  // Rp per botol 70ml
const ADDITIVE_COVERAGE = 60;  // liter per botol (spec Nano Diesel)

function calculate(literPerMonth: number, solarPrice: number, vehicleType: string): CalcResult {
  const savingMap: Record<string, number> = {
    'suv': 12,
    'pickup': 14,
    'truk': 15,
    'bus': 13,
    'alat-berat': 10,
    'genset': 11,
  };
  const savingPercent = savingMap[vehicleType] ?? 12;
  const monthlySpend = literPerMonth * solarPrice;
  const savingPerMonth = monthlySpend * (savingPercent / 100);
  const bottlesNeeded = Math.ceil(literPerMonth / ADDITIVE_COVERAGE);

  return {
    savingPercent,
    monthlyLiter: literPerMonth,
    monthlySpend,
    savingPerMonth,
    bottlesNeeded,
  };
}

function formatRp(n: number) {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

// ────────────────────────────────────────────────────────────
// Estimasi Penghematan Biaya Servis (amortisasi bulanan)
//
// Angka dihitung berdasarkan biaya nyata komponen × interval
// penggantian wajar, dibagi ke dalam satuan bulan:
//
//   Filter Solar        → ganti tiap  6 bulan
//   Servis Injektor     → tiap 24 bulan
//   Glow Plug Set       → tiap 36 bulan
//   Overhaul Pompa Injeksi → tiap 60 bulan
//
// Estimasi harga bengkel Jabodetabek 2025, sudah termasuk jasa.
// ────────────────────────────────────────────────────────────
interface MaintenanceItem {
  label: string;
  cost: number;     // harga satuan (Rp)
  interval: number; // interval penggantian (bulan)
}

const maintenanceData: Record<string, MaintenanceItem[]> = {
  'suv': [
    { label: 'Ganti Filter Solar', cost: 200000, interval: 6 },
    { label: 'Servis/Bersihkan Injektor', cost: 350000, interval: 24 },
    { label: 'Ganti Set Glow Plug', cost: 700000, interval: 36 },
    { label: 'Overhaul Pompa Injeksi', cost: 2500000, interval: 60 },
  ],
  'pickup': [
    { label: 'Ganti Filter Solar', cost: 300000, interval: 6 },
    { label: 'Servis/Bersihkan Injektor', cost: 500000, interval: 24 },
    { label: 'Ganti Set Glow Plug', cost: 1000000, interval: 36 },
    { label: 'Overhaul Pompa Injeksi', cost: 3500000, interval: 60 },
  ],
  'truk': [
    { label: 'Ganti Filter Solar', cost: 600000, interval: 6 },
    { label: 'Servis/Bersihkan Injektor', cost: 1200000, interval: 24 },
    { label: 'Ganti Set Glow Plug', cost: 2200000, interval: 36 },
    { label: 'Overhaul Pompa Injeksi', cost: 7000000, interval: 60 },
  ],
  'bus': [
    { label: 'Ganti Filter Solar', cost: 500000, interval: 6 },
    { label: 'Servis/Bersihkan Injektor', cost: 1000000, interval: 24 },
    { label: 'Ganti Set Glow Plug', cost: 1800000, interval: 36 },
    { label: 'Overhaul Pompa Injeksi', cost: 6000000, interval: 60 },
  ],
  'alat-berat': [
    { label: 'Ganti Filter Solar', cost: 800000, interval: 6 },
    { label: 'Servis/Bersihkan Injektor', cost: 1500000, interval: 24 },
    { label: 'Ganti Set Glow Plug', cost: 3500000, interval: 36 },
    { label: 'Overhaul Pompa Injeksi', cost: 10000000, interval: 60 },
  ],
  'genset': [
    { label: 'Ganti Filter Solar', cost: 350000, interval: 6 },
    { label: 'Servis/Bersihkan Injektor', cost: 800000, interval: 24 },
    { label: 'Ganti Set Glow Plug', cost: 1400000, interval: 36 },
    { label: 'Overhaul Pompa Injeksi', cost: 4000000, interval: 60 },
  ],
};

function getMonthlyRepairAvoidance(vehicleType: string): number {
  const items = maintenanceData[vehicleType] ?? maintenanceData['suv'];
  return items.reduce((sum, item) => sum + item.cost / item.interval, 0);
}

// ────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────
export default function KalkulatorContent() {
  const [liter, setLiter] = useState('100');
  const [price, setPrice] = useState('9000');
  const [vehicle, setVehicle] = useState('suv');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showRepairDetail, setShowRepairDetail] = useState(false);

  const handleCalc = () => {
    const l = parseFloat(liter);
    const p = parseFloat(price);
    if (!l || !p || l <= 0 || p <= 0) return;
    setResult(calculate(l, p, vehicle));
    setHasCalculated(true);
  };

  const handleInputChange = (
    setter: (v: string) => void,
    otherLiter?: string,
    otherPrice?: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (hasCalculated) {
      const l = parseFloat(setter === setLiter ? e.target.value : (otherLiter ?? liter));
      const p = parseFloat(setter === setPrice ? e.target.value : (otherPrice ?? price));
      if (l > 0 && p > 0) setResult(calculate(l, p, vehicle));
    }
  };

  const handleVehicleChange = (v: string) => {
    setVehicle(v);
    setShowRepairDetail(false);
    if (hasCalculated) {
      const l = parseFloat(liter);
      const p = parseFloat(price);
      if (l > 0 && p > 0) setResult(calculate(l, p, v));
    }
  };

  const vehicleOptions = [
    { value: 'suv', label: 'SUV / Kendaraan Pribadi', icon: 'directions_car' },
    { value: 'pickup', label: 'Pickup / Truk Ringan', icon: 'local_shipping' },
    { value: 'truk', label: 'Truk Berat / Trailer', icon: 'local_shipping' },
    { value: 'bus', label: 'Bus / Angkutan', icon: 'directions_bus' },
    { value: 'alat-berat', label: 'Alat Berat / Excavator', icon: 'agriculture' },
    { value: 'genset', label: 'Genset / Generator', icon: 'bolt' },
  ];

  const monthlyRepairSaving = getMonthlyRepairAvoidance(vehicle);
  const repairItems = maintenanceData[vehicle] ?? maintenanceData['suv'];
  const totalBenefit = result ? result.savingPerMonth + monthlyRepairSaving : 0;

  return (
    <main className="pt-[72px] min-h-screen bg-olive-50">

      {/* ── Hero ── */}
      <div className="-mt-[72px] bg-brand-white px-6 lg:px-12 pt-32 md:pt-44 pb-16 md:pb-24 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-left relative z-10">
          <div className="max-w-4xl">
            <Link
              href="/produk"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-5 transition-colors"
            >
              <span className="material-symbols-outlined text-[1.1em]">arrow_back</span>
              Kembali
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-brand-dark leading-tight mb-6">
              Kalkulator Penghemat BBM Solar
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-brand-copy mb-6 max-w-3xl leading-snug">
              Hitung penghematan nyata Anda per bulan menggunakan Nano Diesel, berbasis data uji resmi LEMIGAS.
            </p>
          </div>
        </div>
      </div>

      {/* ── Calculator ── */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-[960px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">

            {/* ── Input Panel ── */}
            <div className="bg-white rounded-3xl border border-olive-200 shadow-sm p-6 md:p-8">
              <h2 className="text-lg font-headline font-black text-brand-dark mb-6">
                Masukkan Data Konsumsi BBM Anda
              </h2>

              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-brand-dark mb-3">
                  Jenis Kendaraan / Mesin
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {vehicleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleVehicleChange(opt.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${vehicle === opt.value
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                          : 'bg-white border-olive-200 text-brand-copy hover:border-emerald-300 hover:bg-emerald-50'
                        }`}
                    >
                      <span className="material-symbols-outlined text-lg shrink-0">{opt.icon}</span>
                      <span className="leading-tight">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Liter per month */}
              <div className="mb-5">
                <label htmlFor="liter-input" className="block text-sm font-semibold text-brand-dark mb-2">
                  Konsumsi Solar per Bulan
                </label>
                <div className="relative">
                  <input
                    id="liter-input"
                    type="number"
                    value={liter}
                    onChange={handleInputChange(setLiter, undefined, price)}
                    min="1"
                    className="w-full bg-olive-50 border border-olive-200 rounded-xl px-4 py-3 pr-16 text-brand-dark font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="100"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-olive-400 pointer-events-none">
                    liter
                  </span>
                </div>
                <p className="text-xs text-olive-400 mt-1.5">
                  SUV: ~60–80 L • Truk: ~300–600 L • Alat berat: 500–1.000+ L
                </p>
              </div>

              {/* Solar price */}
              <div className="mb-7">
                <label htmlFor="price-input" className="block text-sm font-semibold text-brand-dark mb-2">
                  Harga Solar per Liter
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-olive-400 pointer-events-none">
                    Rp
                  </span>
                  <input
                    id="price-input"
                    type="number"
                    value={price}
                    onChange={handleInputChange(setPrice, liter, undefined)}
                    min="1"
                    className="w-full bg-olive-50 border border-olive-200 rounded-xl px-4 py-3 pl-12 text-brand-dark font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="9000"
                  />
                </div>
                <p className="text-xs text-olive-400 mt-1.5">
                  Bingung soal harga solar? Cek{' '}
                  <a className="underline" href="https://pertaminapatraniaga.com/page/harga-terbaru-bbm" target="_blank" rel="noopener noreferrer">
                    Harga Terbaru BBM
                  </a>{' '}
                  untuk mengetahui harga BBM di daerah kamu.
                </p>
              </div>

              <button
                id="hitung-hemat-btn"
                type="button"
                onClick={handleCalc}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-base transition-all hover:shadow-xl hover:shadow-emerald-600/25 active:scale-[0.98]"
              >
                Hitung Penghematan Saya →
              </button>
            </div>

            {/* ── Result Panel ── */}
            <div className="flex flex-col gap-4">
              {!hasCalculated ? (
                <div className="bg-white rounded-3xl border border-dashed border-olive-300 p-8 text-center flex flex-col items-center justify-center gap-4 min-h-[380px]">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">calculate</span>
                  </div>
                  <p className="text-brand-copy/50 font-medium text-sm">
                    Isi data di kiri dan klik<br />&quot;Hitung Penghematan Saya&quot;
                  </p>
                </div>
              ) : result && (
                <>
                  {/* Main Result Card */}
                  <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-600/20">
                    <p className="text-emerald-100 text-sm font-medium mb-1">Total Estimasi Manfaat per Bulan</p>
                    <div className="text-4xl md:text-5xl font-headline font-black mb-1">
                      {formatRp(totalBenefit)}
                    </div>
                    <p className="text-emerald-200 text-sm">
                      Atau <strong className="text-white">{formatRp(totalBenefit * 12)}</strong> per tahun
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-baseline gap-2">
                      <span className="text-emerald-100 text-xs">Efisiensi BBM lebih baik:</span>
                      <span className="text-white font-black text-xl">{result.savingPercent}%</span>
                    </div>
                  </div>

                  {/* Rincian Perhitungan */}
                  <div className="bg-white rounded-2xl border border-olive-200 p-5">
                    <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest mb-4">
                      Rincian Perhitungan
                    </h3>

                    <div className="space-y-0 text-sm">
                      {/* BBM rows */}
                      <div className="flex justify-between items-center py-2.5 border-b border-olive-100">
                        <span className="text-brand-copy/70">Konsumsi solar/bulan</span>
                        <span className="font-semibold text-brand-dark">{result.monthlyLiter} liter</span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-olive-100">
                        <span className="text-brand-copy/70">Pengeluaran BBM saat ini</span>
                        <span className="font-semibold text-brand-dark">{formatRp(result.monthlySpend)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-olive-200">
                        <span className="text-brand-copy/70">Estimasi hemat BBM ({result.savingPercent}%)</span>
                        <span className="font-semibold text-emerald-600">+ {formatRp(result.savingPerMonth)}</span>
                      </div>

                      {/* Divider: servis section */}
                      <div className="pt-3 pb-1">
                        <p className="text-[10px] font-bold text-brand-copy/40 uppercase tracking-widest">
                          Potensi Hemat Biaya Servis
                        </p>
                      </div>

                      {/* Repair avoidance rows */}
                      {repairItems.map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-2 border-b border-olive-50">
                          <div>
                            <span className="text-brand-copy/70">{item.label}</span>
                            <span className="text-olive-300 text-xs ml-1">(tiap {item.interval} bln)</span>
                          </div>
                          <span className="font-semibold text-amber-600 shrink-0 ml-3">
                            + {formatRp(Math.round(item.cost / item.interval))}/bln
                          </span>
                        </div>
                      ))}

                      {/* Repair subtotal */}
                      <div className="flex justify-between items-center py-2.5 border-b border-olive-200">
                        <span className="text-brand-copy/60 text-xs">Subtotal hemat biaya servis</span>
                        <span className="font-semibold text-amber-600">{formatRp(monthlyRepairSaving)}/bln</span>
                      </div>

                      {/* Grand total */}
                      <div className="flex justify-between items-center py-3 bg-emerald-50 rounded-xl px-3 mt-2">
                        <span className="font-bold text-brand-dark text-sm">Total Estimasi Manfaat/Bulan</span>
                        <span className="font-black text-base text-emerald-600">
                          {formatRp(totalBenefit)}
                        </span>
                      </div>
                    </div>

                    {/* Disclaimer inline */}
                    <div className="mt-4 pt-3 border-t border-olive-100 flex items-start gap-2">
                      <p className="text-[11px] text-brand-copy/50 leading-relaxed">
                        Estimasi hemat servis dihitung dari amortisasi biaya komponen nyata dibagi interval penggantian wajar (Jabodetabek 2025, sudah termasuk jasa). Hasil aktual bervariasi tergantung kondisi mesin dan intensitas pemakaian. Penggunaan Nano Diesel berpotensi memperpanjang umur komponen sistem bahan bakar — bukan jaminan mutlak.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/produk"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-brand-dark hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-all hover:shadow-lg"
                  >
                    Mulai Hemat — Lihat Produk Nano Diesel
                    <span className="material-symbols-outlined text-[1em]">arrow_forward_ios</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* ── Why It Works ── */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-headline font-black text-brand-dark mb-3">
                Mengapa Nano Diesel Bisa Menghemat BBM Solar?
              </h2>
              <p className="text-brand-copy/70 max-w-xl mx-auto text-sm leading-relaxed">
                Penghematan bukan sekedar klaim — ada prinsip ilmiah yang terukur di baliknya.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: 'local_fire_department',
                  title: 'Pembakaran Lebih Sempurna',
                  desc: 'Nano Diesel memperbaiki atomisasi bahan bakar — solar terbakar lebih efisien, lebih sedikit terbuang sebagai asap hitam.',
                },
                {
                  icon: 'cleaning_services',
                  title: 'Injektor Lebih Bersih',
                  desc: 'Injektor bebas deposit karbon bekerja lebih presisi, menghasilkan tenaga lebih besar dengan konsumsi BBM yang sama.',
                },
                {
                  icon: 'science',
                  title: 'Formula Khusus Biosolar',
                  desc: 'Dirancang untuk Biodiesel B30–B100. Mengurangi FAME residue dan mencegah penyumbatan filter solar prematur.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-olive-200 p-6 hover:shadow-sm transition-shadow">
                  <div className="text-emerald-600 mb-3 flex items-center">
                    <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                  </div>
                  <h3 className="font-headline font-black text-brand-dark text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-copy/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-brand-dark rounded-3xl p-8 md:p-10 text-white text-center">
              <h3 className="text-xl md:text-2xl font-headline font-black mb-3">
                Angka di Kalkulator Ini Berbasis Uji Lab Resmi
              </h3>
              <p className="text-olive-300 max-w-lg mx-auto mb-7 text-sm leading-relaxed">
                Data penghematan yang digunakan berasal dari pengujian resmi LEMIGAS
                dan PT Mutuagung Lestari — bukan klaim marketing semata.
              </p>
              <Link
                href="/bukti-uji"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-7 rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-emerald-600/25"
              >
                Lihat Bukti Uji Lengkap
                <span className="material-symbols-outlined text-[1em]">arrow_forward_ios</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
