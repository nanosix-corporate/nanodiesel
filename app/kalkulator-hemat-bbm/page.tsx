import type { Metadata } from 'next';
import KalkulatorContent from './KalkulatorContent';

export const metadata: Metadata = {
  title: 'Kalkulator Penghematan BBM Solar — Hitung Hemat Anda',
  description: 'Hitung penghematan BBM solar Anda dengan kalkulator gratis Nano Diesel. Masukkan konsumsi liter & harga solar, lihat berapa rupiah yang bisa dihemat per bulan.',
  keywords: [
    'kalkulator hemat bbm solar',
    'penghemat bbm solar',
    'hitung penghematan aditif solar',
    'aditif solar hemat bbm',
    'nano diesel kalkulator',
  ],
  alternates: { canonical: 'https://www.nanodiesel.id/kalkulator-hemat-bbm' },
  openGraph: {
    title: 'Kalkulator Penghematan BBM Solar — Hitung Hemat Anda',
    description: 'Hitung penghematan BBM solar Anda dengan kalkulator gratis Nano Diesel. Masukkan konsumsi liter & harga solar, lihat berapa rupiah yang bisa dihemat per bulan.',
    siteName: 'Nano Diesel',
  },
};

export default function KalkulatorPage() {
  return <KalkulatorContent />;
}
