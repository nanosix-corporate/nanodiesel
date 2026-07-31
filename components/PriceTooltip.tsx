'use client';

import { useState, useRef, useEffect } from 'react';

interface PriceTooltipProps {
  /** Ukuran ikon dalam pixel (default: 14) */
  size?: number;
}

export function PriceTooltip({ size = 14 }: PriceTooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Tutup tooltip saat klik di luar (mobile & desktop)
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center flex-shrink-0"
      // Pastikan tooltip tidak terpotong oleh overflow parent
      style={{ verticalAlign: 'middle' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Ikon ⓘ */}
      <button
        type="button"
        aria-label="Informasi harga"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center rounded-full text-olive-400 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex-shrink-0"
        style={{ width: size + 4, height: size + 4 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>

      {/* Tooltip bubble — menggunakan fixed positioning via portal agar tidak terpotong overflow */}
      {open && (
        <span
          role="tooltip"
          className="absolute z-[9999] bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2"
          style={{
            // Reset whitespace agar tidak diwarisi dari parent whitespace-nowrap
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          {/* Bubble */}
          <span
            className="block w-56 rounded-xl bg-brand-dark text-white text-[11.5px] leading-relaxed font-normal px-3.5 py-3 shadow-2xl"
            style={{ whiteSpace: 'normal' }}
          >
            Harga referensi. Harga aktual dapat berbeda di tiap marketplace sesuai promo &amp; kebijakan platform.
          </span>
          {/* Panah ke bawah */}
          <span
            className="block mx-auto"
            style={{
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '7px solid #1b201c', // brand-dark
            }}
          />
        </span>
      )}
    </span>
  );
}
