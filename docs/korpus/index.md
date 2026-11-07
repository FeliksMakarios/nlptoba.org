---
title: Korpus Batak Toba (Tahap 1)
---

<p class="nt-kicker">Tahun I · Semester 1 · 2025</p>

# Korpus Batak Toba (Tahap 1)

Korpus teks awal bahasa Batak Toba (`bbc`) beserta padanannya dalam bahasa Indonesia (`ind`). Korpus ini adalah luaran penelitian "Digitalisasi dan Praproses Korpus Bahasa Batak Toba sebagai Fondasi Pengembangan Model Bahasa Lokal Berbasis Deep Learning" (Penelitian Dosen Pemula, Universitas Pelita Harapan, 2025, No. P-020-PDP-FTI/VII/2025).

[:fontawesome-brands-github: Repositori batak-toba-korpus](https://github.com/FeliksMakarios/batak-toba-korpus){ .md-button .md-button--primary }

## Alur pengumpulan data

<div class="nt-flow">
  <div class="nt-step nt-y1"><span class="nt-step-title">Inventarisasi Sumber</span><span class="nt-step-note">Menentukan sumber daring dan menyusun taksonomi lima genre.</span></div>
  <div class="nt-step nt-y2"><span class="nt-step-title">Kurasi Manual</span><span class="nt-step-note">Penelusuran terarah dan pencatatan dengan satu templat bersama.</span></div>
  <div class="nt-step nt-y3"><span class="nt-step-title">Digitalisasi</span><span class="nt-step-note">OCR untuk dokumen PDF dan hasil pindai, lalu diperiksa manual.</span></div>
  <div class="nt-step nt-y4"><span class="nt-step-title">Penerjemahan</span><span class="nt-step-note">Dua narasumber penutur asli menyalin dan menerjemahkan teks.</span></div>
  <div class="nt-step nt-y5"><span class="nt-step-title">Pemeriksaan dan Dokumentasi</span><span class="nt-step-note">Pemeriksaan acak, metadata, dan laporan teknis.</span></div>
</div>

!!! info "Perubahan dari rencana awal"
    Proposal merencanakan crawling dan scraping berskala besar. Dalam pelaksanaan, pendekatan dipersempit menjadi penelusuran manual dan kurasi terarah karena pertimbangan etika, hak cipta, kualitas data, dan waktu. Korpus menjadi lebih kecil, tetapi lebih terkurasi dan terdokumentasi. Data lisan direncanakan pada pembaruan berikutnya.

## Isi korpus

Korpus terdiri atas dua sub-korpus:

1. `btb_multigenre`: korpus multi-genre yang dikurasi secara manual dari berbagai sumber daring.
2. `btb_bible`: korpus paralel Alkitab Batak Toba (terjemahan 1894) dan padanannya dalam bahasa Indonesia.

Hasil hitungan bergantung pada perlakuan terhadap tanda baca. Karena itu jumlah token dilaporkan dengan tiga metode:

1. **Kata**: hanya urutan huruf atau angka. Tanda baca tidak dihitung.
2. **Token berbasis spasi**: teks dipisah pada spasi. Tanda baca ikut menempel pada kata.
3. **Token NLTK**: teks dijadikan huruf kecil, lalu dipecah dengan `word_tokenize` dari NLTK. Setiap tanda baca dihitung sebagai token tersendiri.

| Sub-korpus | Satuan | Batak Toba | Indonesia |
|---|---|---:|---:|
| `btb_multigenre` | dokumen | 104 | 104 |
| `btb_multigenre` | kalimat atau baris | 4.429 | 4.447 |
| `btb_multigenre` | kata | 59.443 | 53.166 |
| `btb_multigenre` | token NLTK | 67.680 | 60.866 |
| `btb_bible` | pasal (ayat) | 66 (1.594) | 66 (1.594) |
| `btb_bible` | kata | 38.509 | 34.320 |
| `btb_bible` | token NLTK | 44.785 | 39.687 |
| **Total** | **kata** | **97.952** | **87.486** |
| **Total** | **token berbasis spasi** | **98.235** | **85.990** |
| **Total** | **token NLTK** | **112.465** | **100.553** |

!!! note "Target 100.000 token Batak Toba"
    Target proposal tercapai bila tanda baca dihitung sebagai token, yaitu 112.465 token NLTK. Bila hanya kata yang dihitung, sisi Batak Toba berjumlah 97.952 kata, sekitar 2% di bawah target. Kedua angka dicantumkan agar pembaca dapat menilai sendiri.

!!! info "Koreksi angka dari versi awal"
    Versi awal mencantumkan 520 dokumen paralel untuk sub-korpus Alkitab. Angka itu berasal dari pengelompokan yang keliru pada notebook analisis lama. Jumlah sebenarnya adalah 66 pasal (1.594 ayat). Jumlah kalimat multi-genre kini dihitung dengan segmentasi notebook pipeline v2, yang juga memecah puisi dan liturgi per baris, sehingga berbeda dari angka 3.498 kalimat pada versi awal.

## Genre

| Genre | Sub-genre | Dokumen | Kata Batak Toba |
|---|---|---:|---:|
| Historical/Traditional | Folktales (cerita rakyat) | 2 | 1.796 |
| Literary | Peribahasa/Umpama | 46 | 356 |
| Literary | Poems (puisi) | 7 | 741 |
| Religious | Prayers (doa Kristen) | 3 | 210 |
| Religious | Ritual Text (Agenda HKBP) | 6 | 35.097 |
| Religious | Alkitab (`btb_bible`) | 66 pasal | 38.509 |
| Educational | Book Summary (ringkasan dan ulasan buku) | 8 | 4.120 |
| Educational | Abstract (abstrak artikel jurnal) | 9 | 1.915 |
| Contemporary Media | Wiki | 7 | 6.246 |
| Contemporary Media | News Article (artikel berita) | 9 | 3.884 |
| Contemporary Media | Blog Articles (artikel blog) | 7 | 5.078 |

Domain keagamaan sangat dominan. Agenda HKBP, doa, dan Alkitab mencakup sekitar 75% kata Batak Toba, dan Agenda HKBP saja mencakup 59% kata sub-korpus multi-genre.

## Korpus paralel tingkat kalimat

Berkas `btb_parallel_sentence.csv` memuat pasangan kalimat Batak Toba dan Indonesia dari sub-korpus multi-genre, tanpa Agenda HKBP. Pasangan dibentuk dengan penyelarasan otomatis dan audit. Sebanyak 145 pasangan yang ditandai bermasalah kemudian dinilai oleh dua penilai yang berbeda dari kedua penerjemah, dan perbedaan keputusan mereka diselesaikan melalui adjudikasi.

| Ukuran | Nilai |
|---|---:|
| Pasangan | 1.542 |
| Dokumen | 97 |
| Kata Batak Toba / Indonesia | 24.377 / 21.486 |
| Pasangan divalidasi manusia (`validasi_manusia = ya`) | 182 (11,8%) |
| Pasangan hasil penyelarasan otomatis yang lolos audit | 1.360 |

Pasangan tervalidasi manusia paling banyak berasal dari cerita rakyat (47) dan puisi (45). Doa dan peribahasa hampir tidak memilikinya.

### Kesepakatan antaranotator

Kesepakatan diukur dengan Cohen's kappa pada 145 pasangan yang ditandai. Setiap penilai memilih satu keputusan untuk setiap pasangan, misalnya menerima pasangan, merevisi penyelarasan, atau merevisi terjemahan.

| Skenario | Kesepakatan | Cohen's kappa |
|---|---:|---:|
| Label asli kedua penilai | 37,9% | 0,088 |
| Setelah rekonsiliasi label penilai A (dasar adjudikasi) | 46,2% | **0,170** (IK95% 0,06 sampai 0,28) |
| Aturan rekonsiliasi diterapkan ke kedua penilai | 51,7% | 0,156 |
| Seperti di atas, dengan perbedaan tanda baca diabaikan | 49,0% | 0,183 |

**Tafsir angka**

1. **Tergolong sangat lemah.** Pada skala Landis dan Koch (1977), kappa 0,00 sampai 0,20 tergolong sangat lemah. Batas atas interval kepercayaan 95% pun hanya 0,28, masih jauh di bawah ambang kesepakatan sedang (0,41).
2. **Pasangan prioritas tinggi paling sulit.** Pada 89 pasangan prioritas tinggi, kappa hanya 0,029, hampir setara dengan kesepakatan karena kebetulan. Pada 56 pasangan prioritas sedang, kappa naik menjadi 0,347.
3. **Penilai lebih sepakat tentang perlu tidaknya perbaikan.** Bila keputusan disederhanakan menjadi "terima" atau "perbaiki", kappa naik menjadi 0,295. Ketidaksepakatan terbesar justru terletak pada jenis perbaikannya.
4. **Dua sumber ketidaksepakatan utama.** Dari 78 pasangan yang tidak disepakati, 29 berada di batas antara menerima pasangan dan merevisi terjemahan, dan 21 tertukar antara revisi penyelarasan dan revisi terjemahan. Penilai B juga memakai kategori `fragment_policy` sebanyak 12 kali, sedangkan penilai A tidak pernah memakainya. Pola ini menunjukkan bahwa definisi kategori keputusan perlu dipertegas.
5. **Aturan rekonsiliasi tidak mengubah kesimpulan.** Keempat skenario menghasilkan kappa 0,088 sampai 0,183, dan semuanya tergolong sangat lemah.
6. **Implikasi pemakaian.** Korpus paralel bersandar pada adjudikasi, bukan pada kesepakatan langsung. Hanya 182 pasangan dapat dianggap tervalidasi manusia, sedangkan 1.360 pasangan lainnya lebih tepat diperlakukan sebagai data silver. Korpus ini belum dapat dianggap gold-standard secara keseluruhan.
7. **Relevansi bagi tahap 2.** Temuan ini menegaskan pentingnya definisi kategori yang tegas dan contoh kasus batas sebelum anotasi ganda dimulai, termasuk pada [anotasi Universal Dependencies](../anotasi-ud/index.md).

## Berkas data

| Berkas | Isi | Status |
|---|---|---|
| [`btb_multigenre.csv`](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/data/btb_multigenre.csv) | Korpus multi-genre versi 2, 104 dokumen | Tersedia |
| [`btb_parallel_sentence.csv`](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/data/btb_parallel_sentence.csv) | Korpus paralel tingkat kalimat, 1.542 pasangan | Tersedia |
| [`iaa/`](https://github.com/FeliksMakarios/batak-toba-korpus/tree/main/data/iaa) | Laporan kesepakatan antaranotator, matriks konfusi, analisis sensitivitas, dan keputusan akhir 145 pasangan | Tersedia |
| `btb_bible.csv` | Korpus paralel Alkitab, satu pasal per kitab | Belum tersedia. Sisi Indonesianya memakai Terjemahan Baru (1974) dari Lembaga Alkitab Indonesia, dan izin redistribusinya belum dipastikan. |

## Skema data

Berkas `btb_multigenre.csv` versi 2 memakai sembilan kolom: `doc_id`, `title`, `text_bt`, `text_id`, `genre`, `subgenre`, `source_link`, `notes`, dan `is_parallel`. Kolom `doc_id` berformat `mg_001` sampai `mg_104` dan dipakai juga pada korpus paralel. Berkas `btb_parallel_sentence.csv` memakai kolom tersendiri, antara lain `pair_id`, `doc_id`, `toba_final`, `indo_final`, `review_status`, `gold_decision`, dan `validasi_manusia`.

Penjelasan setiap kolom tersedia pada [metadata/skema-kolom.md](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/metadata/skema-kolom.md) dan [data/README.md](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/data/README.md).

## Keterbatasan

1. Domain keagamaan sangat dominan, sekitar 75% kata Batak Toba.
2. Sub-korpus Alkitab baru memuat satu pasal per kitab, dan berkasnya belum disertakan sampai izin terjemahan Indonesianya dipastikan.
3. Pada korpus paralel tingkat kalimat, hanya 182 dari 1.542 pasangan yang divalidasi manusia, dan kesepakatan antaranotatornya sangat lemah. Korpus paralel ini bukan luaran yang dijanjikan pada tahap 1.
4. Data lisan belum tersedia.
5. Korpus belum memiliki anotasi linguistik. Anotasi Universal Dependencies sedang berjalan pada [tahap 2](../anotasi-ud/index.md).

## Dokumentasi

1. [Laporan teknis](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/laporan-teknis.md)
2. [Metode pengumpulan dan kurasi data](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pengumpulan-data.md)
3. [Pernyataan asal, lisensi, dan etika data](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pernyataan-data.md)
4. [Diagram alur pengolahan korpus](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/peta-alur-korpus.svg)
5. [Notebook alur lengkap, termasuk kesepakatan antaranotator dan adjudikasi](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/notebooks/alur_lengkap_korpus_batak_toba.ipynb)

## Lisensi dan sitasi

Data korpus berlisensi CC BY 4.0, sedangkan skrip dan notebook berlisensi MIT. Sebagian teks multi-genre berasal dari materi daring dengan pemilik hak cipta masing-masing, yang dicatat pada kolom `source_link`.

> Samosir, F. V. P. (2025). *Korpus Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-korpus>
