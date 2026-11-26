---
icon: material/sitemap-outline
dataset: ud
description: "Tahap 2 proyek NLP Batak Toba: pedoman anotasi Universal Dependencies, 250 kalimat pilot, dan keputusan utama untuk predikat awal serta diatesis Austronesia."
title: Anotasi Universal Dependencies (Tahap 2)
---

<p class="nt-kicker">Tahun I · Semester 2 · 2026</p>

# Anotasi Universal Dependencies (Tahap 2)

Penelitian "Pengembangan Pedoman Anotasi Universal Dependencies untuk Bahasa Batak Toba dan Pengujian Awal pada Korpus Kecil" (Penelitian Dosen Pemula, Universitas Pelita Harapan, Juli sampai Desember 2026). Tahap ini melanjutkan [korpus tahap 1](../korpus/index.md) menuju anotasi morfosintaksis berbasis Universal Dependencies (UD) versi 2.

[:fontawesome-brands-github: Repositori batak-toba-corpus-v2](https://github.com/FeliksMakarios/batak-toba-corpus-v2){ .md-button .md-button--primary }

## Mengapa Batak Toba perlu pedoman khusus

UD menyediakan kategori kelas kata, fitur morfologis, dan relasi dependensi yang berlaku lintas bahasa. Kategori itu sengaja dibuat umum, sehingga dua ciri tipologis Batak Toba tidak otomatis terpetakan:

1. **Urutan predikat di awal.** Predikat lazim muncul sebelum subjek, misalnya *Mangallang dengke do si Polan* ‘Si Polan sedang makan ikan’.
2. **Sistem diatesis Austronesia.** Verba berprefiks *maN-* dan *di-/hu-/ta-* menentukan argumen mana yang menjadi subjek, dan aktor pada klausa *di-* tetap terikat erat pada verba.

Sampai penelitian ini dimulai, Batak Toba belum memiliki treebank, anotasi kelas kata dan dependensi, maupun pedoman anotasi.

## Alur penelitian

<div class="nt-flow">
  <div class="nt-step nt-y1"><span class="nt-step-title">Korpus Tahap 1</span><span class="nt-step-note">Korpus multi-genre hasil hibah 2025.</span><span class="nt-step-state">Selesai</span></div>
  <div class="nt-step nt-y2"><span class="nt-step-title">Sintesis Keputusan</span><span class="nt-step-note">Kajian UD v2, UD Indonesia, Tagalog, dan Cebuano.</span><span class="nt-step-state">Selesai</span></div>
  <div class="nt-step nt-y3"><span class="nt-step-title">Pedoman v1.0 sampai v1.2</span><span class="nt-step-note">Pedoman dan contoh berlabel, diperbarui dengan masukan anotator.</span><span class="nt-step-state">Selesai</span></div>
  <div class="nt-step nt-y4"><span class="nt-step-title">Anotasi Awal</span><span class="nt-step-note">250 kalimat oleh dua anotator, 5 Oktober sampai 21 November 2026. Satu anotator belum menyelesaikan seluruh kalimat.</span><span class="nt-step-state">Selesai sebagian</span></div>
  <div class="nt-step nt-y5 is-run"><span class="nt-step-title">Evaluasi dan Revisi</span><span class="nt-step-note">Kesepakatan antaranotator sementara sudah ada. Adjudikasi dan pedoman v2.0 menyusul.</span><span class="nt-step-state">Berjalan</span></div>
</div>

## Kesepakatan antaranotator (sementara)

Anotasi ganda 250 kalimat pilot berlangsung 5 Oktober sampai 21 November 2026. Hasil kedua anotator diperiksa narasumber penutur asli Bahasa Batak Toba pada 24 November 2026. Satu anotator belum menyelesaikan seluruh kalimat, sehingga kesepakatan sementara dihitung pada 90 kalimat (1.247 token) yang lengkap pada kedua anotator.

| Ukuran | Kesepakatan | Kappa Cohen | Patokan kappa treebank Tagalog |
|---|---:|---:|---:|
| Kelas kata (UPOS) | 87,8% | 0,864 | 0,75 |
| Relasi dependensi (DEPREL) | 76,3% | 0,749 | 0,68 |
| UAS (kata induk sama) | 84,0% | | |
| LAS (kata induk dan relasi sama) | 68,5% | | |

!!! note "Angka sementara"
    Angka ini sementara dan baru mewakili 90 dari 250 kalimat. Kesepakatan akan dihitung ulang pada 250 kalimat setelah anotasi lengkap, lalu diikuti adjudikasi dan pedoman versi 2.0. Berkas CoNLL-U per anotator tidak diterbitkan. Korpus dirilis setelah adjudikasi.

Tafsir sementara:

1. **Kedua kappa sudah di atas patokan.** Pedoman merujuk treebank Tagalog UD-NewsCrawl dengan kappa 0,75 untuk kelas kata dan 0,68 untuk relasi. Sampelnya baru 90 kalimat, jadi angka ini belum final.
2. **Ketidaksepakatan terbesar ada pada label relasi, bukan kata induk.** UAS 84,0% tetapi LAS 68,5%, sehingga kedua anotator umumnya sepakat tentang kata induk dan berbeda pada nama relasinya.
3. **Penyebab utamanya jelas.** Perbedaan terbanyak menyangkut partikel *do*, *ma*, *pe*, subjek verba *di-* (`nsubj` dan `nsubj:pass`), dan penanda *na*. Pada salah satu anotator, label yang tidak ada di Lampiran A pedoman dipakai secara sistematis.
4. **Lembar kerja perlu diselaraskan.** Daftar pilihan DEPREL di lembar kerja belum selaras dengan Lampiran A pedoman, misalnya belum memuat `obj:agent`. Daftar ini diselaraskan sebelum putaran berikutnya.

Langkah berikutnya: penyelesaian anotasi, penghitungan ulang kesepakatan pada 250 kalimat, adjudikasi bersama narasumber penutur asli, pedoman versi 2.0, lalu rilis korpus 250 kalimat hasil adjudikasi.

[:fontawesome-brands-github: Laporan kesepakatan sementara](https://github.com/FeliksMakarios/batak-toba-corpus-v2/blob/main/evaluation/iaa_pilot_sementara.md){ .md-button }

## Luaran

<div class="grid cards" markdown>

-   :material-book-education:{ .lg .middle } **Pedoman anotasi v1.2**

    ---

    Aturan pemberian label kelas kata, fitur, dan relasi dependensi untuk Batak Toba, berbasis Nababan (1981).

    [:octicons-arrow-right-24: Baca pedoman](pedoman.md)

-   :material-format-list-text:{ .lg .middle } **250 kalimat pilot**

    ---

    Kalimat dari 47 dokumen dan lima genre, dipilih untuk anotasi ganda.

    [:octicons-arrow-right-24: Jelajahi kalimat](kalimat-pilot.md)

-   :material-file-tree:{ .lg .middle } **Pohon dependensi**

    ---

    Visualisasi contoh anotasi dari pedoman. Kalimat korpus menyusul setelah adjudikasi selesai.

    [:octicons-arrow-right-24: Lihat pohon](pohon.md)

-   :material-table-check:{ .lg .middle } **Korpus paralel tingkat kalimat**

    ---

    Versi kerja v1 (1.505 unit) menjadi sumber 250 kalimat pilot. Sebagai korpus paralel, versi ini sudah digantikan oleh korpus final berisi 1.542 pasangan, 182 di antaranya divalidasi manusia.

    [:octicons-arrow-right-24: Lihat korpus final](../korpus/paralel.md)

</div>

## Keputusan utama pedoman

Kelas kata dan konstruksi mengikuti *A Grammar of Toba-Batak* (Nababan, 1981).

1. Akar kalimat adalah predikator. Kalimat tanpa verba tetap tanpa kopula.
2. Verba berprefiks *di-*, *hu-*, *ta-* dan bentuk pasif lain diberi `Voice=Pass`.
3. Subjek klausa, termasuk subjek klausa pasif, diberi `nsubj`.
4. Aktor yang langsung mengikuti verba pasif diberi `obj:agent`. Aktor bertanda *ni* diberi `obl:agent`.
5. Partikel predikatif *do*, *ma*, *pe* diberi `PART` dengan relasi `discourse`.
6. Penanda atributif *na* diberi `PART` dengan relasi `mark`.
7. Sufiks pronominal (*-na*, *-mu*, *-hu/-ku*) tidak dipisah dan dicatat dengan `Person[psor]` serta `Number[psor]`.
8. Kalimat majemuk setara dan kalimat kompleks tetap punya satu root. Isi setiap klausa menunjuk ke predikator klausanya sendiri.
9. *laos* selalu diberi `ADV` dengan relasi `advmod` ke predikator klausanya.

Butir 8 dan 9 ditambahkan pada versi 1.1 berdasarkan masukan anotator. Versi 1.2 menambahkan daftar istilah bernomor dan indeks istilah tanpa mengubah aturan label. Versi 1.0 tersimpan sebagai [arsip](https://github.com/FeliksMakarios/batak-toba-corpus-v2/tree/main/anotasi-ud/pedoman/arsip).

## Lisensi dan sitasi

Pedoman dan data tahap 2 berlisensi CC BY-SA 4.0, sedangkan skrip berlisensi MIT.

> Samosir, F. V. P. (2026). *batak-toba-corpus-v2: Pedoman Anotasi Universal Dependencies untuk Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-corpus-v2>
