---
title: Batak Toba Corpus (Stage 1)
---

<p class="nt-kicker">Year I · Semester 1 · 2025</p>

# Batak Toba Corpus (Stage 1)

An initial Batak Toba (`bbc`) text corpus with Indonesian (`ind`) counterparts. It is the output of the project "Digitalisation and Preprocessing of a Batak Toba Language Corpus as a Foundation for Deep Learning Based Local Language Models" (Beginning Lecturer Research Scheme, Universitas Pelita Harapan, 2025, No. P-020-PDP-FTI/VII/2025).

[:fontawesome-brands-github: batak-toba-korpus repository](https://github.com/FeliksMakarios/batak-toba-korpus){ .md-button .md-button--primary }

## Data collection workflow

<div class="nt-flow">
  <div class="nt-step nt-y1"><span class="nt-step-title">Source inventory</span><span class="nt-step-note">Identifying online sources and defining a five-genre taxonomy.</span></div>
  <div class="nt-step nt-y2"><span class="nt-step-title">Manual curation</span><span class="nt-step-note">Targeted search and recording with one shared template.</span></div>
  <div class="nt-step nt-y3"><span class="nt-step-title">Digitisation</span><span class="nt-step-note">OCR for PDF and scanned documents, checked by hand.</span></div>
  <div class="nt-step nt-y4"><span class="nt-step-title">Translation</span><span class="nt-step-note">Two native speaker consultants transcribe and translate texts.</span></div>
  <div class="nt-step nt-y5"><span class="nt-step-title">Checking and documentation</span><span class="nt-step-note">Spot checks, metadata, and a technical report.</span></div>
</div>

!!! info "Change from the original plan"
    The proposal planned large-scale crawling and scraping. In practice the approach was narrowed to manual search and targeted curation for reasons of ethics, copyright, data quality, and time. The corpus is therefore smaller, but better curated and documented. Oral data is planned for a later update.

## Contents

The corpus has two sub-corpora:

1. `btb_multigenre`: a multi-genre corpus manually curated from online sources.
2. `btb_bible`: a parallel corpus of the Batak Toba Bible (1894 translation) and its Indonesian counterpart.

Counts depend on how punctuation is treated, so token counts are reported with three methods:

1. **Words**: letter or digit sequences only. Punctuation is not counted.
2. **Whitespace tokens**: text split on spaces. Punctuation stays attached to words.
3. **NLTK tokens**: lowercased text split with NLTK `word_tokenize`. Each punctuation mark counts as a separate token.

| Sub-corpus | Unit | Batak Toba | Indonesian |
|---|---|---:|---:|
| `btb_multigenre` | documents | 104 | 104 |
| `btb_multigenre` | sentences or lines | 4,429 | 4,447 |
| `btb_multigenre` | words | 59,443 | 53,166 |
| `btb_multigenre` | NLTK tokens | 67,680 | 60,866 |
| `btb_bible` | chapters (verses) | 66 (1,594) | 66 (1,594) |
| `btb_bible` | words | 38,509 | 34,320 |
| `btb_bible` | NLTK tokens | 44,785 | 39,687 |
| **Total** | **words** | **97,952** | **87,486** |
| **Total** | **whitespace tokens** | **98,235** | **85,990** |
| **Total** | **NLTK tokens** | **112,465** | **100,553** |

!!! note "The 100,000 Batak Toba token target"
    The proposal target is met when punctuation marks are counted as tokens, giving 112,465 NLTK tokens. Counting words only, the Batak Toba side has 97,952 words, about 2% below the target. Both figures are reported so that readers can judge for themselves.

!!! info "Corrections to the initial figures"
    The initial version listed 520 parallel documents for the Bible sub-corpus. That figure came from an incorrect grouping in the old analysis notebook. The actual count is 66 chapters (1,594 verses). Multi-genre sentence counts now come from the v2 pipeline segmentation, which also splits poems and liturgy by line, so they differ from the 3,498 sentences reported initially.

## Genres

| Genre | Sub-genre | Documents | Batak Toba words |
|---|---|---:|---:|
| Historical/Traditional | Folktales | 2 | 1,796 |
| Literary | Peribahasa/Umpama (proverbs) | 46 | 356 |
| Literary | Poems | 7 | 741 |
| Religious | Prayers (Christian prayers) | 3 | 210 |
| Religious | Ritual Text (HKBP liturgical agenda) | 6 | 35,097 |
| Religious | Bible (`btb_bible`) | 66 chapters | 38,509 |
| Educational | Book Summary (summaries and reviews) | 8 | 4,120 |
| Educational | Abstract (journal abstracts) | 9 | 1,915 |
| Contemporary Media | Wiki | 7 | 6,246 |
| Contemporary Media | News Article | 9 | 3,884 |
| Contemporary Media | Blog Articles | 7 | 5,078 |

The religious domain is strongly dominant. The HKBP agenda, prayers, and the Bible account for about 75% of Batak Toba words, and the HKBP agenda alone accounts for 59% of the words in the multi-genre sub-corpus.

## Sentence-level parallel corpus

`btb_parallel_sentence.csv` holds Batak Toba and Indonesian sentence pairs from the multi-genre sub-corpus, excluding the HKBP agenda. Pairs were built by automatic alignment and auditing. The 145 pairs flagged as problematic were then judged by two raters who are different from the two translators, and their disagreements were resolved by adjudication.

| Measure | Value |
|---|---:|
| Pairs | 1,542 |
| Documents | 97 |
| Batak Toba / Indonesian words | 24,377 / 21,486 |
| Human-validated pairs (`validasi_manusia = ya`) | 182 (11.8%) |
| Automatically aligned pairs that passed the audit | 1,360 |

Most human-validated pairs come from folktales (47) and poems (45). Prayers and proverbs have almost none.

### Inter-annotator agreement

Agreement is measured with Cohen's kappa on the 145 flagged pairs. Each rater chose one decision per pair, such as accepting the pair, revising the alignment, or revising the translation.

| Scenario | Agreement | Cohen's kappa |
|---|---:|---:|
| Original labels of both raters | 37.9% | 0.088 |
| After label reconciliation by rater A (basis of adjudication) | 46.2% | **0.170** (95% CI 0.06 to 0.28) |
| Reconciliation rule applied to both raters | 51.7% | 0.156 |
| As above, ignoring punctuation-only differences | 49.0% | 0.183 |

**What the figures mean**

1. **Slight agreement.** On the Landis and Koch (1977) scale, kappa between 0.00 and 0.20 is slight. Even the upper bound of the 95% confidence interval is only 0.28, well below the threshold for moderate agreement (0.41).
2. **High-priority pairs are the hardest.** On the 89 high-priority pairs, kappa is only 0.029, close to chance agreement. On the 56 medium-priority pairs, it rises to 0.347.
3. **Raters agree more on whether a fix is needed.** When decisions are collapsed to "accept" or "fix", kappa rises to 0.295. Most disagreement is about the kind of fix.
4. **Two main sources of disagreement.** Of the 78 pairs without agreement, 29 fall on the boundary between accepting a pair and revising its translation, and 21 swap alignment revision with translation revision. Rater B also used the `fragment_policy` category 12 times, while rater A never used it. This pattern suggests that the decision categories need sharper definitions.
5. **The reconciliation rule does not change the conclusion.** All four scenarios give kappa between 0.088 and 0.183, all of them slight.
6. **What this means for use.** The parallel corpus relies on adjudication rather than direct agreement. Only 182 pairs can be considered human-validated, and the other 1,360 pairs are better treated as silver data. The corpus cannot be treated as gold-standard as a whole.
7. **Relevance for Stage 2.** These findings underline the need for clear category definitions and boundary-case examples before double annotation starts, including for the [Universal Dependencies annotation](../anotasi-ud/index.md).

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

## Limitations

1. The religious domain is strongly dominant, at about 75% of Batak Toba words.
2. The Bible sub-corpus contains only one chapter per book, and its file is withheld until permission for the Indonesian translation is confirmed.
3. In the sentence-level parallel corpus, only 182 of 1,542 pairs are human-validated, and inter-annotator agreement is slight. This parallel corpus is not a promised deliverable of Stage 1.
4. Oral data is not yet available.
5. The corpus has no linguistic annotation yet. Universal Dependencies annotation is under way in [Stage 2](../anotasi-ud/index.md).

## Documentation (in Indonesian)

1. [Technical report](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/laporan-teknis.md)
2. [Data collection and curation](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pengumpulan-data.md)
3. [Data provenance, license, and ethics statement](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pernyataan-data.md)
4. [Corpus processing flow diagram](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/peta-alur-korpus.svg)
5. [Full-flow notebook, including inter-annotator agreement and adjudication](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/notebooks/alur_lengkap_korpus_batak_toba.ipynb)

## License and citation

The corpus data is released under CC BY 4.0, and scripts and notebooks under MIT. Some multi-genre texts come from online material owned by their respective rights holders, recorded in the `source_link` column.

> Samosir, F. V. P. (2025). *Korpus Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-korpus>
