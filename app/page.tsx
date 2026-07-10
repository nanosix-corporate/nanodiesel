import { generateSeoMetadata } from '../lib/seo';
import HomeContent from '../components/HomeContent';

export const metadata = generateSeoMetadata({
  title: 'Penghemat Solar Diesel Terbukti | Nano Diesel — Aditif BBM Nanotech',
  description: 'Nano Diesel meningkatkan efisiensi solar diesel hingga 15%, mengurangi asap hitam, dan membersihkan injektor. Cocok untuk B35, B40, Dexlite, dan HSD.',
  path: '',
});

export default function HomePage() {
  return <HomeContent />;
}
