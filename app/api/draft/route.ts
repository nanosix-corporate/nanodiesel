import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const secret = searchParams.get('secret');

  // Validasi secret sederhana untuk keamanan (opsional tapi disarankan)
  if (secret !== 'preview-secret') {
    return new Response('Invalid token', { status: 401 });
  }

  if (!slug) {
    console.log('[Draft Route] Missing slug');
    return new Response('Missing slug', { status: 400 });
  }

  console.log('[Draft Route] Enabling draft mode for slug:', slug);
  // Aktifkan Draft Mode dengan menyetel cookie
  (await draftMode()).enable();

  // Redirect ke halaman artikel
  redirect(`/artikel/${slug}`);
}
