// Deklarasi global untuk Google Analytics gtag
// Dibutuhkan agar TypeScript tidak error saat memanggil window.gtag()
interface Window {
  gtag: (
    command: 'event' | 'config' | 'js' | 'set',
    targetId: string | Date,
    params?: Record<string, unknown>
  ) => void;
  dataLayer: unknown[];
}
