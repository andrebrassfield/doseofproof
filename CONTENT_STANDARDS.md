# Dose of Proof — Content Standards & Editorial Guidelines

Welcome to the Dose of Proof content development manual. This document governs all writing, content staging, component integrations, and technical publication guidelines across `doseofproof.com`.

---

## 1. Editorial Voice & Philosophy

Our core ethos is: **"Not selling. Just proving."** 

We do not write typical health blog posts that regurgitate high-level wellness tips. We write structured, technical, evidence-first documentation of the body's recovery.

### The Tone Stack
* **Empirical over Assertive:** Avoid making absolute medical claims. Document observations, specific measurements (e.g., `"3.5mm translation to the left"`), and scientific mechanisms.
* **Radical Transparency:** Share the setbacks, the false starts, the tests that failed, and the products that did not work, alongside the ones that did.
* **Anti-Gaslighting Shield:** Keep the voice empathetic to the chronic illness patient journey. Acknowledge the limits of standard clinical lab reference ranges.
* **Decoupled Commercials:** Never use aggressive sales pitches. If a guide, supplement stack, or testing resource is referenced, it must be presented alongside a free alternative (e.g., the DIY checklist), and clear disclosures must be visible immediately inline.

---

## 2. Formatting & Structure Rules

All content files (specifically MDX articles under `src/content/articles/` and MDX test specifications under `src/content/tests/`) must adhere to strict formatting standards.

### Markdown Frontmatter Requirements
Each MDX file must contain complete YAML frontmatter.

```yaml
---
title: "Article/Test Title (Sentence Case)"
description: "Compelling, SEO-optimized summary under 160 characters."
publishedAt: "YYYY-MM-DD"
category: "CCI" | "Mold" | "MCAS" | "Autonomic"
readTime: "X min read"
keywords: ["cervical curve", "vagus nerve irritation", "paraspinal scans"]
faqs:
  - question: "Common user question?"
    answer: "Clear, factual, 2-3 sentence answer."
tags: ["upper-cervical", "instability", "tytron"]
---
```

### Typographic Grid
* **Headings:** Use a single `# H1` per page (typically rendered dynamically from frontmatter). Use `## H2` for primary chapters and `### H3` for sub-sections.
* **Paragraphs:** Keep line lengths readable on desktop screens (under 75 characters per line to avoid visual strain).
* **Lists:** Use numbered lists (`1.`, `2.`) for sequential execution sequences (e.g., drainage support before binding) and bullet lists (`-`) for unordered collections.

---

## 3. Component Usage Guidelines

We integrate custom interactive components directly into our markdown files or dynamic wrappers to keep the pages alive.

### Interactive Components
* **`ScanViewer`:** Use whenever presenting diagnostic imagery (X-rays, thermographic paraspinal scans). Ensure all hotspot coordinates are precisely configured to highlight structural anomalies and specify what each value indicates.
* **`TimelineScrubber`:** Use to illustrate chronological progression. Great for complex multi-year timelines (e.g., mold exposure timelines, recovery phase roadmaps) where users can click steps to reveal symptom loads vs active protocols.
* **`ProtocolCalculator`:** Place on entry paths (e.g., landing guides, Protocol Vault) to segment users based on their symptom profile (Structural vs Environmental vs Autonomic).
* **`DashboardPreview`:** Render to visualize data metrics (HRV, Sleep Index, cervical alignment). Helps readers contrast functional health states (NUCCA correction vs subluxated atlas).

---

## 4. Medical Disclaimer & Citation Standards

### Disclaimer Boundaries
* **The Sticky Disclaimer Banner (`DisclaimerBanner`):** Must be mounted on all health-focused pages, guides, and protocol paths.
* **Inline Warning Signals:** When discussing high-risk protocols (e.g., high-dose binders, peptide stacks, or cervical adjustments), highlight potential risks using GitHub-style warning callouts:
  ```markdown
  > [!WARNING]
  > Precision check: Never attempt rotary manual adjustments on an unstable cervical spine. Use only non-rotational upper cervical specialists (NUCCA, Blair).
  ```

### Citations & Evidence
* **Primary Sources:** Link to peer-reviewed studies (PubMed, NIH) whenever discussing biochemical mechanisms (e.g., Ochratoxin-induced oxidative stress or vagus nerve inflammation pathways).
* **No Speculation:** If a mechanism is hypothetical or based purely on patient-group observations, state so explicitly (e.g., `"Observational patient registries report... but clinical trials have not yet validated this link."`).

---

## 5. CI Gate (`.github/workflows/content-standards.yml`)

Every PR and push to `main` runs the following automated checks. The build fails on any error; warnings are reported but do not block the merge (to grandfather pre-existing content).

| Check | What it does | Failure mode |
| --- | --- | --- |
| **Frontmatter schema** | Validates `title`, `description`, `date`, `category`, `readTime` on every article; `intent`, `stage`, `whyItMatters`, `whatItCanShow`, `icon` on every test spec | **Error** — block merge |
| **Asset existence** | Confirms every `![alt](/path)` and frontmatter `image:` points to a real file in `/public` | **Error** — block merge |
| **Claim → citation** | Detects `"study shows"`, `"research indicates"`, `"clinical trials"`, `PubMed/PMID` IDs and `doi:` references. Verifies a primary-source link (`pubmed.ncbi.nlm.nih.gov`, `ncbi.nlm.nih.gov`, `doi.org`, `nih.gov`, `nejm.org`, etc.) appears within 1200 chars of the claim. | **Warning** — flag in PR |
| **Affiliate disclosure** | Detects external product links (`amazon.com`, `iherb.com`, `fullscript.com`, `thorne.com`, etc.). Verifies an inline disclosure phrase (`I earn a commission`, `at no extra cost to you`, etc.) appears within 600 chars. | **Warning** — flag in PR |
| **Medical disclaimer** | Walks `src/app/{mold-toxicity,mcas-histamine,craniocervical-instability,start-here,protocol-vault,testing-roadmap,tests,content,lead-magnet}/**/page.tsx` and verifies `<DisclaimerBanner />` is rendered. | **Error** — block merge |
| **Image optimization** | Markdown `![alt](/path)`: image must exist and be ≤ 200KB. Plain `<img>` tags must declare `width` and `height` attributes to prevent CLS. | **Warning** — flag in PR |
| **Lint** | ESLint over the entire `src/` | **Error** — block merge |
| **Typecheck** | `tsc --noEmit` | **Error** — block merge |
| **Build** | `next build` (Turbopack) | **Error** — block merge |
| **Storybook build** | `storybook build` (validates all 15 component stories + content autodocs compile) | **Error** — block merge |

### Running locally
```bash
npm run validate-content    # content gate (frontmatter, claims, affiliates, images, disclaimer)
npm run lint                # ESLint
npm run build               # Next.js build
npm run storybook           # Storybook dev server
npm run build-storybook     # Storybook static build
```

### Adding a new health page
Any new route under one of the health route segments above must render `<DisclaimerBanner />`. The CI gate will fail the PR if it doesn't.

### Adding a new claim to an article
Make sure a primary-source link (`pubmed.ncbi.nlm.nih.gov`, `ncbi.nlm.nih.gov`, `doi.org`, `nih.gov`, `nejm.org`, etc.) appears within the same paragraph. The validator scans a 1200-character window for source hosts.

### Adding a new product recommendation
Either add an inline disclosure (`I earn a commission`) within 600 chars of the link, or use a non-affiliate source. The validator will flag the link in PR review.

