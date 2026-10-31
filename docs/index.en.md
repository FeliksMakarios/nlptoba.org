---
title: Home
hide:
  - navigation
  - toc
---

<div class="nt-hero" markdown>

<p class="nt-kicker">Five-year research programme · Universitas Pelita Harapan</p>

<h1>Batak Toba NLP</h1>

<p class="nt-lead">Revitalising a low-resource language: building corpora and language models for Batak Toba with deep learning and transfer learning.</p>

[Browse pilot sentences](anotasi-ud/kalimat-pilot.md){ .md-button .md-button--primary }
[Read the annotation guideline](anotasi-ud/pedoman.md){ .md-button }

</div>

<div class="nt-stats">
  <div class="nt-stat"><strong>112,340</strong><span>Batak Toba tokens in the Stage 1 corpus</span></div>
  <div class="nt-stat"><strong>5</strong><span>text genres, from folktales to online media</span></div>
  <div class="nt-stat"><strong>1,505</strong><span>parallel corpus units after alignment audit</span></div>
  <div class="nt-stat"><strong>250</strong><span>pilot sentences for Universal Dependencies annotation</span></div>
</div>

## Roadmap

<div class="nt-roadmap">
  <section class="nt-year nt-y1 is-current">
    <div class="nt-year-tab">Year I</div>
    <div class="nt-year-body">
      <h4>Data Collection and Preprocessing</h4>
      <p>Collecting Batak Toba texts from a range of sources.</p>
      <h4>Annotation Guideline Development</h4>
      <p>Writing the guideline with native speakers, annotating the first 250 sentences, and measuring inter-annotator agreement.</p>
    </div>
    <div class="nt-year-foot"><span class="nt-status nt-status--run">IN PROGRESS</span></div>
  </section>
  <section class="nt-year nt-y2">
    <div class="nt-year-tab">Year II</div>
    <div class="nt-year-body">
      <h4>Collaborative Annotation Phase 1</h4>
      <p>Extending annotation to further NLP tasks, such as a Batak Toba and Indonesian parallel corpus for machine translation.</p>
      <h4>Annotation Quality Assurance</h4>
      <p>Evaluating annotation quality and revising the guideline accordingly.</p>
    </div>
    <div class="nt-year-foot"><span class="nt-status nt-status--plan">PLANNED</span></div>
  </section>
  <section class="nt-year nt-y3">
    <div class="nt-year-tab">Year III</div>
    <div class="nt-year-body">
      <h4>Monolingual Pre-training Setup</h4>
      <p>Building a monolingual Transformer model for Batak Toba.</p>
      <h4>Transfer Learning Strategy</h4>
      <p>Exploring transfer learning from high-resource source languages, namely Indonesian and English.</p>
    </div>
    <div class="nt-year-foot"><span class="nt-status nt-status--plan">PLANNED</span></div>
  </section>
  <section class="nt-year nt-y4">
    <div class="nt-year-tab">Year IV</div>
    <div class="nt-year-body">
      <h4>Data Augmentation and Optimization</h4>
      <p>Back-translation, synthetic data, and active learning.</p>
      <h4>Benchmarking and Bias Analysis</h4>
      <p>Evaluating models on part-of-speech tagging, named entities, sentiment, and summarization, and analysing bias.</p>
    </div>
    <div class="nt-year-foot"><span class="nt-status nt-status--plan">PLANNED</span></div>
  </section>
  <section class="nt-year nt-y5">
    <div class="nt-year-tab">Year V</div>
    <div class="nt-year-body">
      <h4>Community Validation</h4>
      <p>Model validation by the Batak Toba community and feedback sessions.</p>
      <h4>Integration and Sustainability</h4>
      <p>Preparing an open platform for community access and integration into teaching modules.</p>
    </div>
    <div class="nt-year-foot"><span class="nt-status nt-status--plan">PLANNED</span></div>
  </section>
</div>

## Published outputs

<div class="nt-stages">
  <a class="nt-stage nt-y1" href="korpus/">
    <span class="nt-status nt-status--done">COMPLETED · 2025</span>
    <h3>Stage 1 · Batak Toba Corpus</h3>
    <p>A Batak Toba and Indonesian text corpus across five genres, manually curated with two native speaker consultants.</p>
    <span class="nt-more">View the corpus →</span>
  </a>
  <a class="nt-stage nt-y1" href="anotasi-ud/">
    <span class="nt-status nt-status--run">IN PROGRESS · 2026</span>
    <h3>Stage 2 · Universal Dependencies Annotation</h3>
    <p>UD annotation guideline v1.2, 250 pilot sentences, and double annotation by two annotators since 5 October 2026.</p>
    <span class="nt-more">View UD annotation →</span>
  </a>
</div>

## About Batak Toba

Batak Toba was once written in the Batak script and is now mostly written in Latin script. In cities and among migrant communities it is gradually giving way to Indonesian. Its grammar is well documented, yet its digital support for language technology remains very limited.

<dl class="nt-facts">
  <dt>ISO 639-3 code</dt><dd><code>bbc</code></dd>
  <dt>Family</dt><dd>Austronesian, Southern Batak group</dd>
  <dt>Speakers</dt><dd>More than one million, around Lake Toba, North Sumatra</dd>
  <dt>Typology</dt><dd>Predicate-initial clauses and an Austronesian voice system</dd>
</dl>

This site is a first step towards the open community platform planned for Year V. All content is rebuilt automatically from the [batak-toba-korpus](https://github.com/FeliksMakarios/batak-toba-korpus) and [batak-toba-corpus-v2](https://github.com/FeliksMakarios/batak-toba-corpus-v2) repositories.
