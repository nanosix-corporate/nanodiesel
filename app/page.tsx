import { Metadata } from 'next';
import HomeContent from '../components/HomeContent';

export const metadata: Metadata = {
  title: {
    absolute: 'Penghemat Solar Diesel & Aditif Bahan Bakar Terbaik',
  },
  description: 'Cari penghemat solar diesel? Nano Diesel adalah aditif bahan bakar solar terbaik untuk performa maksimal & hemat BBM. Beli sekarang & buktikan hasilnya!',
  keywords: [
    'aditif solar terbaik',
    'aditif diesel indonesia',
    'nano diesel',
    'hemat bbm diesel',
    'oxygenated technology',
    'aditif biodiesel b35 b50',
  ],
  openGraph: {
    title: 'Penghemat Solar Diesel & Aditif Bahan Bakar Terbaik',
    description: 'Cari penghemat solar diesel? Nano Diesel adalah aditif bahan bakar solar terbaik untuk performa maksimal & hemat BBM. Beli sekarang & buktikan hasilnya!',
    url: 'https://www.nanodiesel.id',
    siteName: 'Nano Diesel',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Nano Diesel — Aditif Solar Terbaik Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nano Diesel | Aditif Solar & Diesel Treatment Terbaik Indonesia',
    description: 'Hemat BBM hingga 20%, tingkatkan tenaga mesin. Tersertifikasi LEMIGAS. Cocok untuk B30–B100.',
    site: '@nanodiesel',
  },
  alternates: {
    canonical: 'https://www.nanodiesel.id',
  },
};

export default function HomePage() {
  return <HomeContent />;
}
