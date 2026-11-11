---
title: Berkas dan dokumentasi
description: "Berkas data korpus Batak Toba tahap 1, skema kolom, dan dokumentasi penelitian."
---

<p class="nt-kicker">Tahap 1 · Korpus Batak Toba</p>

# Berkas Data dan Dokumentasi

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

## Dokumentasi

1. [Laporan teknis](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/laporan-teknis.md)
2. [Metode pengumpulan dan kurasi data](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pengumpulan-data.md)
3. [Pernyataan asal, lisensi, dan etika data](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pernyataan-data.md)
4. [Diagram alur pengolahan korpus](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/peta-alur-korpus.svg)
5. [Notebook alur lengkap, termasuk kesepakatan antaranotator dan adjudikasi](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/notebooks/alur_lengkap_korpus_batak_toba.ipynb)
