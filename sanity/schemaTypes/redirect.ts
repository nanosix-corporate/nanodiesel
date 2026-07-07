import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Redirect URL (301)',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'URL Lama (Source)',
      type: 'string',
      description: 'Contoh: /news/judul-lama',
      validation: (Rule) => Rule.required().regex(/^\//, { name: 'Dimulai dengan /', invert: false }),
    }),
    defineField({
      name: 'destination',
      title: 'URL Baru (Destination)',
      type: 'string',
      description: 'Contoh: /news/judul-baru-yang-keren',
      validation: (Rule) => Rule.required().regex(/^\//, { name: 'Dimulai dengan /', invert: false }),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      initialValue: true,
      description: 'Aktifkan untuk 301 Permanent Redirect (Baik untuk SEO)',
    }),
  ],
  preview: {
    select: {
      title: 'source',
      subtitle: 'destination',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ? `Dari: ${title}` : 'No Source',
        subtitle: subtitle ? `Ke: ${subtitle}` : 'No Destination',
      }
    },
  },
})
