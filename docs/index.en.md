---
title: Home
---

# Batak Toba NLP

A long-term project to build a natural language processing (NLP) ecosystem for Batak Toba, an Austronesian language with more than one million speakers around Lake Toba, North Sumatra. Its grammar is well documented, yet its digital resources for language technology remain very limited.

The project is run at the Informatics Study Program, Universitas Pelita Harapan. All data, guidelines, and code are openly released for reuse by researchers and speakers.

## Research stages

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } **Stage 1 · Batak Toba Corpus**

    ---

    <span class="nt-status nt-status--done">COMPLETED · 2025</span>

    A Batak Toba and Indonesian text corpus covering five genres, with more than 112,000 Batak Toba tokens.

    [:octicons-arrow-right-24: View the corpus](korpus/index.md)

-   :material-file-tree:{ .lg .middle } **Stage 2 · Universal Dependencies Annotation**

    ---

    <span class="nt-status nt-status--run">IN PROGRESS · 2026</span>

    UD annotation guideline v1.0 and 250 pilot sentences. Double annotation by two annotators started on 5 October 2026.

    [:octicons-arrow-right-24: View UD annotation](anotasi-ud/index.md)

</div>

## Five-year roadmap

| Year | Focus | Status |
|---|---|---|
| I | Corpus collection and preprocessing (semester 1), annotation guideline and initial annotation of 250 sentences (semester 2) | <span class="nt-status nt-status--run">IN PROGRESS</span> |
| II | Extending annotation to further NLP tasks, mainly a Batak Toba and Indonesian parallel corpus for machine translation, plus annotation quality assurance | <span class="nt-status nt-status--plan">PLANNED</span> |
| III | Monolingual Batak Toba pre-training setup and transfer learning from high-resource source languages | <span class="nt-status nt-status--plan">PLANNED</span> |
| IV | Data augmentation, benchmarking, and bias analysis | <span class="nt-status nt-status--plan">PLANNED</span> |
| V | Community validation, sustainability planning, and integration into teaching modules | <span class="nt-status nt-status--plan">PLANNED</span> |

## Repositories

1. [batak-toba-korpus](https://github.com/FeliksMakarios/batak-toba-korpus): Stage 1 corpus.
2. [batak-toba-corpus-v2](https://github.com/FeliksMakarios/batak-toba-corpus-v2): Stage 2 UD guideline and pilot corpus.
3. [nlptoba.org](https://github.com/FeliksMakarios/nlptoba.org): source code of this site. The site is rebuilt automatically from the two repositories above.
