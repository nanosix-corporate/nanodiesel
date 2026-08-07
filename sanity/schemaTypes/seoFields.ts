import { defineField, defineType } from 'sanity'
import { SEOScoreDashboard } from '../components/SEOScoreDashboard'

/**
 * Custom SEO object untuk artikel Nano Diesel.
 * Menggantikan seoMetaFields dari sanity-plugin-seo agar hanya
 * menampilkan field yang relevan — tanpa Twitter/Social Card.
 */
export default defineType({
  name: 'articleSeo',
  title: 'SEO',
  type: 'object',
  fields: [
    // ─── GEO & AEO Score Dashboard (read-only, real-time) ────────────────────
    defineField({
      name: 'scorePanel',
      title: 'Skor GEO & AEO',
      type: 'string',
      readOnly: true,
      components: {
        input: SEOScoreDashboard,
      },
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Judul yang tampil di Google (maks. 60 karakter). Jika kosong, judul artikel digunakan.',
      validation: (Rule) => Rule.max(60).warning('Sebaiknya tidak lebih dari 60 karakter agar tidak terpotong di Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Deskripsi yang tampil di bawah judul di Google (maks. 160 karakter).',
      validation: (Rule) => Rule.max(160).warning('Sebaiknya tidak lebih dari 160 karakter.'),
    }),
    defineField({
      name: 'metaImage',
      title: 'Meta Image (OG Image)',
      type: 'image',
      description: 'Gambar yang tampil saat artikel dibagikan. Rasio ideal: 1200×630px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Isi hanya jika artikel ini merupakan duplikat dari halaman lain. Biasanya dikosongkan.',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Kata kunci utama yang ingin ditarget artikel ini (maks. 5).',
      validation: (Rule) => Rule.max(5).warning('Terlalu banyak keyword bisa memecah fokus SEO.'),
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'openGraph',
      title: 'Open Graph (Pratinjau Share)',
      type: 'object',
      description: 'Judul & deskripsi saat artikel dibagikan di media sosial (Facebook, WhatsApp, dll). Jika kosong, Meta Title & Description digunakan.',
      fields: [
        defineField({
          name: 'title',
          title: 'OG Title',
          type: 'string',
          validation: (Rule) => Rule.max(70).warning('Sebaiknya tidak lebih dari 70 karakter.'),
        }),
        defineField({
          name: 'description',
          title: 'OG Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(200).warning('Sebaiknya tidak lebih dari 200 karakter.'),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      metaTitle: 'metaTitle',
      metaDescription: 'metaDescription',
    },
    prepare({ metaTitle, metaDescription }: any) {
      return {
        title: metaTitle || '(belum diisi)',
        subtitle: metaDescription || '',
      }
    },
  },
})
