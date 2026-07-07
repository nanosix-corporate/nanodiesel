const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-06-29';

    if (!projectId || !dataset) {
      console.warn('Sanity credentials missing, skipping redirects fetch');
      return [];
    }

    try {
      const query = encodeURIComponent('*[_type == "redirect" && defined(source) && defined(destination)]');
      const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
      
      const res = await fetch(url);
      const json = await res.json();
      
      const redirects = json?.result?.map((doc) => ({
        source: doc.source,
        destination: doc.destination,
        permanent: doc.permanent ?? true,
      })) || [];
      
      return redirects;
    } catch (error) {
      console.error('Error fetching redirects from Sanity:', error);
      return [];
    }
  },
};

export default nextConfig;

