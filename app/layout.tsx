import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Nunito_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ClientLayoutWrapper } from '../components/ClientLayoutWrapper';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nanodiesel.id'),
  title: {
    default: 'Nano Diesel | Aditif Solar Premium & Diesel Treatment',
    template: '%s | Nano Diesel',
  },
  description: 'Nano Diesel adalah aditif solar premium berteknologi nano dengan formulasi Oxygenated Technology. Jaga injektor bersih, hemat bahan bakar, dan tingkatkan performa mesin. Teruji LEMIGAS dan Dyno Test. Cocok untuk B30–B100.',
  keywords: ['aditif solar', 'aditif diesel', 'nano diesel', 'hemat bbm diesel', 'oxygenated technology'],
  authors: [{ name: 'Nano Diesel' }],
  creator: 'NanoSix',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.nanodiesel.id',
    siteName: 'Nano Diesel',
    title: 'Nano Diesel | Aditif Solar Premium & Diesel Treatment',
    description: 'Nano Diesel adalah aditif solar premium berteknologi nano dengan formulasi Oxygenated Technology. Jaga injektor bersih, hemat bahan bakar, dan tingkatkan performa mesin. Teruji LEMIGAS dan Dyno Test. Cocok untuk B30–B100.',
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'Nano Diesel — Aditif Solar Terbaik Indonesia' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nanodiesel',
    creator: '@nanodiesel',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png' }],
    other: [{ rel: 'manifest', url: '/favicon/site.webmanifest' }],
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nanodiesel.id';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nano Diesel',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo/nanodiesel-logo-brand.svg`,
  description:
    'Nano Diesel adalah aditif solar diesel berbasis nano teknologi untuk meningkatkan performa mesin, menghemat bahan bakar, dan memperpanjang umur mesin diesel.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-21-2248-3303',
    contactType: 'customer service',
    availableLanguage: 'Indonesian',
  },
  sameAs: [
    'https://shopee.co.id/nanodiesel',
    'https://www.tokopedia.com/nanodiesel',
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${nunitoSans.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=account_balance_wallet,agriculture,arrow_back,arrow_forward,arrow_forward_ios,article,biotech,bolt,calculate,chat,cleaning_services,close,directions_bus,directions_car,eco,expand_more,image,local_fire_department,local_gas_station,local_shipping,menu,oil_barrel,science,search,shield_with_heart,shopping_cart,speed,swipe_left,verified,water_drop&display=block"
          rel="stylesheet"
        />
        {/* JSON-LD: Organization Schema — berlaku global di semua halaman */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-olive-50 text-brand-copy antialiased font-sans">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>

      {/* Google Analytics 4 — berlaku otomatis di semua halaman termasuk artikel baru */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XHNP23VTHP"
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XHNP23VTHP');
        `}
      </Script>
    </html>
  );
}

