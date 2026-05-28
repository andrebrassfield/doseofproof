# Dose of Proof — Deployment Guide

## What's Built

```
~/Sites/doseofproof.com/
├── index.html           # Homepage (hero, what you get, manifesto, CTA)
├── about.html           # Andre's origin story
├── newsletter.html      # Subscribe page + what to expect
├── articles.html        # Article archive with category filters
├── privacy.html         # Privacy policy
├── articles/
│   ├── bpc-157-deep-dive.html       # Full article — published
│   └── cjc-1295-ipamorelin-protocol.html  # Stub (coming soon)
├── css/
│   └── style.css       # Full brand styles (dark theme, responsive)
└── js/
    └── main.js          # Mobile nav, email capture, scroll animations
```

---

## Step 1 — Set Up Beehiiv

1. Go to [beehiiv.com](https://www.beehiiv.com) and create an account
2. Create a new publication named **"Dose of Proof"**
3. In Settings → Domain, add `doseofproof.com` (or `www.doseofproof.com`)
4. In Settings → API, copy your **API key** and **Publication ID**
5. Create an email sequence / welcome automation (first email = a welcome + link to the BPC-157 article)

### Update the email form with your credentials

Open `js/main.js` and replace these values:

```js
// Line ~55
const response = await fetch('https://api.beehiiv.com/v2/publications/YOUR_PUBLICATION_ID/subscribers', {
  headers: {
    'Authorization': 'Bearer YOUR_BEEHIIV_API_KEY'
  },
  body: JSON.stringify({
    publication_id: 'YOUR_PUBLICATION_ID',
    // ...
  })
});
```

**Publication ID** looks like: `a1b2c3d4`
**API Key** looks like: `sk_xxxxx`

---

## Step 2 — Point the Domain

Once you own `doseofproof.com`:

**If using Cloudflare (recommended):**
- Add the domain to Cloudflare
- Set the proxy mode to DNS only (orange cloud = enabled)
- Create an **A record** pointing to a static host (see Step 3)
- Or create a **CNAME** to a platform that handles hosting

**If using your registrar directly:**
- Point A record to the IP of your hosting provider

---

## Step 3 — Choose a Hosting Option

### Option A: Cloudflare Pages (Free — recommended)
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo (create one for this project)
3. Set build command: leave empty (static HTML)
4. Set output directory: `/`
5. Deploy — Cloudflare gives you a `.pages.dev` URL
6. Add custom domain: `doseofproof.com`

**Pros:** Free, fast CDN, zero config
**Cons:** Requires GitHub repo

### Option B: Netlify (Free tier)
1. Go to [netlify.com](https://www.netlify.com), drag and drop the `doseofproof.com` folder
2. Add custom domain in settings

**Pros:** Dead simple, drag-and-drop deploy
**Cons:** May need DNS CNAME setup

### Option C: Vercel (Free)
1. `npm i -g vercel`, then `vercel` in the `~/Sites/doseofproof.com/` directory
2. `vercel --prod` to deploy

**Pros:** Fast, good DX
**Cons:** Slightly more setup

### Option D: GitHub Pages (Free)
1. Push `~/Sites/doseofproof.com/` to a GitHub repo
2. Settings → Pages → Deploy from `main` branch, `/ (root)`
3. Custom domain in settings → enable HTTPS

**Pros:** Free, integrated with GitHub
**Cons:** Slow deploys, basic

---

## Step 4 — Social Handles

Create these accounts using `@doseofproof` across all platforms:

| Platform | URL |
|---|---|
| Twitter/X | https://x.com/doseofproof |
| LinkedIn | https://linkedin.com/company/doseofproof |
| YouTube | https://youtube.com/@doseofproof |
| Instagram | https://instagram.com/doseofproof |

Update the footer links in all HTML files to point to your actual handles.

---

## Step 5 — Canva Templates

1. Create a [Canva](https://canva.com) account (Pro recommended for brand kit)
2. Create a **Brand Kit** with these colors:
   - `#0A0A0F` (dark background)
   - `#00D4FF` (cyan accent)
   - `#22C55E` (green)
   - `#F59E0B` (amber)
   - `#64748B` (slate/muted)
3. Upload the Inter and JetBrains Mono fonts (or use Google Fonts equivalents)
4. Create these templates:
   - **Carousel Post** — 1080×1350px, 10 slides, dark background
   - **Quote Card** — 1080×1080px, dark background
   - **Article Header** — 1200×630px (Open Graph)
   - **Lead Magnet** — 1920×1080px landscape

See `~/.hermes/skills/content-engine/dose-of-proof-content-engine/references/canva-template-brief.md` for full specs.

---

## Step 6 — First Content Push

1. **Publish the BPC-157 article** on Beehiiv as Issue #1
2. Copy the article URL into `index.html` (replace the `#` link in the proof-card)
3. Update the subscriber count in the hero (replace `6,000+` with your real number)
4. Share the article on:
   - Reddit (r/Nootropics, r/Peptides, r/Longevity — text post, no link in initial post)
   - Twitter thread (extract 5 key points as individual tweets)
   - LinkedIn article (same content, formatted for LI)

---

## Step 7 — Analytics (Optional)

Add to the `<head>` of every HTML file before `</head>`:

```html
<!-- Plausible Analytics (privacy-friendly, GDPR-compliant) -->
<script defer data-domain="doseofproof.com" src="https://plausible.io/js/script.js"></script>
```

Sign up at [plausible.io](https://plausible.io) — free up to 10K pageviews/month.

---

## What's Working

- ✅ Dark brand theme, fully responsive
- ✅ Email capture forms (ready for Beehiiv API key)
- ✅ Article archive with category filters
- ✅ BPC-157 article (fully written, ~2,000 words)
- ✅ Origin story on About page
- ✅ Subscribe page with sample issue
- ✅ Privacy policy
- ✅ Scroll animations, mobile nav

## What's Pending

- 🔴 Beehiiv API credentials (you provide these)
- 🔴 Domain activation + DNS (you control this)
- 🔴 Hosting provider setup (Netlify/Cloudflare/Vercel — your choice)
- 🔴 Social account handles (create @doseofproof across platforms)
- 🔴 Canva templates (brand kit setup from spec)
- 🔴 4 more article stubs (Lab Tests, GLP-1 vs Peptides, Operator Business, Anti-Establishment File)
- 🔴 Lead magnet PDF (the vetting checklist — needs Canva or PDF generation)

---

## Next Content to Write

1. **Lab Tests Before Peptides** (lab guide — ~1,500 words)
2. **GLP-1 vs Peptides Comparison** (comparison guide — ~2,000 words)
3. **Operator Business: How Peptide Clinics Build $5K–$50K/Month** (business — ~1,800 words)
4. **Why Your Doctor Never Heard of BPC-157** (anti-establishment — ~1,200 words)

All templates are in the skill: `~/.hermes/skills/content-engine/dose-of-proof-content-engine/`
