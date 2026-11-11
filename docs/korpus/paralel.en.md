---
title: Parallel corpus
description: "Sentence-level Batak Toba and Indonesian parallel corpus: 1,542 pairs, 182 human-validated, and inter-annotator agreement with kappa 0.170."
---

<p class="nt-kicker">Stage 1 · Batak Toba Corpus</p>

# Sentence-level Parallel Corpus

`btb_parallel_sentence.csv` holds Batak Toba and Indonesian sentence pairs from the multi-genre sub-corpus, excluding the HKBP agenda. Pairs were built by automatic alignment and auditing. The 145 pairs flagged as problematic were then judged by two raters who are different from the two translators, and their disagreements were resolved by adjudication.

| Measure | Value |
|---|---:|
| Pairs | 1,542 |
| Documents | 97 |
| Batak Toba / Indonesian words | 24,377 / 21,486 |
| Human-validated pairs (`validasi_manusia = ya`) | 182 (11.8%) |
| Automatically aligned pairs that passed the audit | 1,360 |

Most human-validated pairs come from folktales (47) and poems (45). Prayers and proverbs have almost none.

## Inter-annotator agreement

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
