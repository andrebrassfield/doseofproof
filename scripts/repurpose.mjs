#!/usr/bin/env node
/**
 * Phase 6.3 — Content repurposing pipeline.
 *
 * Reads a single MDX source (article or test spec), parses the frontmatter
 * + body, and writes 5 draft assets to ./dist/<slug>/:
 *
 *   1. x-thread.md         — Twitter / X thread (8-12 tweets)
 *   2. linkedin.md         — LinkedIn longform post
 *   3. newsletter.md       — Beehiiv / ConvertKit issue draft
 *   4. video-script.md     — Short-form video (Reels / TikTok / Shorts)
 *   5. wiki-update.md      — DreBrain / KMS update entry
 *
 * Usage:
 *   node scripts/repurpose.mjs src/content/articles/testing-roadmap-what-doctors-miss.mdx
 *   node scripts/repurpose.mjs src/content/tests/mycotoxin-urine-test.mdx
 *   node scripts/repurpose.mjs src/content/articles/foo.mdx --voice ./my-style.md
 *
 * Voice calibration:
 *   - If --voice <path> is passed, that file is used as the "writing-style"
 *     guide (Andre's writing-style-master.md from DreBrain, or similar).
 *   - Otherwise, the embedded DEFAULT_VOICE is used.
 *   - Per the prompt: 'you approve first 3 X threads / LinkedIn carousels'.
 *     This script outputs DRAFTS for approval; nothing is auto-posted.
 *
 * The output is intentionally templated, not LLM-generated. The shapes
 * are deterministic; the editorial fill-in is what Andre reviews. When
 * the humanizer skill is wired up, swap the templating for a model call
 * seeded with the same shape contract.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DEFAULT_VOICE = `Dose of Proof — Editorial voice guide

Not selling. Just proving.

Tone stack:
- Empirical over assertive. Cite numbers ("3.5mm translation", "28.4 ppb ochratoxin")
  rather than adjectives ("really bad", "severe").
- Radical transparency. Include setbacks, false starts, and the experiments
  that didn't work.
- Anti-gaslighting shield. The reader has been dismissed by conventional
  medicine. Acknowledge that the system fails chronic-illness patients.
- Decoupled commercials. Every product mentioned has a free alternative
  alongside it. Affiliate links carry an inline "I earn a commission" note.
- Em-dash over hype. Use semicolons and em-dashes; avoid "!" and emoji.
  The exceptions are Telegram, video scripts, and the linkedin post where
  conversational tone is appropriate.
- Single voice across channels. X thread, LinkedIn, newsletter, video, and
  wiki all sound like the same person. The platform changes the form,
  not the substance.`;

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: node scripts/repurpose.mjs <path-to-mdx> [--voice <path>]");
    process.exit(1);
  }

  const mdxPath = args[0];
  let voice = DEFAULT_VOICE;
  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--voice" && args[i + 1]) {
      voice = await fs.readFile(args[i + 1], "utf8");
      i++;
    }
  }

  const raw = await fs.readFile(mdxPath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(mdxPath, ".mdx");
  const meta = {
    slug,
    title: data.title || slug,
    description: data.description || "",
    category: data.category || "General",
    publishedAt: data.publishedAt || data.date || new Date().toISOString().slice(0, 10),
    readTime: data.readTime || null,
    keywords: data.keywords || [],
    faqs: data.faqs || [],
  };

  // Extract a few "quotable" lines from the body (sentences with numbers
  // or specific claims — these are the threads / hooks).
  const quotables = extractQuotables(content);

  const outDir = path.join(process.cwd(), "dist", slug);
  await fs.mkdir(outDir, { recursive: true });

  const xThread = renderXThread(meta, quotables, voice);
  const linkedin = renderLinkedIn(meta, quotables, content, voice);
  const newsletter = renderNewsletter(meta, quotables, content, voice);
  const videoScript = renderVideoScript(meta, quotables, voice);
  const wikiUpdate = renderWikiUpdate(meta, quotables, voice);

  await fs.writeFile(path.join(outDir, "x-thread.md"), xThread);
  await fs.writeFile(path.join(outDir, "linkedin.md"), linkedin);
  await fs.writeFile(path.join(outDir, "newsletter.md"), newsletter);
  await fs.writeFile(path.join(outDir, "video-script.md"), videoScript);
  await fs.writeFile(path.join(outDir, "wiki-update.md"), wikiUpdate);

  console.log(`[ok] ${slug} — 5 drafts written to ${path.relative(process.cwd(), outDir)}/`);
  console.log(`     - x-thread.md`);
  console.log(`     - linkedin.md`);
  console.log(`     - newsletter.md`);
  console.log(`     - video-script.md`);
  console.log(`     - wiki-update.md`);
  console.log(``);
  console.log(`All drafts are TEMPLATES with brackets for Andre to fill in.`);
  console.log(`Review and edit before posting. The script does NOT auto-publish.`);
}

function extractQuotables(content) {
  // Pull sentences that contain a number, a unit (ppb, mm, ms, %, etc.),
  // or a specific claim pattern.
  const sentences = content
    .replace(/^#+ .*$/gm, "") // strip headings
    .replace(/```[\s\S]*?```/g, "") // strip code blocks
    .replace(/\*\*([^*]+)\*\*/g, "$1") // strip bold
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // strip markdown links
    .replace(/^[-*]\s+/gm, "") // strip leading bullet chars
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30 && s.length < 280);

  const numberish = sentences.filter((s) =>
    /\b\d+(\.\d+)?\s?(ppb|mm|ms|%|bpm|mg|ng\/ml|x|cfu|degrees|°)\b|\b\d{2,4}\b|β-?1|C4a|MMP-9|HRV|TGF/i.test(s)
  );

  return numberish.slice(0, 8);
}

