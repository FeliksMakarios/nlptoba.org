---
title: Batak Toba Corpus (Stage 1)
---

# Batak Toba Corpus (Stage 1)

An initial Batak Toba (`bbc`) text corpus with Indonesian (`ind`) counterparts. It is the output of the project "Digitalisation and Preprocessing of a Batak Toba Language Corpus as a Foundation for Deep Learning Based Local Language Models" (Beginning Lecturer Research Scheme, Universitas Pelita Harapan, 2025, No. P-020-PDP-FTI/VII/2025).

[:fontawesome-brands-github: batak-toba-korpus repository](https://github.com/FeliksMakarios/batak-toba-korpus){ .md-button .md-button--primary }

## Contents

The corpus has two sub-corpora:

1. `btb_multigenre`: a multi-genre corpus manually curated from online sources.
2. `btb_bible`: a parallel corpus of the Batak Toba Bible (1894 translation) and its Indonesian counterpart.

| Sub-corpus | Unit | Batak Toba | Indonesian |
|---|---|---:|---:|
| `btb_multigenre` | sentences | 3,498 | 3,539 |
| `btb_multigenre` | tokens (approx.) | 67,680 | 60,866 |
| `btb_bible` | parallel documents | 520 | 520 |
| `btb_bible` | tokens (approx.) | 44,660 | 39,687 |
| **Total** | **tokens (approx.)** | **112,340** | **100,553** |

Tokens are counted with whitespace tokenization. The Batak Toba side exceeds the proposal's target of 100,000 tokens.

## Genres

| Genre | Sub-genres |
|---|---|
| Historical/Traditional | manuscripts, folktales, torsa, turian |
| Literary | poems, pantun, umpasa, umpama |
| Religious | Christian prayers, HKBP liturgy, Batak Toba Bible |
| Educational | book summaries, research abstracts |
| Contemporary Media | Wiki, news articles, blog articles |

## Data schema

Both corpus files share eight columns: `title`, `text_bt`, `text_id`, `genre`, `subgenre`, `source_link`, `notes`, and `is_parallel`. Each column is described in [metadata/skema-kolom.md](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/metadata/skema-kolom.md) (in Indonesian).

## Limitations

1. The religious domain is still dominant in this first version.
2. The Bible sub-corpus contains only one chapter per book.
3. The corpus has no linguistic annotation yet. Universal Dependencies annotation is under way in [Stage 2](../anotasi-ud/index.md).

## Documentation (in Indonesian)

1. [Technical report](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/laporan-teknis.md)
2. [Data collection and curation](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pengumpulan-data.md)
3. [Data provenance, license, and ethics statement](https://github.com/FeliksMakarios/batak-toba-korpus/blob/main/docs/pernyataan-data.md)

## License and citation

The corpus data is released under CC BY 4.0, and scripts and notebooks under MIT. Some multi-genre texts come from online material owned by their respective rights holders, recorded in the `source_link` column.

> Samosir, F. V. P. (2025). *Korpus Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-korpus>
