'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function BackButton() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const backHref = from === 'home' ? '/' : '/produk';
  const backLabel = from === 'home' ? 'Kembali ke Beranda' : 'Kembali ke Produk';

  return (
    <Link
      href={backHref}
      className="inline-flex items-center gap-1 text-sm text-olive-500 hover:text-emerald-600 transition-colors mb-6"
    >
      <span className="material-symbols-outlined text-base">arrow_back</span>
      {backLabel}
    </Link>
  );
}
