'use client';

import { useState } from 'react';
import { OrderModal } from './OrderModal';

interface Product {
  id: string;
  title: string;
  label?: string;
  price: string;
  shopee: string | null;
  tokopedia: string | null;
  wa: string;
}

interface ShopClientWrapperProps {
  products: Product[];
}

/**
 * Client component yang membungkus HANYA bagian interaktif dari halaman /shop:
 * - Tombol "Beli Sekarang" (membutuhkan onClick)
 * - <OrderModal> (membutuhkan useState)
 *
 * Seluruh konten produk lainnya (gambar, harga, teks) dirender di server
 * oleh ShopPage (Server Component) sehingga Googlebot dapat membacanya.
 */
export function ShopClientWrapper({ products }: ShopClientWrapperProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <>
      {/* Invisible overlay buttons that sit over each product card's "Beli Sekarang" area */}
      {products.map((product) => (
        <button
          key={product.id}
          id={`buy-btn-${product.id.toLowerCase().replace(/\s+/g, '-').replace(/[()x]/g, '')}`}
          type="button"
          onClick={() => {
            setSelectedProduct(product);
            setModalOpen(true);
          }}
          className="w-full py-2 px-3 bg-brand-dark hover:bg-emerald-600 text-white font-bold rounded-lg text-xs md:text-sm transition-all"
          data-product-id={product.id}
        >
          Beli Sekarang
        </button>
      ))}
      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
}
