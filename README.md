# nlptoba.org

Kode situs proyek NLP Batak Toba yang terbit di <https://nlptoba.org>. Situs dibangun dengan [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) dan diterbitkan lewat GitHub Pages.

Source code of the Batak Toba NLP project site, published at <https://nlptoba.org>.

## Prinsip

Situs ini tidak menyimpan salinan data penelitian. Setiap build mengambil berkas terbaru dari repo penelitian, sehingga repo penelitian tetap menjadi satu-satunya sumber kebenaran.

| Repo sumber | Isi yang ditampilkan |
|---|---|
| [batak-toba-korpus](https://github.com/FeliksMakarios/batak-toba-korpus) | Halaman korpus tahap 1 |
| [batak-toba-corpus-v2](https://github.com/FeliksMakarios/batak-toba-corpus-v2) | Pedoman UD v1.0, 250 kalimat pilot, contoh pohon dependensi |

## Struktur

```
mkdocs.yml                  Konfigurasi situs, navigasi, dan terjemahan menu
requirements.txt            Versi MkDocs dan plugin
scripts/sync_sources.py     Menyalin berkas dari repo penelitian ke docs/
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

## Menambah tahap penelitian baru

1. Buat folder baru di `docs/`, misalnya `docs/penerjemahan-mesin/`, berisi `index.md` dan `index.en.md`.
2. Tambahkan halaman itu ke `nav` dan `nav_translations` di `mkdocs.yml`.
3. Bila tahap baru punya repo sendiri, tambahkan langkah checkout di `.github/workflows/deploy.yml` dan salin berkasnya lewat `scripts/sync_sources.py`.
4. Tambahkan kartu tahap baru di `docs/index.md` dan `docs/index.en.md`.

## Akses ke repo sumber privat

Repo `batak-toba-corpus-v2` masih privat, sehingga workflow memerlukan deploy key baca saja. Langkah ini dilakukan sekali oleh pemilik repo, di komputer sendiri.

1. Buat pasangan kunci baru tanpa passphrase:

   ```bash
   ssh-keygen -t ed25519 -N "" -C "nlptoba.org deploy" -f nlptoba-deploy
   ```

2. Di repo **batak-toba-corpus-v2**, buka Settings, Deploy keys, Add deploy key. Tempel isi `nlptoba-deploy.pub`. Biarkan "Allow write access" tidak dicentang.
3. Di repo **nlptoba.org**, buka Settings, Secrets and variables, Actions, New repository secret. Beri nama `SUMBER_V2_DEPLOY_KEY` dan tempel isi berkas `nlptoba-deploy` (kunci privat).
4. Hapus kedua berkas kunci dari komputer setelah selesai.

Bila kelak repo `batak-toba-corpus-v2` dijadikan publik, secret ini boleh dihapus.

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

3. **Verifikasi domain.** Di Settings akun GitHub (bukan repo), buka Pages, lalu Add a domain, isi `nlptoba.org`, dan tambahkan TXT record yang diberikan GitHub. Langkah ini mencegah domain dipakai repo milik orang lain.
4. **Settings, Pages, Custom domain.** Isi `nlptoba.org`, lalu Save.
5. Setelah pemeriksaan DNS berhasil, centang **Enforce HTTPS**. Sertifikat biasanya terbit dalam beberapa menit sampai satu jam.
