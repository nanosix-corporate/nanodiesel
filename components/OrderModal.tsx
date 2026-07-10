'use client';

import Image from 'next/image';
interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  product?: {
    title: string;
    label?: string;
    price: string;
    shopee?: string | null;
    tokopedia?: string | null;
    wa?: string;
  };
}

export function OrderModal({ open, onClose, product }: OrderModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-[1rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-emerald-100 px-6 py-5">
          <div>
            <h3 className="text-2xl font-bold text-brand-dark">Order {product?.title ?? 'Nano Diesel'}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-brand-dark transition hover:bg-emerald-100"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-5 px-6 py-6 text-sm text-brand-copy">
          <p>
            Pilih platform belanja favorit Anda untuk mendapatkan produk <strong className="text-brand-dark">Nano Diesel</strong> secara aman dan terjamin.
          </p>
          <div className="rounded-3xl bg-olive-50 p-4">
            <p className="text-sm text-brand-dark font-semibold">Harga</p>
            <p className="mt-2 text-lg font-bold text-emerald-600">{product?.price}</p>
            <p className="text-sm text-brand-copy">{product?.label}</p>
          </div>
          <div className="grid gap-4">
            {product?.shopee && (
              <a
                href={product.shopee}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl bg-olive-900 px-4 py-4 text-white transition hover:bg-emerald-600"
              >
                <div className="flex items-center gap-3">
                  <Image src="/images/icon/shopee_icon.svg" alt="Shopee" width={24} height={24} className="object-contain" />
                  <span className="font-semibold">Beli di Shopee</span>
                </div>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            )}
            {product?.tokopedia && (
              <a
                href={product.tokopedia}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl bg-olive-900 px-4 py-4 text-white transition hover:bg-emerald-600"
              >
                <div className="flex items-center gap-3">
                  <Image src="/images/icon/tokopedia_icon.svg" alt="Tokopedia" width={24} height={24} className="object-contain" />
                  <span className="font-semibold">Beli di Tokopedia</span>
                </div>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            )}
            <a
              href={`https://wa.me/+622122483303?text=Halo%20Nano%20Diesel%2C%20saya%20ingin%20memesan%20${encodeURIComponent(product?.wa ?? 'Nano Diesel')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-emerald-600 bg-white px-4 py-4 text-brand-dark transition hover:bg-emerald-50"
            >
              <div className="flex items-center gap-3">
                <Image src="/images/icon/whatsapp_icon.svg" alt="WhatsApp" width={24} height={24} className="object-contain" />
                <span className="font-semibold">Hubungi WA</span>
              </div>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
