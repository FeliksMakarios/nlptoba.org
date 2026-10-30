---
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
  <div class="nt-step nt-y3"><span class="nt-step-title">Guideline v1.0</span><span class="nt-step-note">Guideline and labelled examples, including voice arguments.</span><span class="nt-step-state">Done</span></div>
  <div class="nt-step nt-y4"><span class="nt-step-title">Pilot annotation</span><span class="nt-step-note">250 sentences by two annotators, since 5 October 2026.</span><span class="nt-step-state">In progress</span></div>
  <div class="nt-step nt-y5 is-plan"><span class="nt-step-title">Evaluation and revision</span><span class="nt-step-note">Inter-annotator agreement and guideline v1.1, November 2026.</span><span class="nt-step-state">Planned</span></div>
</div>

## Outputs

<div class="grid cards" markdown>

-   :material-book-education:{ .lg .middle } **Annotation guideline v1.0**

    ---

    Rules for part-of-speech, feature, and dependency labels in Batak Toba, based on Nababan (1981). Written in Indonesian.

    [:octicons-arrow-right-24: Read the guideline](pedoman.md)

-   :material-format-list-text:{ .lg .middle } **250 pilot sentences**

    ---

    Sentences from 47 documents and five genres, selected for double annotation.

    [:octicons-arrow-right-24: Browse sentences](kalimat-pilot.md)

-   :material-file-tree:{ .lg .middle } **Dependency trees**

    ---

    Visualised annotation examples from the guideline. Corpus sentences will follow once annotation is complete.

    [:octicons-arrow-right-24: View trees](pohon.md)

-   :material-table-check:{ .lg .middle } **Alignment-revised corpus v1**

    ---

    The parallel corpus after an alignment audit: 1,505 units from 1,494 original rows.

    [:octicons-arrow-right-24: View on GitHub](https://github.com/FeliksMakarios/batak-toba-corpus-v2/tree/main/anotasi-ud/korpus-revisi)

</div>

## Key decisions in guideline v1.0

Word classes and constructions follow *A Grammar of Toba-Batak* (Nababan, 1981).

1. The root is the predicator. Verbless clauses take no copula.
2. Verbs with *di-*, *hu-*, *ta-* and other passive forms get `Voice=Pass`.
3. The clause subject, including the subject of a passive clause, is `nsubj`.
4. An actor directly following a passive verb is `obj:agent`. An actor marked with *ni* is `obl:agent`.
5. The predicate particles *do*, *ma*, *pe* are `PART` with the relation `discourse`.
6. The attributive marker *na* is `PART` with the relation `mark`.
7. Pronominal suffixes (*-na*, *-mu*, *-hu/-ku*) are not split off and are recorded with `Person[psor]` and `Number[psor]`.

## License and citation

The Stage 2 guideline and data are released under CC BY-SA 4.0, and scripts under MIT.

> Samosir, F. V. P. (2026). *batak-toba-corpus-v2: Pedoman Anotasi Universal Dependencies untuk Bahasa Batak Toba*. Universitas Pelita Harapan. <https://github.com/FeliksMakarios/batak-toba-corpus-v2>
