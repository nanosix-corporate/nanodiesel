const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-06-29';

    const staticRedirects = [
      { source: '/shop', destination: '/produk', permanent: true },
      { source: '/shop/:path*', destination: '/produk/:path*', permanent: true },
      { source: '/our-story', destination: '/profil', permanent: true },
      { source: '/news', destination: '/artikel', permanent: true },
      { source: '/news/:path*', destination: '/artikel/:path*', permanent: true },
      { source: '/our-technology', destination: '/teknologi-kami', permanent: true },
    ];

    if (!projectId || !dataset) {
      console.warn('Sanity credentials missing, skipping redirects fetch');
      return staticRedirects;
    }

    try {
      const query = encodeURIComponent('*[_type == "redirect" && defined(source) && defined(destination)]');
      const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
      
      const res = await fetch(url);
      const json = await res.json();
      
      const sanityRedirects = json?.result?.map((doc) => ({
        source: doc.source,
        destination: doc.destination,
        permanent: doc.permanent ?? true,
      })) || [];
      
      return [...staticRedirects, ...sanityRedirects];
    } catch (error) {
      console.error('Error fetching redirects from Sanity:', error);
      return staticRedirects;
    }
  },
};

export default nextConfig;

