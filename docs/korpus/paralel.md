---
title: Korpus paralel
description: "Korpus paralel tingkat kalimat Batak Toba dan Indonesia: 1.542 pasangan, 182 divalidasi manusia, dan kesepakatan antaranotator dengan kappa 0,170."
---

<p class="nt-kicker">Tahap 1 · Korpus Batak Toba</p>

# Korpus Paralel Tingkat Kalimat

Berkas `btb_parallel_sentence.csv` memuat pasangan kalimat Batak Toba dan Indonesia dari sub-korpus multi-genre, tanpa Agenda HKBP. Pasangan dibentuk dengan penyelarasan otomatis dan audit. Sebanyak 145 pasangan yang ditandai bermasalah kemudian dinilai oleh dua penilai yang berbeda dari kedua penerjemah, dan perbedaan keputusan mereka diselesaikan melalui adjudikasi.

| Ukuran | Nilai |
|---|---:|
| Pasangan | 1.542 |
| Dokumen | 97 |
| Kata Batak Toba / Indonesia | 24.377 / 21.486 |
| Pasangan divalidasi manusia (`validasi_manusia = ya`) | 182 (11,8%) |
| Pasangan hasil penyelarasan otomatis yang lolos audit | 1.360 |

Pasangan tervalidasi manusia paling banyak berasal dari cerita rakyat (47) dan puisi (45). Doa dan peribahasa hampir tidak memilikinya.

## Kesepakatan antaranotator

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
