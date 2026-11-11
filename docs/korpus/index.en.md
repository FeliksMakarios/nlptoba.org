---
dataset: korpus
description: "Stage 1 Batak Toba and Indonesian text corpus: 97,952 Batak Toba words across five genres, counted with three methods, with genre distribution and limitations."
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

<figure class="nt-chart">
  <figcaption>Batak Toba words by genre <span>(97,952 words, hover or focus a bar for details)</span></figcaption>
  <ol class="nt-bars">
    <li tabindex="0" aria-label="Religious: 73,816 words, 75.4%"><span class="nt-bar-name">Religious</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 100.0%"></span></span><span class="nt-bar-val" aria-hidden="true">75.4%</span><span class="nt-bar-tip" aria-hidden="true">73,816 words · prayers, HKBP agenda, and Bible</span></li>
    <li tabindex="0" aria-label="Contemporary Media: 15,208 words, 15.5%"><span class="nt-bar-name">Contemporary Media</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 20.6%"></span></span><span class="nt-bar-val" aria-hidden="true">15.5%</span><span class="nt-bar-tip" aria-hidden="true">15,208 words · 23 documents</span></li>
    <li tabindex="0" aria-label="Educational: 6,035 words, 6.2%"><span class="nt-bar-name">Educational</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 8.2%"></span></span><span class="nt-bar-val" aria-hidden="true">6.2%</span><span class="nt-bar-tip" aria-hidden="true">6,035 words · 17 documents</span></li>
    <li tabindex="0" aria-label="Historical/Traditional: 1,796 words, 1.8%"><span class="nt-bar-name">Historical/Traditional</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 2.4%"></span></span><span class="nt-bar-val" aria-hidden="true">1.8%</span><span class="nt-bar-tip" aria-hidden="true">1,796 words · 2 documents</span></li>
    <li tabindex="0" aria-label="Literary: 1,097 words, 1.1%"><span class="nt-bar-name">Literary</span><span class="nt-bar-track" aria-hidden="true"><span class="nt-bar-fill" style="--w: 1.5%"></span></span><span class="nt-bar-val" aria-hidden="true">1.1%</span><span class="nt-bar-tip" aria-hidden="true">1,097 words · 53 documents</span></li>
  </ol>
</figure>

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

## Limitations

1. The religious domain is strongly dominant, at about 75% of Batak Toba words.
2. The Bible sub-corpus contains only one chapter per book, and its file is withheld until permission for the Indonesian translation is confirmed.
3. In the sentence-level parallel corpus, only 182 of 1,542 pairs are human-validated, and inter-annotator agreement is slight. This parallel corpus is not a promised deliverable of Stage 1.
4. Oral data is not yet available.
5. The corpus has no linguistic annotation yet. Universal Dependencies annotation is under way in [Stage 2](../anotasi-ud/index.md).

## More pages

<div class="grid cards" markdown>

-   :material-swap-horizontal:{ .lg .middle } **Parallel corpus and inter-annotator agreement**

    ---

    1,542 Batak Toba and Indonesian sentence pairs, 182 of them human-validated, with an interpretation of kappa 0.170.

    [:octicons-arrow-right-24: View the parallel corpus](paralel.md)

-   :material-download:{ .lg .middle } **Data files, schema, and documentation**

    ---

    The CSV files available, the columns of each file, and links to the technical report.

    [:octicons-arrow-right-24: View the files](berkas.md)

</div>

## License and citation

The corpus data is released under CC BY 4.0, and scripts and notebooks under MIT. Some multi-genre texts come from online material owned by their respective rights holders, recorded in the `source_link` column.

> Samosir, F. V. P. (2025). *Korpus Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-korpus>
