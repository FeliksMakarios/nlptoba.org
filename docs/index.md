---
title: Beranda
---

# NLP Batak Toba

Proyek jangka panjang pembangunan ekosistem pemrosesan bahasa alami (NLP) untuk bahasa Batak Toba. Batak Toba adalah bahasa Austronesia dengan lebih dari satu juta penutur di sekitar Danau Toba, Sumatera Utara. Tata bahasanya sudah terdokumentasi dengan baik, tetapi sumber daya digitalnya untuk teknologi bahasa masih sangat terbatas.

Proyek ini dijalankan di Program Studi Informatika, Universitas Pelita Harapan. Seluruh data, pedoman, dan kode dibuka untuk dipakai ulang oleh komunitas ilmiah dan penutur.

## Tahap penelitian

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } **Tahap 1 · Korpus Batak Toba**

    ---

    <span class="nt-status nt-status--done">SELESAI · 2025</span>

    Korpus teks Batak Toba dan Indonesia dari lima genre, dengan lebih dari 112.000 token Batak Toba.

    [:octicons-arrow-right-24: Lihat korpus](korpus/index.md)

-   :material-file-tree:{ .lg .middle } **Tahap 2 · Anotasi Universal Dependencies**

    ---

    <span class="nt-status nt-status--run">BERJALAN · 2026</span>

    Pedoman anotasi UD v1.0 dan 250 kalimat pilot. Anotasi ganda oleh dua anotator dimulai 5 Oktober 2026.

    [:octicons-arrow-right-24: Lihat anotasi UD](anotasi-ud/index.md)

</div>

## Peta jalan lima tahun

| Tahun | Fokus | Status |
|---|---|---|
| I | Pengumpulan dan praproses korpus (semester 1), penyusunan pedoman anotasi dan anotasi awal 250 kalimat (semester 2) | <span class="nt-status nt-status--run">BERJALAN</span> |
| II | Perluasan anotasi untuk tugas NLP lanjutan, terutama korpus paralel Batak Toba dan Indonesia untuk penerjemahan mesin, serta penjaminan mutu anotasi | <span class="nt-status nt-status--plan">RENCANA</span> |
| III | Penyiapan pra-pelatihan model monolingual Batak Toba dan strategi transfer learning dari bahasa sumber berdaya tinggi | <span class="nt-status nt-status--plan">RENCANA</span> |
| IV | Augmentasi data, benchmarking, dan analisis bias | <span class="nt-status nt-status--plan">RENCANA</span> |
| V | Validasi komunitas, perencanaan keberlanjutan, dan integrasi modul pendidikan | <span class="nt-status nt-status--plan">RENCANA</span> |

## Repositori

1. [batak-toba-korpus](https://github.com/FeliksMakarios/batak-toba-korpus): korpus tahap 1.
2. [batak-toba-corpus-v2](https://github.com/FeliksMakarios/batak-toba-corpus-v2): pedoman anotasi UD dan korpus pilot tahap 2.
3. [nlptoba.org](https://github.com/FeliksMakarios/nlptoba.org): kode situs ini. Isi situs dibangun ulang otomatis dari dua repositori di atas.
