---
dataset: korpus
description: "Korpus teks Batak Toba dan Indonesia tahap 1: 97.952 kata Batak Toba dari lima genre, dihitung dengan tiga metode, beserta sebaran genre dan keterbatasannya."
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

<figure class="nt-chart">
  <figcaption>Kata Batak Toba per genre <span>(97.952 kata, arahkan kursor atau fokus ke batang untuk rincian)</span></figcaption>
  <ol class="nt-bars">
    <li tabindex="0" aria-label="Religious: 73.816 kata, 75,4%"><span class="nt-bar-name">Religious</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 100.0%"></span></span><span class="nt-bar-val" aria-hidden="true">75,4%</span><span class="nt-bar-tip" aria-hidden="true">73.816 kata · doa, Agenda HKBP, dan Alkitab</span></li>
    <li tabindex="0" aria-label="Contemporary Media: 15.208 kata, 15,5%"><span class="nt-bar-name">Contemporary Media</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 20.6%"></span></span><span class="nt-bar-val" aria-hidden="true">15,5%</span><span class="nt-bar-tip" aria-hidden="true">15.208 kata · 23 dokumen</span></li>
    <li tabindex="0" aria-label="Educational: 6.035 kata, 6,2%"><span class="nt-bar-name">Educational</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 8.2%"></span></span><span class="nt-bar-val" aria-hidden="true">6,2%</span><span class="nt-bar-tip" aria-hidden="true">6.035 kata · 17 dokumen</span></li>
    <li tabindex="0" aria-label="Historical/Traditional: 1.796 kata, 1,8%"><span class="nt-bar-name">Historical/Traditional</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 2.4%"></span></span><span class="nt-bar-val" aria-hidden="true">1,8%</span><span class="nt-bar-tip" aria-hidden="true">1.796 kata · 2 dokumen</span></li>
    <li tabindex="0" aria-label="Literary: 1.097 kata, 1,1%"><span class="nt-bar-name">Literary</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 1.5%"></span></span><span class="nt-bar-val" aria-hidden="true">1,1%</span><span class="nt-bar-tip" aria-hidden="true">1.097 kata · 53 dokumen</span></li>
  </ol>
</figure>

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

## Keterbatasan

1. Domain keagamaan sangat dominan, sekitar 75% kata Batak Toba.
2. Sub-korpus Alkitab baru memuat satu pasal per kitab, dan berkasnya belum disertakan sampai izin terjemahan Indonesianya dipastikan.
3. Pada korpus paralel tingkat kalimat, hanya 182 dari 1.542 pasangan yang divalidasi manusia, dan kesepakatan antaranotatornya sangat lemah. Korpus paralel ini bukan luaran yang dijanjikan pada tahap 1.
4. Data lisan belum tersedia.
5. Korpus belum memiliki anotasi linguistik. Anotasi Universal Dependencies sedang berjalan pada [tahap 2](../anotasi-ud/index.md).

## Halaman lain

<div class="grid cards" markdown>

-   :material-swap-horizontal:{ .lg .middle } **Korpus paralel dan kesepakatan antaranotator**

    ---

    1.542 pasangan kalimat Batak Toba dan Indonesia, 182 di antaranya divalidasi manusia, beserta tafsir kappa 0,170.

    [:octicons-arrow-right-24: Lihat korpus paralel](paralel.md)

-   :material-download:{ .lg .middle } **Berkas data, skema, dan dokumentasi**

    ---

    Berkas CSV yang tersedia, kolom setiap berkas, dan tautan ke laporan teknis.

    [:octicons-arrow-right-24: Lihat berkas](berkas.md)

</div>

## Lisensi dan sitasi

Data korpus berlisensi CC BY 4.0, sedangkan skrip dan notebook berlisensi MIT. Sebagian teks multi-genre berasal dari materi daring dengan pemilik hak cipta masing-masing, yang dicatat pada kolom `source_link`.

> Samosir, F. V. P. (2025). *Korpus Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-korpus>
