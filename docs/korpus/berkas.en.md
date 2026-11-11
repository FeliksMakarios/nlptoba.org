---
title: Files and documentation
description: "Data files of the Stage 1 Batak Toba corpus, column schema, and research documentation."
---

<p class="nt-kicker">Stage 1 · Batak Toba Corpus</p>

# Data Files and Documentation

## Data files

| File | Contents | Status |
|---|---|---|
| [`btb_multigenre.csv`](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/data/btb_multigenre.csv) | Multi-genre corpus, version 2, 104 documents | Available |
| [`btb_parallel_sentence.csv`](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/data/btb_parallel_sentence.csv) | Sentence-level parallel corpus, 1,542 pairs | Available |
| [`iaa/`](https://github.com/FeliksMakarios/batak-toba-korpus/tree/main/data/iaa) | Inter-annotator agreement report, confusion matrix, sensitivity analysis, and final decisions for 145 pairs | Available |
| `btb_bible.csv` | Parallel Bible corpus, one chapter per book | Not yet available. Its Indonesian side uses the Terjemahan Baru (1974) translation by the Indonesian Bible Society, and redistribution permission has not yet been confirmed. |

## Data schema

Version 2 of `btb_multigenre.csv` has nine columns: `doc_id`, `title`, `text_bt`, `text_id`, `genre`, `subgenre`, `source_link`, `notes`, and `is_parallel`. The `doc_id` values run from `mg_001` to `mg_104` and are also used in the parallel corpus. `btb_parallel_sentence.csv` has its own columns, including `pair_id`, `doc_id`, `toba_final`, `indo_final`, `review_status`, `gold_decision`, and `validasi_manusia`.

Each column is described in [metadata/skema-kolom.md](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/metadata/skema-kolom.md) (in Indonesian) and [data/README.md](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/data/README.md).

## Documentation (in Indonesian)

1. [Technical report](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/laporan-teknis.md)
2. [Data collection and curation](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pengumpulan-data.md)
3. [Data provenance, license, and ethics statement](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pernyataan-data.md)
4. [Corpus processing flow diagram](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/peta-alur-korpus.svg)
5. [Full-flow notebook, including inter-annotator agreement and adjudication](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/notebooks/alur_lengkap_korpus_batak_toba.ipynb)
