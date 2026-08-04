import Link from 'next/link';

export default function IndustriNotFound() {
  return (
    <main className="pt-[72px] min-h-screen flex items-center justify-center px-6 bg-olive-50">
      <div className="text-center max-w-md">
        <span className="material-symbols-outlined text-emerald-500 text-6xl mb-6 block">
          factory
        </span>
        <h1 className="text-3xl font-headline font-black text-brand-dark mb-4">
          Segmen Industri Tidak Ditemukan
        </h1>
        <p className="text-base text-brand-copy leading-relaxed mb-8">
          Halaman industri yang Anda cari tidak tersedia. Kembali ke halaman
          Industri untuk melihat semua segmen yang tersedia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/industri"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all text-sm"
          >
            <span className="material-symbols-outlined text-[1em]">arrow_back</span>
            Kembali ke Industri
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white hover:bg-olive-50 text-brand-dark border border-olive-300 font-bold py-3 px-6 rounded-full transition-all text-sm"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
