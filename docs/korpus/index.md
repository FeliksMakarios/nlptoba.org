---
title: Korpus Batak Toba (Tahap 1)
---

# Korpus Batak Toba (Tahap 1)

Korpus teks awal bahasa Batak Toba (`bbc`) beserta padanannya dalam bahasa Indonesia (`ind`). Korpus ini adalah luaran penelitian "Digitalisasi dan Praproses Korpus Bahasa Batak Toba sebagai Fondasi Pengembangan Model Bahasa Lokal Berbasis Deep Learning" (Penelitian Dosen Pemula, Universitas Pelita Harapan, 2025, No. P-020-PDP-FTI/VII/2025).

[:fontawesome-brands-github: Repositori batak-toba-korpus](https://github.com/FeliksMakarios/batak-toba-korpus){ .md-button .md-button--primary }

## Isi korpus

Korpus terdiri atas dua sub-korpus:

1. `btb_multigenre`: korpus multi-genre yang dikurasi secara manual dari berbagai sumber daring.
2. `btb_bible`: korpus paralel Alkitab Batak Toba (terjemahan 1894) dan padanannya dalam bahasa Indonesia.

| Sub-korpus | Satuan | Batak Toba | Indonesia |
|---|---|---:|---:|
| `btb_multigenre` | kalimat | 3.498 | 3.539 |
| `btb_multigenre` | token (perkiraan) | 67.680 | 60.866 |
| `btb_bible` | dokumen paralel | 520 | 520 |
| `btb_bible` | token (perkiraan) | 44.660 | 39.687 |
| **Total** | **token (perkiraan)** | **112.340** | **100.553** |

Jumlah token dihitung dengan tokenisasi berbasis spasi. Sisi Batak Toba melampaui target minimal 100.000 token pada proposal.

## Genre

| Genre | Sub-genre |
|---|---|
| Historical/Traditional | manuskrip, cerita rakyat, torsa, turian |
| Literary | puisi, pantun, umpasa, umpama |
| Religious | doa Kristen, agenda ibadah HKBP, Alkitab Batak Toba |
| Educational | ringkasan buku, abstrak artikel ilmiah |
| Contemporary Media | Wiki, artikel berita, artikel blog |

## Skema data

Kedua berkas korpus memakai delapan kolom yang sama: `title`, `text_bt`, `text_id`, `genre`, `subgenre`, `source_link`, `notes`, dan `is_parallel`. Penjelasan setiap kolom tersedia pada [metadata/skema-kolom.md](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/metadata/skema-kolom.md).

## Keterbatasan

1. Domain keagamaan masih dominan pada versi awal ini.
2. Sub-korpus Alkitab baru memuat satu pasal per kitab.
3. Korpus belum memiliki anotasi linguistik. Anotasi Universal Dependencies sedang berjalan pada [tahap 2](../anotasi-ud/index.md).

## Dokumentasi

1. [Laporan teknis](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/laporan-teknis.md)
2. [Metode pengumpulan dan kurasi data](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pengumpulan-data.md)
3. [Pernyataan asal, lisensi, dan etika data](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pernyataan-data.md)

## Lisensi dan sitasi

Data korpus berlisensi CC BY 4.0, sedangkan skrip dan notebook berlisensi MIT. Sebagian teks multi-genre berasal dari materi daring dengan pemilik hak cipta masing-masing, yang dicatat pada kolom `source_link`.

> Samosir, F. V. P. (2025). *Korpus Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-korpus>
