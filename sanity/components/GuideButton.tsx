import React, { useState } from 'react'
import { Button, Dialog, Box, Text, Heading, Stack, Card } from '@sanity/ui'
import { HelpCircleIcon } from '@sanity/icons'

export function GuideButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Box
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 999999,
        }}
      >
        <Button
          icon={HelpCircleIcon}
          text="Panduan Editor"
          tone="primary"
          mode="default"
          padding={3}
          radius={4}
          onClick={() => setIsOpen(true)}
          style={{ cursor: 'pointer' }}
        />
      </Box>

      {isOpen && (
        <Dialog
          header="Panduan Editor Sanity Studio"
          id="editor-guide-dialog"
          onClose={() => setIsOpen(false)}
          zOffset={999999}
          width={1}
        >
          <Box padding={4}>
            <Stack space={5}>
              <Card padding={3} radius={2} tone="primary">
                <Text size={2}>
                  Panduan ini dibuat khusus untuk Tim Marketing & Copywriter agar dapat memaksimalkan fitur-fitur SEO dan penulisan artikel terbaru di Sanity Studio.
                </Text>
              </Card>

              <Stack space={3}>
                <Heading as="h3" size={3}>1. Mengisi Data SEO (Meta Tags)</Heading>
                <Text size={2}>
                  Setiap artikel yang Anda buat kini dilengkapi dengan dashboard SEO lengkap. Ini sangat penting untuk memastikan artikel Anda terlihat menarik di Google dan media sosial.
                </Text>
                <Text size={2} weight="semibold">Cara Penggunaan:</Text>
                <Text size={2}>1. Buka atau buat artikel baru di menu <strong>Artikel</strong>.</Text>
                <Text size={2}>2. Scroll ke bawah hingga menemukan bagian <strong>SEO</strong>.</Text>
                <Text size={2}>3. Di dalam panel ini, Anda bisa mengisi Meta Title, Description, OG Image, dan Focus Keywords.</Text>
              </Stack>

              <Stack space={3}>
                <Heading as="h3" size={3}>2. Skor GEO & AEO (Penilaian Otomatis)</Heading>
                <Text size={2}>
                  Di bagian paling atas panel SEO terdapat <strong>GEO Score</strong> dan <strong>AEO Score</strong> yang dihitung secara real-time saat Anda mengetik.
                </Text>
                <Text size={2} weight="semibold">Apa artinya?</Text>
                <Text size={2}>• <strong>GEO Score</strong> — seberapa siap artikel ini muncul di AI Search seperti Google AI Overview, ChatGPT, dan Perplexity.</Text>
                <Text size={2}>• <strong>AEO Score</strong> — seberapa siap artikel ini muncul sebagai jawaban langsung (Featured Snippet, Voice Search).</Text>
                <Text size={2} weight="semibold">Tips meningkatkan skor:</Text>
                <Text size={2}>• Tambahkan <strong>Tabel Data</strong> di konten untuk GEO (+20 pts)</Text>
                <Text size={2}>• Tambahkan <strong>Modul FAQ</strong> di konten untuk AEO (+25 pts)</Text>
                <Text size={2}>• Isi Meta Title, Meta Description, dan Focus Keywords</Text>
                <Text size={2}>• Gunakan heading H2/H3 dan Internal Links</Text>
              </Stack>

              <Stack space={3}>
                <Heading as="h3" size={3}>3. Membuat Internal Link</Heading>
                <Text size={2}>
                  Menautkan satu artikel ke artikel lain sangat disukai oleh Google karena mencegah adanya artikel "yatim".
                </Text>
                <Text size={2} weight="semibold">Cara Penggunaan:</Text>
                <Text size={2}>1. Di kolom Konten, ketik atau blok kata/kalimat yang ingin dijadikan tautan.</Text>
                <Text size={2}>2. Klik ikon rantai (Link) yang muncul pada toolbar.</Text>
                <Text size={2}>3. Pilih <strong>Internal Link</strong> dan cari judul artikel tujuan dari dropdown.</Text>
              </Stack>

              <Stack space={3}>
                <Heading as="h3" size={3}>4. Menambahkan Tabel di Artikel</Heading>
                <Text size={2}>
                  Anda dapat menyisipkan tabel data langsung di dalam teks artikel untuk menyajikan perbandingan data, spesifikasi produk, atau hasil pengujian secara terstruktur.
                </Text>
                <Text size={2} weight="semibold">Cara Penggunaan:</Text>
                <Text size={2}>1. Di kolom Konten, klik tombol <strong>+</strong> (Add item) di akhir paragraf.</Text>
                <Text size={2}>2. Pilih opsi <strong>Tabel</strong> dari daftar blok.</Text>
                <Text size={2}>3. Isi <strong>Header Kolom</strong> (nama-nama kolom), lalu tambahkan <strong>Baris Data</strong> satu per satu. Urutan sel harus sesuai urutan kolom.</Text>
                <Text size={2}>4. Isi <strong>Judul Tabel</strong> (opsional) sebagai keterangan di atas tabel.</Text>
              </Stack>

              <Stack space={3}>
                <Heading as="h3" size={3}>5. Menambahkan Modul FAQ (Tanya Jawab)</Heading>
                <Text size={2}>
                  Modul FAQ memungkinkan Anda menyisipkan daftar tanya-jawab interaktif di dalam artikel. Selain tampil sebagai accordion, FAQ otomatis menghasilkan schema SEO <strong>FAQPage</strong> yang berpotensi muncul sebagai <em>Rich Snippet</em> di Google.
                </Text>
                <Text size={2} weight="semibold">Cara Penggunaan:</Text>
                <Text size={2}>1. Di kolom Konten, klik tombol <strong>+</strong> dan pilih <strong>Modul FAQ (Tanya Jawab)</strong>.</Text>
                <Text size={2}>2. Isi <strong>Judul Bagian FAQ</strong> (opsional), misalnya "Pertanyaan Umum".</Text>
                <Text size={2}>3. Klik <strong>Add item</strong> untuk menambahkan pertanyaan baru. Isi <strong>Pertanyaan</strong> dan <strong>Jawaban</strong>.</Text>
                <Text size={2}>4. Ulangi langkah 3 untuk setiap pertanyaan tambahan, lalu klik Publish.</Text>
              </Stack>

              <Stack space={3}>
                <Heading as="h3" size={3}>6. Fitur Live Preview</Heading>
                <Text size={2}>
                  Anda kini tidak perlu lagi bolak-balik buka tab baru untuk melihat hasil ketikan Anda.
                </Text>
                <Text size={2} weight="semibold">Cara Penggunaan:</Text>
                <Text size={2}>1. Saat membuka sebuah artikel, perhatikan panel tab di atas tombol Publish.</Text>
                <Text size={2}>2. Terdapat tab Form (untuk menulis) dan tab <strong>Preview</strong>.</Text>
                <Text size={2}>3. Klik Preview untuk melihat secara live bagaimana artikel tersebut akan tampil di website.</Text>
              </Stack>

              <Stack space={3}>
                <Heading as="h3" size={3}>7. Mengubah URL (Auto-Redirect 301)</Heading>
                <Text size={2}>
                  Jika Anda perlu merevisi judul artikel lama, jangan biarkan URL lama rusak/error 404!
                </Text>
                <Text size={2} weight="semibold">Cara Penggunaan:</Text>
                <Text size={2}>1. Pada menu utama Sanity Studio, klik menu <strong>Redirect URL (301)</strong>.</Text>
                <Text size={2}>2. Buat baru dan masukkan URL Lama (Source) dan URL Baru (Destination).</Text>
                <Text size={2}>3. Biarkan centang Permanent (301) aktif dan klik Publish.</Text>
              </Stack>
            </Stack>
          </Box>
        </Dialog>
      )}
    </>
  )
}
