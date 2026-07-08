import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { ClientLayoutWrapper } from '../components/ClientLayoutWrapper';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Nano Diesel | Aditif Solar & Diesel Treatment',
  description: 'Nano Diesel adalah aditif solar diesel berbasis nano teknologi untuk performa dan efisiensi terbaik.',
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
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
    </html>
  );
}

