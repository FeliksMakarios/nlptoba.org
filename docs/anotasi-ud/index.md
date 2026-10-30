---
title: Anotasi Universal Dependencies (Tahap 2)
---

# Anotasi Universal Dependencies (Tahap 2)

Penelitian "Pengembangan Pedoman Anotasi Universal Dependencies untuk Bahasa Batak Toba dan Pengujian Awal pada Korpus Kecil" (Penelitian Dosen Pemula, Universitas Pelita Harapan, Juli sampai Desember 2026). Tahap ini melanjutkan [korpus tahap 1](../korpus/index.md) menuju anotasi morfosintaksis berbasis Universal Dependencies (UD) versi 2.

[:fontawesome-brands-github: Repositori batak-toba-corpus-v2](https://github.com/FeliksMakarios/batak-toba-corpus-v2){ .md-button .md-button--primary }

## Mengapa Batak Toba perlu pedoman khusus

UD menyediakan kategori kelas kata, fitur morfologis, dan relasi dependensi yang berlaku lintas bahasa. Kategori itu sengaja dibuat umum, sehingga dua ciri tipologis Batak Toba tidak otomatis terpetakan:

1. **Urutan predikat di awal.** Predikat lazim muncul sebelum subjek, misalnya *Mangallang dengke do si Polan* ‘Si Polan sedang makan ikan’.
2. **Sistem diatesis Austronesia.** Verba berprefiks *maN-* dan *di-/hu-/ta-* menentukan argumen mana yang menjadi subjek, dan aktor pada klausa *di-* tetap terikat erat pada verba.

Sampai penelitian ini dimulai, Batak Toba belum memiliki treebank, anotasi kelas kata dan dependensi, maupun pedoman anotasi.

## Status

| Tahap metode | Status |
|---|---|
| 1. Sintesis keputusan anotasi dari literatur | <span class="nt-status nt-status--done">SELESAI</span> |
| 2. Perumusan pedoman versi awal | <span class="nt-status nt-status--done">SELESAI</span> versi 1.0 |
| 3. Anotasi rintisan 250 kalimat oleh dua anotator | <span class="nt-status nt-status--run">BERJALAN</span> mulai 5 Oktober 2026 |
| 4. Evaluasi kesepakatan antaranotator dan revisi pedoman | <span class="nt-status nt-status--plan">RENCANA</span> November 2026 |

## Luaran

<div class="grid cards" markdown>

-   :material-book-education:{ .lg .middle } **Pedoman anotasi v1.0**

    ---

    Aturan pemberian label kelas kata, fitur, dan relasi dependensi untuk Batak Toba, berbasis Nababan (1981).

    [:octicons-arrow-right-24: Baca pedoman](pedoman.md)

-   :material-format-list-text:{ .lg .middle } **250 kalimat pilot**

    ---

    Kalimat dari 47 dokumen dan lima genre, dipilih untuk anotasi ganda.

    [:octicons-arrow-right-24: Jelajahi kalimat](kalimat-pilot.md)

-   :material-file-tree:{ .lg .middle } **Pohon dependensi**

    ---

    Visualisasi contoh anotasi dari pedoman. Kalimat korpus menyusul setelah anotasi selesai.

    [:octicons-arrow-right-24: Lihat pohon](pohon.md)

-   :material-table-check:{ .lg .middle } **Korpus revisi penyelarasan v1**

    ---

    Korpus paralel hasil audit penyelarasan: 1.505 unit dari 1.494 baris asal.

    [:octicons-arrow-right-24: Lihat di GitHub](https://github.com/FeliksMakarios/batak-toba-corpus-v2/tree/main/anotasi-ud/korpus-revisi)

</div>

## Keputusan utama pedoman v1.0

Kelas kata dan konstruksi mengikuti *A Grammar of Toba-Batak* (Nababan, 1981).

1. Akar kalimat adalah predikator. Kalimat tanpa verba tetap tanpa kopula.
2. Verba berprefiks *di-*, *hu-*, *ta-* dan bentuk pasif lain diberi `Voice=Pass`.
3. Subjek klausa, termasuk subjek klausa pasif, diberi `nsubj`.
4. Aktor yang langsung mengikuti verba pasif diberi `obj:agent`. Aktor bertanda *ni* diberi `obl:agent`.
5. Partikel predikatif *do*, *ma*, *pe* diberi `PART` dengan relasi `discourse`.
6. Penanda atributif *na* diberi `PART` dengan relasi `mark`.
7. Sufiks pronominal (*-na*, *-mu*, *-hu/-ku*) tidak dipisah dan dicatat dengan `Person[psor]` serta `Number[psor]`.

## Lisensi dan sitasi

Pedoman dan data tahap 2 berlisensi CC BY-SA 4.0, sedangkan skrip berlisensi MIT.

> Samosir, F. V. P. (2026). *batak-toba-corpus-v2: Pedoman Anotasi Universal Dependencies untuk Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-corpus-v2>
