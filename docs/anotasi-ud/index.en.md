---
icon: material/sitemap-outline
dataset: ud
description: "Stage 2 of the Batak Toba NLP project: Universal Dependencies annotation guideline, 250 pilot sentences, and key decisions on predicate-initial order and Austronesian voice."
title: Universal Dependencies Annotation (Stage 2)
---

<p class="nt-kicker">Year I · Semester 2 · 2026</p>

# Universal Dependencies Annotation (Stage 2)

The project "Development of Universal Dependencies Annotation Guidelines for Batak Toba and Initial Testing on a Small Corpus" (Beginning Lecturer Research Scheme, Universitas Pelita Harapan, July to December 2026). This stage builds on the [Stage 1 corpus](../korpus/index.md) towards morphosyntactic annotation based on Universal Dependencies (UD) version 2.

[:fontawesome-brands-github: batak-toba-corpus-v2 repository](https://github.com/FeliksMakarios/batak-toba-corpus-v2){ .md-button .md-button--primary }

## Why Batak Toba needs its own guideline

UD offers part-of-speech categories, morphological features, and dependency relations that apply across languages. These categories are deliberately general, so two typological traits of Batak Toba do not map onto them automatically:

1. **Predicate-initial order.** The predicate usually precedes the subject, as in *Mangallang dengke do si Polan* ‘Si Polan is eating fish’.
2. **Austronesian voice system.** Verbs with *maN-* and *di-/hu-/ta-* prefixes determine which argument becomes the subject, and the actor of a *di-* clause stays tightly bound to the verb.

Before this project, Batak Toba had no treebank, no part-of-speech or dependency annotation, and no annotation guideline.

## Research workflow

<div class="nt-flow">
  <div class="nt-step nt-y1"><span class="nt-step-title">Stage 1 corpus</span><span class="nt-step-note">Multi-genre corpus from the 2025 grant.</span><span class="nt-step-state">Done</span></div>
  <div class="nt-step nt-y2"><span class="nt-step-title">Decision synthesis</span><span class="nt-step-note">Review of UD v2 and the Indonesian, Tagalog, and Cebuano UD guidelines.</span><span class="nt-step-state">Done</span></div>
  <div class="nt-step nt-y3"><span class="nt-step-title">Guideline v1.0 to v1.2</span><span class="nt-step-note">Guideline and labelled examples, updated with annotator feedback.</span><span class="nt-step-state">Done</span></div>
  <div class="nt-step nt-y4"><span class="nt-step-title">Pilot annotation</span><span class="nt-step-note">250 sentences by two annotators, 5 October to 21 November 2026. One annotator has not finished all sentences.</span><span class="nt-step-state">Partly done</span></div>
  <div class="nt-step nt-y5 is-run"><span class="nt-step-title">Evaluation and revision</span><span class="nt-step-note">Preliminary inter-annotator agreement is available. Adjudication and guideline v2.0 to follow.</span><span class="nt-step-state">In progress</span></div>
</div>

## Inter-annotator agreement (preliminary)

Double annotation of the 250 pilot sentences ran from 5 October to 21 November 2026. The work of both annotators was checked by a native Batak Toba speaker consultant on 24 November 2026. One annotator has not finished all sentences, so preliminary agreement was computed on the 90 sentences (1,247 tokens) that both annotators completed.

| Measure | Agreement | Cohen's kappa | Tagalog treebank kappa benchmark |
|---|---:|---:|---:|
| Part of speech (UPOS) | 87.8% | 0.864 | 0.75 |
| Dependency relation (DEPREL) | 76.3% | 0.749 | 0.68 |
| UAS (same head) | 84.0% | | |
| LAS (same head and relation) | 68.5% | | |

!!! note "Preliminary figures"
    These figures are preliminary and cover only 90 of the 250 sentences. Agreement will be recomputed on all 250 sentences once annotation is complete, followed by adjudication and guideline version 2.0. Per-annotator CoNLL-U files are not published. The corpus will be released after adjudication.

Preliminary interpretation:

1. **Both kappa values are above the benchmark.** The guideline refers to the Tagalog UD-NewsCrawl treebank, with kappa 0.75 for parts of speech and 0.68 for relations. The sample is only 90 sentences, so these values are not final.
2. **Most disagreement is about relation labels, not heads.** UAS is 84.0% but LAS is 68.5%, so the annotators usually agree on the head word and differ on the relation name.
3. **The main causes are clear.** Most differences involve the particles *do*, *ma*, *pe*, the subject of *di-* verbs (`nsubj` versus `nsubj:pass`), and the marker *na*. One of the annotators systematically used labels that are not in Appendix A of the guideline.
4. **The annotation worksheet needs aligning.** The DEPREL dropdown list in the worksheet does not yet match Appendix A of the guideline, for example it lacks `obj:agent`. The list will be aligned before the next round.

Next steps: completing the annotation, recomputing agreement on all 250 sentences, adjudication with the native speaker consultant, guideline version 2.0, and then release of the adjudicated 250-sentence corpus.

[:fontawesome-brands-github: Preliminary agreement report (in Indonesian)](https://github.com/FeliksMakarios/batak-toba-corpus-v2/blob/main/evaluation/iaa_pilot_sementara.md){ .md-button }

## Deliverables

<div class="grid cards" markdown>

-   :material-book-education:{ .lg .middle } **Annotation guideline v1.2**

    ---

    Rules for part-of-speech, feature, and dependency labels in Batak Toba, based on Nababan (1981). Written in Indonesian.

    [:octicons-arrow-right-24: Read the guideline](pedoman.md)

-   :material-format-list-text:{ .lg .middle } **250 pilot sentences**

    ---

    Sentences from 47 documents and five genres, selected for double annotation.

    [:octicons-arrow-right-24: Browse sentences](kalimat-pilot.md)

-   :material-file-tree:{ .lg .middle } **Dependency trees**

    ---

    Visualised annotation examples from the guideline. Corpus sentences will follow once adjudication is complete.

    [:octicons-arrow-right-24: View trees](pohon.md)

-   :material-table-check:{ .lg .middle } **Sentence-level parallel corpus**

    ---

    Working version v1 (1,505 units) is the source of the 250 pilot sentences. As a parallel corpus, it has been superseded by the final corpus of 1,542 pairs, 182 of them human-validated.

    [:octicons-arrow-right-24: View the final corpus](../korpus/paralel.md)

</div>

## Key decisions in the guideline

Word classes and constructions follow *A Grammar of Toba-Batak* (Nababan, 1981).

1. The root is the predicator. Verbless clauses take no copula.
2. Verbs with *di-*, *hu-*, *ta-* and other passive forms get `Voice=Pass`.
3. The clause subject, including the subject of a passive clause, is `nsubj`.
4. An actor directly following a passive verb is `obj:agent`. An actor marked with *ni* is `obl:agent`.
5. The predicate particles *do*, *ma*, *pe* are `PART` with the relation `discourse`.
6. The attributive marker *na* is `PART` with the relation `mark`.
7. Pronominal suffixes (*-na*, *-mu*, *-hu/-ku*) are not split off and are recorded with `Person[psor]` and `Number[psor]`.
8. Compound and complex sentences still have a single root. Every word in a clause points to the predicator of its own clause.
9. *laos* is always `ADV` with the relation `advmod` to the predicator of its clause.

Items 8 and 9 were added in version 1.1 based on annotator feedback. Version 1.2 adds a numbered glossary and a term index without changing any labelling rule. Version 1.0 is kept as an [archive](https://github.com/FeliksMakarios/batak-toba-corpus-v2/tree/main/anotasi-ud/pedoman/arsip).

## License and citation

The Stage 2 guideline and data are released under CC BY-SA 4.0, and scripts under MIT.

> Samosir, F. V. P. (2026). *batak-toba-corpus-v2: Pedoman Anotasi Universal Dependencies untuk Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-corpus-v2>
