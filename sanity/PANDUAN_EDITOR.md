# Panduan Editor Sanity Studio (Nano Diesel)

Panduan ini dibuat khusus untuk Tim Marketing & Copywriter agar dapat memaksimalkan fitur-fitur SEO dan penulisan artikel terbaru di Sanity Studio.

---

## 1. Mengisi Data SEO (Meta Tags)
Setiap artikel yang Anda buat kini dilengkapi dengan *dashboard* SEO lengkap. Ini sangat penting untuk memastikan artikel Anda terlihat menarik di Google dan media sosial.

**Cara Penggunaan:**
1. Buka atau buat artikel baru di menu **Artikel**.
2. *Scroll* ke bawah hingga menemukan bagian **SEO**.
3. Di dalam panel ini, Anda bisa mengisi:
   - **Meta Title & Description:** Judul dan ringkasan yang akan muncul di hasil pencarian Google. Jika dikosongkan, sistem akan otomatis menggunakan judul dan ringkasan bawaan artikel.
   - **Open Graph / Twitter:** Digunakan untuk mengontrol bagaimana artikel terlihat saat di-*share* di WhatsApp, Facebook, LinkedIn, atau X (Twitter). Anda bisa mengunggah gambar khusus di sini.

---

## 2. Membuat Internal Link (Tautan Antar Artikel)
Menautkan satu artikel ke artikel lain sangat disukai oleh Google karena mencegah adanya artikel "yatim" (tidak ada yang mengarah kepadanya).

**Cara Penggunaan:**
1. Di kolom **Konten**, ketik atau blok kata/kalimat yang ingin dijadikan tautan.
2. Klik ikon rantai (Link) yang muncul pada *toolbar*.
3. Anda akan melihat dua opsi:
   - **External Link:** Pilih ini jika ingin menautkan ke web lain (misal: wikipedia, youtube).
   - **Internal Link:** Pilih ini untuk menautkan ke artikel lain di dalam web Nano Diesel. Anda cukup mencari judul artikel tujuan dari *dropdown* yang muncul tanpa perlu mengetik/menyalin URL-nya secara manual!

---

## 3. Fitur Live Preview (Pratinjau Langsung)
Anda kini tidak perlu lagi bolak-balik buka tab baru untuk melihat hasil ketikan Anda.

**Cara Penggunaan:**
1. Saat membuka sebuah artikel, perhatikan panel tab di atas tombol *Publish* (di sudut kanan atas atau tengah atas).
2. Terdapat tab **Form** (untuk menulis) dan tab **Preview**.
3. Klik **Preview**. Layar akan terbelah menjadi dua, dan Anda bisa melihat secara *live* bagaimana artikel tersebut akan tampil di website aslinya.

---

## 4. Mengubah URL Artikel Tanpa Merusak SEO (Auto-Redirect 301)
Jika Anda perlu merevisi judul artikel lama (misal: "Tips Merawat Mesin" diubah menjadi "5 Cara Merawat Mesin 2026"), otomatis URL-nya (*slug*) sering kali ikut diubah. **Jangan biarkan URL lama rusak/error 404!**

**Cara Penggunaan:**
1. Pada menu utama Sanity Studio (di sebelah kiri), klik menu **Redirect URL (301)**.
2. Klik ikon pensil/buat baru.
3. Masukkan **URL Lama (Source)**, misalnya: `/news/tips-merawat-mesin`
4. Masukkan **URL Baru (Destination)**, misalnya: `/news/5-cara-merawat-mesin-2026`
5. Biarkan centang **Permanent (301)** aktif.
6. Klik **Publish**.

*Catatan untuk tim developer/IT: Jika situs di-host secara statis, mungkin diperlukan deployment/restart server agar daftar redirect terbaru ini terbaca.*
