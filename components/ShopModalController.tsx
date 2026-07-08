'use client';

import { useState, useEffect } from 'react';
import { OrderModal } from './OrderModal';

interface Product {
  id: string;
  title: string;
  label: string;
  price: string;
  shopee: string | null;
  tokopedia: string | null;
  wa: string;
}

interface ShopModalControllerProps {
  products: Product[];
}

/**
 * Client Component yang mengelola OrderModal untuk halaman /shop.
 *
 * Strategi: tombol "Beli Sekarang" dirender oleh server dengan atribut
 * data-buy-product-id. Komponen ini attach event listener ke semua
 * tombol tersebut setelah hydration, sehingga konten produk tetap
 * terlihat oleh Googlebot dari HTML mentah (SSR).
 */
export function ShopModalController({ products }: ShopModalControllerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-buy-product-id]');
      if (!target) return;

      const productId = target.getAttribute('data-buy-product-id');
      const found = products.find((p) => p.id === productId);
      if (found) {
        setSelectedProduct(found);
        setModalOpen(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [products]);

  return (
    <OrderModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      product={selectedProduct ?? undefined}
    />
  );
}
