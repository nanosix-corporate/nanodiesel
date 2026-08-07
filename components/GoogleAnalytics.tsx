'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export function GoogleAnalytics() {
  const pathname = usePathname();

  // Hindari tracking GA di halaman Sanity Studio agar data tidak bias
  // (sebab direct action menulis artikel tidak perlu di-track)
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