function renderXThread(meta, quotables, voice) {
  const url = `https://doseofproof.com/${meta.category === "Tests" ? `tests/${meta.slug}` : `content/${meta.slug}`}`;
  const tweets = [
    `1/ ${meta.title}\n\nA short thread on what I learned, the data, and the part nobody's talking about. 🧵`,
    `2/ The TL;DR: ${meta.description}\n\n(Save this for later — the details matter.)`,
  ];
  quotables.slice(0, 6).forEach((q, i) => {
    tweets.push(`${i + 3}/ ${q}`);
  });
  tweets.push(
    `${tweets.length + 1}/ Full breakdown (with scans, citations, and what didn't work):\n\n${url}\n\n— Dre\nDose of Proof · "Not selling. Just proving."`
  );

  return [
    `# X / Twitter thread — ${meta.title}`,
    ``,
    `> Voice: ${extractVoiceNote(voice)}`,
    ``,
    `Source: \`${meta.slug}\` (${url})`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    ``,
    `---`,
    ``,
    ...tweets,
    ``,
    `---`,
    ``,
    `## Reviewer checklist (Dre)`,
    ``,
    `- [ ] Replace any [bracketed] placeholders`,
    `- [ ] Verify all numbers match the source article`,
    `- [ ] Add the optional 8th/9th/10th tweet if the data warrants it`,
    `- [ ] Confirm affiliate links carry \`I earn a commission\` if added`,
    `- [ ] Final read: does it sound like the same Dre as the article?`,
  ].join("\n");
}

