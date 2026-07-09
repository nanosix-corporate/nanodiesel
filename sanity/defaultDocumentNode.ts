import { DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { SanityDocument } from 'sanity'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc: SanityDocument) => {
            const baseUrl = 'https://www.nanodiesel.id'
            const slug = (doc?.slug as any)?.current
            
            if (slug) {
              return `${baseUrl}/artikel/${slug}`
            }
            // Jika slug belum ada (artikel baru), arahkan ke halaman utama berita
            return `${baseUrl}/artikel`
          },
          reload: {
            button: true, // Menambahkan tombol reload manual
          },
        })
        .title('Preview'),
    ])
  }
  return S.document().views([S.view.form()])
}
