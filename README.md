# nlptoba.org

Kode situs proyek NLP Batak Toba yang terbit di <https://nlptoba.org>. Situs dibangun dengan [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) dan diterbitkan lewat GitHub Pages.

Source code of the Batak Toba NLP project site, published at <https://nlptoba.org>.

## Lisensi

Kode situs (konfigurasi, skrip, CSS, dan JavaScript) berlisensi MIT, lihat [LICENSE](LICENSE). Data dan pedoman yang ditampilkan tetap mengikuti lisensi repo sumbernya: korpus tahap 1 CC BY 4.0, pedoman dan data tahap 2 CC BY-SA 4.0.

## Prinsip

Situs ini tidak menyimpan salinan data penelitian. Setiap build mengambil berkas terbaru dari repo penelitian, sehingga repo penelitian tetap menjadi satu-satunya sumber kebenaran.

| Repo sumber | Isi yang ditampilkan |
|---|---|
| [batak-toba-korpus](https://github.com/FeliksMakarios/batak-toba-korpus) | Halaman korpus tahap 1 |
| [batak-toba-corpus-v2](https://github.com/FeliksMakarios/batak-toba-corpus-v2) | Pedoman UD versi terbaru, 250 kalimat pilot, contoh pohon dependensi |

## Struktur

```
mkdocs.yml                  Konfigurasi situs, navigasi, dan terjemahan menu
requirements.txt            Versi MkDocs dan plugin
scripts/sync_sources.py     Menyalin berkas dari repo penelitian ke docs/
scripts/cek_tautan.py       Memeriksa tautan internal di hasil build
scripts/korpus_ditinjau.txt Commit repo korpus yang terakhir ditinjau untuk halaman korpus
hooks/indeks_pencarian.py   Memisahkan indeks pencarian per bahasa setelah build
overrides/                  Penyesuaian templat tema (halaman 404, tautan repositori, pencarian)
docs/
├── index.md                Beranda (index.en.md untuk versi Inggris)
├── korpus/                 Tahap 1
├── anotasi-ud/             Tahap 2
├── tentang.md
└── assets/
    ├── css/extra.css       Warna dan gaya tambahan
    └── js/                 Penjelajah kalimat dan penampil pohon CoNLL-U
.github/workflows/deploy.yml  Build dan penerbitan otomatis
```

Setiap halaman punya dua berkas: `nama.md` (Indonesia) dan `nama.en.md` (Inggris). Halaman tanpa versi Inggris otomatis memakai versi Indonesia.

## Menjalankan secara lokal

1. Clone repo ini dan dua repo sumber ke folder `sumber/`:

   ```bash
   git clone https://github.com/FeliksMakarios/batak-toba-korpus sumber/batak-toba-korpus
   git clone https://github.com/FeliksMakarios/batak-toba-corpus-v2 sumber/batak-toba-corpus-v2
   ```

2. Pasang dependensi, salin sumber, lalu jalankan server lokal:

   ```bash
   pip install -r requirements.txt
   python scripts/sync_sources.py --v2 sumber/batak-toba-corpus-v2 --korpus sumber/batak-toba-korpus --docs docs
   mkdocs serve
   ```

3. Buka <http://127.0.0.1:8000>.

## Kapan situs diperbarui

1. Setiap push ke cabang `main` repo ini.
2. Setiap hari pukul 00.17 UTC, untuk mengambil perubahan dari repo penelitian.
3. Secara manual lewat tab Actions, workflow "Bangun dan terbitkan situs", tombol "Run workflow".
4. Saat repo penelitian mengirim `repository_dispatch` bertipe `sumber-diperbarui` (lihat di bawah).

Setiap pull request juga dibangun dan diperiksa tautannya, tetapi tidak diterbitkan.

### Jadwal harian bisa berhenti sendiri

GitHub menonaktifkan jadwal workflow pada repo publik yang tidak mendapat commit selama 60 hari. Bila situs berhenti mengikuti repo penelitian, buka tab Actions, pilih workflow "Bangun dan terbitkan situs", lalu klik "Enable workflow".

Agar situs diperbarui segera setelah repo penelitian berubah, tanpa bergantung pada jadwal, tambahkan workflow berikut di `batak-toba-corpus-v2` dan `batak-toba-korpus`:

1. Buat fine-grained personal access token yang hanya berlaku untuk repo `nlptoba.org`, dengan izin Contents: Read and write.
2. Simpan token itu sebagai secret `NLPTOBA_DISPATCH_TOKEN` di repo penelitian.
3. Tambahkan berkas `.github/workflows/beri-tahu-situs.yml`:

   ```yaml
   name: Beri tahu situs nlptoba.org
   on:
     push:
       branches: [main]
   jobs:
     kirim:
       runs-on: ubuntu-latest
       steps:
         - run: >-
             curl -sSf -X POST
             -H "Authorization: Bearer ${{ secrets.NLPTOBA_DISPATCH_TOKEN }}"
             -H "Accept: application/vnd.github+json"
             https://api.github.com/repos/FeliksMakarios/nlptoba.org/dispatches
             -d '{"event_type":"sumber-diperbarui"}'
   ```

### Halaman korpus ditulis manual

Halaman `docs/korpus/` merangkum repo `batak-toba-korpus` secara manual. Setiap build membandingkan `README.md`, `data/`, `docs/`, dan `metadata/` di repo korpus dengan commit yang tercatat di `scripts/korpus_ditinjau.txt`. Bila ada yang berubah, log build memuat peringatan "Halaman korpus perlu ditinjau" beserta daftar berkasnya. Build tetap berjalan.

Setelah meninjau dan memperbarui halaman korpus, ganti commit di `scripts/korpus_ditinjau.txt` dengan commit terbaru repo korpus.

## Menambah tahap penelitian baru

1. Buat folder baru di `docs/`, misalnya `docs/penerjemahan-mesin/`, berisi `index.md` dan `index.en.md`.
2. Tambahkan halaman itu ke `nav` dan `nav_translations` di `mkdocs.yml`.
3. Bila tahap baru punya repo sendiri, tambahkan langkah checkout di `.github/workflows/deploy.yml` dan salin berkasnya lewat `scripts/sync_sources.py`.
4. Tambahkan kartu tahap baru di `docs/index.md` dan `docs/index.en.md`.

## Pengaturan GitHub Pages dan domain

Langkah ini dilakukan sekali oleh pemilik repo.

1. **Settings, Pages, Build and deployment.** Pilih Source: GitHub Actions.
2. **DNS di penyedia domain nlptoba.org.** Tambahkan record berikut:

   | Tipe | Nama | Nilai |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `feliksmakarios.github.io` |

   Selain record di atas, jangan ada record A atau AAAA lain untuk `@` maupun `www`. Banyak penyedia domain menambahkan record parkir secara otomatis, misalnya `2.57.91.91`. Hapus record itu dan matikan fitur parkir atau pengalihan domain. Arahkan `www` ke `feliksmakarios.github.io`, bukan ke `nlptoba.org`. Kalau masih ada record lain, pemeriksaan DNS GitHub tidak pernah lulus dan sertifikat HTTPS tidak terbit. Periksa hasilnya dengan:

   ```bash
   dig +short nlptoba.org A
   dig +short www.nlptoba.org
   ```

   Perintah pertama hanya boleh mengembalikan empat alamat `185.199.x.153`, dan baris pertama perintah kedua harus `feliksmakarios.github.io.`

3. **Verifikasi domain.** Di Settings akun GitHub (bukan repo), buka Pages, lalu Add a domain, isi `nlptoba.org`, dan tambahkan TXT record yang diberikan GitHub. Langkah ini mencegah domain dipakai repo milik orang lain.
4. **Settings, Pages, Custom domain.** Isi `nlptoba.org`, lalu Save.
5. Setelah pemeriksaan DNS berhasil, centang **Enforce HTTPS**. Sertifikat biasanya terbit dalam beberapa menit sampai satu jam.
6. Kalau peramban masih menampilkan sertifikat `*.github.io` dan bukan `nlptoba.org`, sertifikat baru belum tersebar ke semua server GitHub. Periksa sertifikat yang dikirim server dengan perintah berikut:

   ```bash
   openssl s_client -connect nlptoba.org:443 -servername nlptoba.org </dev/null 2>/dev/null | openssl x509 -noout -subject -ext subjectAltName
   ```

   Kalau hasilnya masih `*.github.io` setelah beberapa jam, hapus centang Enforce HTTPS, klik Remove pada Custom domain, isi lagi `nlptoba.org`, lalu Save untuk memicu penerbitan ulang.