function renderLinkedIn(meta, quotables, content, voice) {
  const url = `https://doseofproof.com/${meta.category === "Tests" ? `tests/${meta.slug}` : `content/${meta.slug}`}`;
  return [
    `# LinkedIn post — ${meta.title}`,
    ``,
    `> Voice: ${extractVoiceNote(voice)}`,
    `Source: \`${meta.slug}\` (${url})`,
    `Generated: ${new Date().toISOString().toString().slice(0, 10)}`,
    ``,
    `---`,
    ``,
    `**Hook (first 2 lines, before "see more"):**`,
    ``,
    `[One sentence that creates an open loop. Specific number, specific claim, specific contradiction with conventional advice.]`,
    ``,
    `**Body (3-6 short paragraphs):**`,
    ``,
    `[Setup: the problem from the patient's perspective. 2-3 sentences.]`,
    ``,
    `[What I tried first that didn't work. Be specific about the failure.]`,
    ``,
    `[The turning point — what changed, what data appeared, what the new hypothesis was.]`,
    ``,
    quotables.length > 0
      ? `[Pull a key data point: "${quotables[0]}"]`
      : `[Pull a key data point from the article.]`,
    ``,
    `[What I'm doing now / what I'd recommend someone in this position explore.]`,
    ``,
    `**CTA:**`,
    ``,
    `Full article with the scans + citations: ${url}`,
    ``,
    `— Dre | Dose of Proof`,
    ``,
    `---`,
    ``,
    `## Reviewer checklist (Dre)`,
    ``,
    `- [ ] First 2 lines earn the "see more" click`,
    `- [ ] No "Delve", "In today's fast-paced", or other LinkedIn-isms`,
    `- [ ] Specific numbers (not adjectives)`,
    `- [ ] No affiliate links in the post body — those belong in the article`,
    `- [ ] Tags: #chronicillness #recovery [add 1-3 more relevant tags]`,
  ].join("\n");
}

function renderNewsletter(meta, quotables, content, voice) {
  const url = `https://doseofproof.com/${meta.category === "Tests" ? `tests/${meta.slug}` : `content/${meta.slug}`}`;
  return [
    `# Newsletter issue — ${meta.title}`,
    ``,
    `> Voice: ${extractVoiceNote(voice)}`,
    `Source: \`${meta.slug}\` (${url})`,
    `Target length: 800-1200 words. Send: ${meta.publishedAt}`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    ``,
    `---`,
    ``,
    `**Subject line (A/B test these):**`,
    ``,
    `A: [Specific number + counterintuitive claim, e.g. "Ochratoxin at 28.4 ppb — what I did next"]`,
    `B: [Question the reader is already asking themselves]`,
    `C: [Plain: "New on Dose of Proof: ${meta.title}"]`,
    ``,
    `**Preheader:**`,
    ``,
    `[~80 chars. Complements the subject line without repeating it.]`,
    ``,
    `---`,
    ``,
    `Hi ` + `[first name]` + `,`,
    ``,
    `[Opening: 2-3 sentences. Reconnect to last issue, name the topic, signal what's different about this one. Reference a previous issue or recent test result if relevant.]`,
    ``,
    `## The headline`,
    ``,
    `[1-2 sentences stating the discovery or the data point. The "what" before the "why".]`,
    ``,
    `## What the data actually says`,
    ``,
    quotables.length > 0
      ? quotables.slice(0, 3).map((q, i) => `${i + 1}. ${q}`).join("\n\n")
      : `[Pull 2-3 data points from the article. Lead with the number, not the adjective.]`,
    ``,
    `## What it means for you`,
    ``,
    `[2-3 paragraphs. What's actionable. What to ask your doctor. What the next test should be. Be specific — vague advice erodes trust.]`,
    ``,
    `## What's coming next`,
    ``,
    `[One paragraph. A peek at the next issue or the next test. Don't oversell.]`,
    ``,
    `---`,
    ``,
    `Read the full article (with scans + citations): ${url}`,
    ``,
    `— Dre`,
    ``,
    `Dose of Proof · "Not selling. Just proving."`,
    `You're getting this because you signed up at doseofproof.com. Unsubscribe: [link]`,
    ``,
    `---`,
    ``,
    `## Reviewer checklist (Dre)`,
    ``,
    `- [ ] Subject line + preheader don't repeat each other`,
    `- [ ] Opens by reconnecting, not by introducing`,
    `- [ ] Data points pulled from the article, not invented`,
    `- [ ] Actionable advice, not vague platitudes`,
    `- [ ] Unsubscribe link present`,
    `- [ ] No affiliate links in the email body — those go in the article`,
  ].join("\n");
}

