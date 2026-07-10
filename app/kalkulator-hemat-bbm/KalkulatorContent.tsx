'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ────────────────────────────────────────────────────────────
// Types & Utilities
// ────────────────────────────────────────────────────────────
interface CalcResult {
  savingPercent: number;
  monthlyLiter: number;
  monthlySpend: number;
  savingPerMonth: number;
  additiveCostPerMonth: number;
  netSavingPerMonth: number;
  netSavingPerYear: number;
  bottlesNeeded: number;
  roi: number;
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
  const additiveCostPerMonth = bottlesNeeded * ADDITIVE_PRICE;
  const netSavingPerMonth = savingPerMonth - additiveCostPerMonth;
  const netSavingPerYear = netSavingPerMonth * 12;
  const roi = additiveCostPerMonth > 0 ? (netSavingPerMonth / additiveCostPerMonth) * 100 : 0;

  return {
    savingPercent,
    monthlyLiter: literPerMonth,
    monthlySpend,
    savingPerMonth,
    additiveCostPerMonth,
    netSavingPerMonth,
    netSavingPerYear,
    bottlesNeeded,
    roi,
  };
}

function formatRp(n: number) {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
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

  const handleCalc = () => {
    const l = parseFloat(liter);
    const p = parseFloat(price);
    if (!l || !p || l <= 0 || p <= 0) return;
    setResult(calculate(l, p, vehicle));
    setHasCalculated(true);
  };

  useEffect(() => {
    if (!hasCalculated) return;
    const l = parseFloat(liter);
    const p = parseFloat(price);
    if (!l || !p || l <= 0 || p <= 0) return;
    setResult(calculate(l, p, vehicle));
  }, [liter, price, vehicle, hasCalculated]);

  const vehicleOptions = [
    { value: 'suv', label: 'SUV / Kendaraan Pribadi', icon: 'directions_car' },
    { value: 'pickup', label: 'Pickup / Truk Ringan', icon: 'local_shipping' },
    { value: 'truk', label: 'Truk Berat / Trailer', icon: 'local_shipping' },
    { value: 'bus', label: 'Bus / Angkutan', icon: 'directions_bus' },
    { value: 'alat-berat', label: 'Alat Berat / Excavator', icon: 'agriculture' },
    { value: 'genset', label: 'Genset / Generator', icon: 'bolt' },
  ];

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
        <div className="max-w-[900px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">

            {/* Input Panel */}
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
                      onClick={() => setVehicle(opt.value)}
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
                    onChange={(e) => setLiter(e.target.value)}
                    min="1"
                    className="w-full bg-olive-50 border border-olive-200 rounded-xl px-4 py-3 pr-16 text-brand-dark font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="100"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-olive-400 pointer-events-none">
                    liter
                  </span>
                </div>
                <p className="text-xs text-olive-400 mt-1.5">
                  SUV: ~60–80 L • Truk: ~300–600 L • Alat berat: 500–1.000+ L • Dapat berbeda tergantung pemakaian masing-masing
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
                    onChange={(e) => setPrice(e.target.value)}
                    min="1"
                    className="w-full bg-olive-50 border border-olive-200 rounded-xl px-4 py-3 pl-12 text-brand-dark font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    placeholder="9000"
                  />
                </div>
                <p className="text-xs text-olive-400 mt-1.5">
                  Bingung soal harga solar? Cek <a className="underline" href="https://pertaminapatraniaga.com/page/harga-terbaru-bbm" target="_blank" rel="noopener noreferrer">Harga Terbaru BBM</a> untuk mengetahui harga BBM di daerah kamu.
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

            {/* Result Panel */}
            <div className="flex flex-col gap-4">
              {!hasCalculated ? (
                <div className="bg-white rounded-3xl border border-dashed border-olive-300 p-8 text-center flex flex-col items-center justify-center gap-4 min-h-[380px]">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">calculate</span>
                  </div>
                  <p className="text-brand-copy/50 font-medium text-sm">
                    Isi data di kiri dan klik<br />"Hitung Penghematan Saya"
                  </p>
                </div>
              ) : result && (
                <>
                  {/* Main result */}
                  <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-600/20">
                    <p className="text-emerald-100 text-sm font-medium mb-1">Penghematan Bersih per Bulan</p>
                    <div className="text-4xl md:text-5xl font-headline font-black mb-1">
                      {result.netSavingPerMonth >= 0
                        ? formatRp(result.netSavingPerMonth)
                        : '—'}
                    </div>
                    {result.netSavingPerMonth >= 0 && (
                      <p className="text-emerald-200 text-sm">
                        Atau <strong className="text-white">{formatRp(result.netSavingPerYear)}</strong> per tahun
                      </p>
                    )}
                    {result.roi > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/20 flex items-baseline gap-2">
                        <span className="text-emerald-100 text-xs">Return on Investment:</span>
                        <span className="text-white font-black text-xl">{Math.round(result.roi)}%</span>
                        <span className="text-emerald-200 text-xs">/ bulan</span>
                      </div>
                    )}
                  </div>

                  {/* Breakdown */}
                  <div className="bg-white rounded-2xl border border-olive-200 p-5">
                    <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest mb-4">
                      Rincian Perhitungan
                    </h3>
                    <div className="space-y-2.5 text-sm">
                      {[
                        { label: 'Konsumsi solar/bulan', value: `${result.monthlyLiter} liter` },
                        { label: 'Pengeluaran BBM saat ini', value: formatRp(result.monthlySpend) },
                        { label: `Estimasi hemat BBM (${result.savingPercent}%)`, value: `– ${formatRp(result.savingPerMonth)}`, accent: true },
                        { label: `Biaya Nano Diesel (${result.bottlesNeeded} botol)`, value: `– ${formatRp(result.additiveCostPerMonth)}` },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-center py-2 border-b border-olive-100 last:border-0">
                          <span className="text-brand-copy/70">{row.label}</span>
                          <span className={`font-semibold ${row.accent ? 'text-emerald-600' : 'text-brand-dark'}`}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center py-2 bg-emerald-50 rounded-xl px-3 mt-2">
                        <span className="font-bold text-brand-dark text-sm">Penghematan bersih/bulan</span>
                        <span className={`font-black text-base ${result.netSavingPerMonth >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {formatRp(result.netSavingPerMonth)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-olive-400 leading-relaxed px-1">
                    *Estimasi berdasarkan data uji LEMIGAS & Mutuagung Lestari. Hasil aktual bervariasi tergantung kondisi mesin, kualitas BBM, dan gaya berkendara.
                  </p>

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
