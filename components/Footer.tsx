export function Footer() {
  return (
    <footer className="bg-[#121E10] border-t border-olive-800/50 text-olive-400 text-sm">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-10">
        <div className="space-y-6">
          <img src="/images/logo/nanodiesel-logo-mono-white.svg" alt="Nano Diesel" className="h-10 w-auto object-contain" />
          <p className="leading-relaxed text-white text-sm">
            Solusi Aditif Solar & Cetane Booster berteknologi nano untuk menaklukkan batasan Biodiesel B35 dan B50. Bersih, mesin bertenaga, uang terjaga.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm border-l-2 border-emerald-500 pl-3 md:border-none md:pl-0">
            Hasil Test
          </h4>
          <ul className="space-y-3 text-white">
            <li><a href="/document/hasil-test/Lemigas - Kualitas Bahan Bakar.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Lemigas - Kualitas Bahan Bakar</a></li>
            <li><a href="/document/hasil-test/Lemigas - Power, Torsi dan Emisi.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Lemigas - Power, Torsi & Emisi</a></li>
            <li><a href="/document/hasil-test/Dyno Dastek B50 - Pajero.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Dyno Dastek B50 - Pajero</a></li>
            <li><a href="/document/hasil-test/Dyno Elika B100 - Fortuner dan Pajero.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Dyno Elika B100 - Fortuner & Pajero</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm border-l-2 border-emerald-500 pl-3 md:border-none md:pl-0">
            Informasi
          </h4>
          <ul className="space-y-3 text-white">
            <li><a href="/bukti-uji" className="hover:text-emerald-400 transition-colors">Bukti Uji</a></li>
            <li><a href="/cara-pakai" className="hover:text-emerald-400 transition-colors">Cara Pakai</a></li>
            <li><a href="/faq" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
            <li><a href="/profil" className="hover:text-emerald-400 transition-colors">Profil</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm border-l-2 border-emerald-500 pl-3 md:border-none md:pl-0">
            Sosial Media & Shop
          </h4>
          <ul className="space-y-3 text-white">
            <li><a href="https://www.instagram.com/nanodiesel.official/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Instagram</a></li>
            <li><a href="https://shopee.co.id/srkhv4y1b8?originalCategoryId=11043727&page=0" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Shopee</a></li>
            <li><a href="https://www.tokopedia.com/nanodiesel" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Tokopedia</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm border-l-2 border-emerald-500 pl-3 md:border-none md:pl-0">
            Hubungi Kami
          </h4>
          <p className="leading-relaxed text-white text-sm">
            Jalan Bekasi Timur, Cipinang, Jakarta 13240, Indonesia
          </p>
          <p className="text-sm">
            <a href="tel:+622122483303" className="hover:text-emerald-400 transition-colors">+62 21 2248 3303</a>
          </p>
          <p className="text-sm">
            <a href="mailto:corporate@nanosix.net" className="hover:text-emerald-400 transition-colors">corporate@nanosix.net</a>
          </p>
        </div>
      </div>
      <div className="border-t border-olive-800/50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-olive-500">
          <p>© 2024 PT NANOSIX HIDUP SEHAT. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
