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
              name: 'title',
              title: 'Nama Produk',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Deskripsi Singkat',
              type: 'text',
              rows: 3,
            },
            {
              name: 'image',
              title: 'Gambar Produk',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'linkUrl',
              title: 'Link Tujuan (Opsional)',
              type: 'url',
            },
            {
              name: 'buttonText',
              title: 'Teks Tombol (Opsional)',
              type: 'string',
              initialValue: 'Lihat Produk',
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            },
            prepare(selection) {
              const {title, media} = selection;
              return {
                title: title || 'Card Produk',
                subtitle: 'Card Produk (Custom Block)',
                media: media
              };
            }
          }
        }
      ],
    }),
  ],
})
