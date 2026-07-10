'use client';

import { useState } from 'react';
import Image from 'next/image';

const menu = [
  { label: 'Produk', href: '/produk' },
  { label: 'Profil', href: '/profil' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Teknologi Kami', href: '/teknologi-kami' },
  { label: 'Bukti Uji', href: '/bukti-uji' },
  { label: 'Cara Pakai', href: '/cara-pakai' },
  { label: 'FAQ', href: '/faq' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-olive-200/50 glass-panel font-manrope text-fs-nav font-semibold tracking-wide">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 nav:px-12">
        <a href="/" className="flex items-center gap-3">
          <Image src="/images/logo/nanodiesel-logo-brand.svg" alt="Nano Diesel" width={160} height={40} className="h-10 w-auto object-contain" priority />
        </a>

        <nav className="hidden nav:flex items-center gap-8 text-brand-dark">
          {menu.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-emerald-600">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="nav:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl text-brand-dark focus:outline-none"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="material-symbols-outlined text-3xl">{open ? 'close' : 'menu'}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-olive-200/50 bg-white/90 px-6 pb-6 pt-4 nav:px-8">
          <div className="flex flex-col gap-3 text-brand-dark">
            {menu.map((item) => (
              <a key={item.href} href={item.href} className="rounded-2xl bg-emerald-50 px-4 py-3 transition-colors hover:bg-emerald-100">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
