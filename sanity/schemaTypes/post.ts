import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Pembaruan Produk', value: 'Pembaruan Produk'},
          {title: 'Berita Industri', value: 'Berita Industri'},
          {title: 'Studi Kasus', value: 'Studi Kasus'},
          {title: 'Tips & Edukasi', value: 'Tips & Edukasi'},
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama (Upload)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageUrl',
      title: 'URL Gambar (Lama)',
      description: 'Link gambar dari luar (Gunakan Gambar Utama di atas untuk upload baru)',
      type: 'url',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMetaFields',
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan (Excerpt)',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Konten',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [{ type: 'post' }],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'object',
          name: 'productCard',
          title: 'Card Produk',
          fields: [
            {
              name: 'productId',
              title: 'Pilih Produk (Pengisian Otomatis)',
              description: 'Jika dipilih, data gambar, judul, dan tautan akan diisi otomatis dari sistem web. (Abaikan field di bawah)',
              type: 'string',
              options: {
                list: [
                  { title: 'Nano Diesel 1 Botol', value: 'nano-diesel-1-botol-70ml' },
                  { title: 'Nano Diesel 2 Botol', value: 'nano-diesel-2-botol-2x70ml' },
                  { title: 'Nano Diesel Paket 3 Botol', value: 'nano-diesel-3-botol-3x70ml' },
                  { title: 'Nano Diesel Paket Hemat 6 Botol', value: 'nano-diesel-6-botol-6x70ml' },
                  { title: 'Nano Diesel Fleet Pack Pro 12 Botol', value: 'nano-diesel-12-botol-12x70ml' },
                ]
              }
            },
            {
              name: 'buttonTarget',
              title: 'Tujuan Tombol Klik (Bisa Pilih Lebih Dari 1)',
              type: 'array',
              of: [{ type: 'string' }],
              initialValue: ['internal'],
              hidden: ({parent}: any) => !parent?.productId,
              options: {
                list: [
                  { title: 'Halaman Produk Lokal (Rekomendasi SEO)', value: 'internal' },
                  { title: 'Shopee', value: 'shopee' },
                  { title: 'Tokopedia', value: 'tokopedia' },
                ]
              }
            },
            {
              name: 'title',
              title: 'Nama Produk (Manual)',
              type: 'string',
              hidden: ({parent}: any) => !!parent?.productId,
            },
            {
              name: 'description',
              title: 'Deskripsi Singkat (Manual)',
              type: 'text',
              rows: 3,
              hidden: ({parent}: any) => !!parent?.productId,
            },
            {
              name: 'image',
              title: 'Gambar Produk (Manual)',
              type: 'image',
              options: { hotspot: true },
              hidden: ({parent}: any) => !!parent?.productId,
            },
            {
              name: 'linkUrl',
              title: 'Link Tujuan (Manual)',
              type: 'url',
              hidden: ({parent}: any) => !!parent?.productId,
            },
            {
              name: 'buttonText',
              title: 'Teks Tombol (Manual)',
              type: 'string',
              initialValue: 'Lihat Produk',
              hidden: ({parent}: any) => !!parent?.productId,
            }
          ],
          preview: {
            select: {
              title: 'title',
              productId: 'productId',
              target: 'buttonTarget',
              media: 'image'
            },
            prepare(selection: any) {
              const {title, productId, target, media} = selection;
              const autoTitle = productId ? productId.replace('nano-diesel-', '').replace(/-/g, ' ').toUpperCase() : '';
              const targetStr = Array.isArray(target) ? target.join(', ') : (target || 'internal');
              return {
                title: productId ? `[Auto] ${autoTitle}` : (title || 'Card Produk'),
                subtitle: productId ? `Target: ${targetStr}` : 'Card Produk (Manual)',
                media: media
              };
            }
          }
        }
      ],
    }),
  ],
})