function renderVideoScript(meta, quotables, voice) {
  return [
    `# Short-form video script — ${meta.title}`,
    ``,
    `> Voice: ${extractVoiceNote(voice)}`,
    `Target: Reels / TikTok / YouTube Shorts (30-60s)`,
    `Source: \`${meta.slug}\``,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    ``,
    `---`,
    ``,
    `## HOOK (0-3s) — must earn the scroll-stop`,
    ``,
    `[Pattern interrupt: specific number + contradiction. Examples:]`,
    `- "My HRV was 14 milliseconds. Three months later it was 48."`,
    `- "Standard blood work said I was fine. The urine panel said otherwise."`,
    `- "Reversed cervical curve. Lost the vagus nerve for 18 months."`,
    ``,
    `## SETUP (3-8s)`,
    ``,
    `[One sentence: what the conventional advice was, and why it didn't apply.]`,
    ``,
    `## PAYOFF (8-25s)`,
    ``,
    quotables.length > 0
      ? `[The data: "${quotables[0]}" — keep the number visible on screen as B-roll.]`
      : `[The data — keep the number visible on screen as B-roll.]`,
    ``,
    `[One sentence connecting the data to the larger pattern.]`,
    ``,
    `## CTA (25-35s)`,
    ``,
    `"Full breakdown with the scans at doseofproof.com" — point up to the link in bio / comment.`,
    ``,
    `## B-ROLL NOTES`,
    ``,
    `- [0-3s] Your face, close-up, talking. Direct to camera.`,
    `- [3-8s] Cut to the relevant scan, lab report, or diagram. Hold 2-3s.`,
    `- [8-25s] Cut back to face for the data point, then to the visual.`,
    `- [25-35s] Face, end card with URL visible.`,
    ``,
    `## CAPTION (paste into the platform)`,
    ``,
    `${meta.title} — full breakdown with scans at doseofproof.com.`,
    ``,
    `[3-5 hashtags, e.g. #chronicillness #recovery #HRV #cervicalcurve #cfs]`,
    ``,
    `## Reviewer checklist (Dre)`,
    ``,
    `- [ ] Hook earns the scroll-stop in 3s`,
    `- [ ] Numbers visible on screen, not just spoken`,
    `- [ ] No "1 hack doctors don't want you to know" energy`,
    `- [ ] URL on end card AND in caption`,
    `- [ ] Hashtags specific to the topic, not generic`,
  ].join("\n");
}

function renderWikiUpdate(meta, quotables, voice) {
  return [
    `# Wiki / KMS update — ${meta.title}`,
    ``,
    `> Voice: ${extractVoiceNote(voice)}`,
    `Source: \`${meta.slug}\``,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    ``,
    `---`,
    ``,
    `## Summary`,
    ``,
    `[2-3 sentence summary of the article. Written for someone who already has context on the recovery journey, not a cold reader.]`,
    ``,
    `## Key data points`,
    ``,
    quotables.length > 0
      ? quotables.map((q) => `- ${q}`).join("\n")
      : `- [Extract 3-5 data points from the article.]`,
    ``,
    `## New connections / open questions`,
    ``,
    `- [What does this confirm that we already believed?]`,
    `- [What does this contradict or refine?]`,
    `- [What adjacent topics should we read next?]`,
    ``,
    `## Cross-references`,
    ``,
    `- Published article: https://doseofproof.com/${meta.category === "Tests" ? `tests/${meta.slug}` : `content/${meta.slug}`}`,
    `- Category: ${meta.category}`,
    meta.faqs.length > 0
      ? `- Related FAQs: ${meta.faqs.map((f) => f.question).join(" / ")}`
      : `- Related FAQs: (none in frontmatter)`,
    ``,
    `## Tags`,
    ``,
    `\`${[meta.category.toLowerCase().replace(/\s+/g, "-"), ...(meta.keywords || []).slice(0, 5).map((k) => k.toLowerCase().replace(/\s+/g, "-"))].join("`, `")}\``,
    ``,
    `## Reviewer checklist (Dre)`,
    ``,
    `- [ ] Summary is for an internal reader, not a public reader`,
    `- [ ] Cross-references are bidirectional (article links back to wiki)`,
    `- [ ] "New connections" section is opinionated, not generic`,
  ].join("\n");
}

function extractVoiceNote(voice) {
  // Pull the first line of the voice guide as a one-line summary
  const firstLine = voice.split("\n").find((l) => l.trim() && !l.startsWith("#"));
  return firstLine?.trim().slice(0, 120) ?? "Dose of Proof editorial voice";
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
