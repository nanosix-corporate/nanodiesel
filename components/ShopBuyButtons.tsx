'use client';

import { useState } from 'react';
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

interface ShopBuyButtonsProps {
  // Saat digunakan sebagai tombol individual per produk
  productId?: string;
  renderModal?: boolean;
  products?: Product[];
  // Saat digunakan sebagai modal container global
}

/**
 * Client component yang mengelola semua tombol "Beli Sekarang" + OrderModal.
 * Dirender sekali di bawah ShopPage dan berkomunikasi melalui custom event.
 */
export function ShopBuyButtons({ products = [] }: { products: Product[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0] ?? null
  );

  const handleBuy = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      {/* Invisible: render tombol untuk setiap produk via portal-like pattern */}
      {products.map((product) => (
        <BuyButton key={product.id} product={product} onBuy={handleBuy} />
      ))}
      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct ?? undefined}
      />
    </>
  );
}

function BuyButton({
  product,
  onBuy,
}: {
  product: Product;
  onBuy: (p: Product) => void;
}) {
  return (
    <button
      type="button"
      id={`buy-${product.id.toLowerCase().replace(/[\s()x×]/g, '-')}`}
      onClick={() => onBuy(product)}
      className="w-full py-2 px-3 bg-brand-dark hover:bg-emerald-600 text-white font-bold rounded-lg text-xs md:text-sm transition-all"
    >
      Beli Sekarang
    </button>
  );
}
