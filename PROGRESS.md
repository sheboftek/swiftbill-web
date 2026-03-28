# SwiftBill Web — Progress Report

**Domain:** https://getswiftbill.app
**Repo:** https://github.com/sheboftek/swiftbill-web
**Stack:** Next.js 15 + React 19 + Tailwind CSS 4 + Framer Motion 12
**Hosting:** GitHub Pages (static export, auto-deploy on push)
**Started:** March 27, 2026
**Last Updated:** March 28, 2026

---

## Architecture

- **Framework:** Next.js 15.5.14 with `output: 'export'` (fully static)
- **Styling:** Tailwind CSS 4 + inline styles (Onramper design system values)
- **Animations:** Framer Motion 12 with Onramper easing `cubic-bezier(0.86, 0, 0.07, 1)`
- **Blog:** MDX files parsed with gray-matter + marked at build time
- **i18n:** Custom system with `t(lang, key, country?)` — JSON translation files with country overrides
- **Deployment:** GitHub Actions → GitHub Pages, auto-deploys on push to `main`
- **DNS:** GoDaddy → GitHub Pages A records (185.199.108-111.153) + CNAME www
- **SSL:** Let's Encrypt via GitHub Pages, HTTPS enforced

---

## Pages (166 total static pages)

### Homepages (4)
| URL | Language | Description |
|-----|----------|-------------|
| `/en/` | English | Generic homepage |
| `/ar/` | Arabic (RTL) | Generic homepage |
| `/fr/` | French | Generic homepage |
| `/it/` | Italian | Generic homepage |

### Country-Specific Landing Pages (6)
| URL | Target | Hero Content |
|-----|--------|-------------|
| `/en/saudi/` | Saudi Arabia (EN) | ZATCA e-invoicing hero |
| `/ar/saudi/` | Saudi Arabia (AR) | هيئة الزكاة والضريبة والجمارك hero |
| `/en/uae/` | UAE (EN) | FTA invoice formatting hero |
| `/ar/uae/` | UAE (AR) | الهيئة الاتحادية للضرائب hero |
| `/fr/france/` | France (FR) | TVA + auto-entrepreneur hero |
| `/it/italy/` | Italy (IT) | Fatturazione elettronica hero |

### Blog Posts (34 posts × available languages)
| Language | Posts | Topics |
|----------|-------|--------|
| English | 15 | ZATCA guide, UAE FTA, freelancer/contractor/consultant/designer/developer invoicing, Saudi tax, UAE VAT, expenses, recurring |
| Arabic | 10 | ZATCA guide, UAE FTA, freelancer/contractor invoicing, Saudi tax, UAE VAT, expenses, recurring, getting started |
| French | 6 | Facturation freelance, TVA auto-entrepreneur, mentions légales, devis vs facture, consultant, dépenses |
| Italian | 6 | Fatturazione freelance, fatturazione elettronica, regime forfettario, preventivo vs fattura, consulente, gestione spese |

### Legal Pages (8)
- `/[lang]/privacy/` — 19-section Privacy Policy (GDPR, CCPA, Saudi PDPL, UAE PDPL)
- `/[lang]/terms/` — 20-section Terms of Service (Apple Schedule 2 text included)

---

## Design System (Onramper-inspired)

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Pearl | `#efeef3` | Page background |
| White | `#ffffff` | Cards, sections |
| Off-black | `#151515` | Primary text |
| Body copy | `#6a6a84` | Secondary text |
| Steel | `#808099` | Tertiary text, labels |
| Blue | `#3053EC` | Brand accent, CTAs |
| Blue dark | `#2040C0` | Hover states |
| Teal | `#33e7a1` | Success, checkmarks |
| Border | `#e5e5e7` | Dividers |

### Typography (exact Onramper values)
| Element | Size | Weight | Letter-spacing | Line-height |
|---------|------|--------|----------------|-------------|
| h2 | 90px | 700 | -1.8px | 100% |
| h3 | 70px | 500 | -1.4px | 100% |
| h4 | 50px | 500 | -0.5px | 100% |
| h5 | 42px | 500 | -0.42px | 110% |
| h6 | 36px | 700 | -0.36px | 120% |
| p | 16px | 400 | -0.16px | 130% |
| Button | 20px | 500 | -0.2px | 110% |

### Components
- **Header:** Fixed, pill-shaped nav (border-radius: 123px), 4-language dropdown, backdrop-blur
- **Buttons:** `border-radius: 70px`, `padding: 18px 30px`, primary (black) + secondary (outlined)
- **Cards:** `bg: #efeef3`, `border-radius: 16px`, `padding: 30px 36px`
- **Footer:** 5-column grid, 20px links, blue hover, bottom brand bar
- **FAQ:** White accordion cards, 24px text, animated +/× toggle

---

## SEO Implementation

### Technical SEO ✅
- [x] `sitemap.xml` — 59 URLs with xhtml:link hreflang alternates
- [x] `robots.txt` — Allow all + sitemap reference
- [x] Canonical URLs — Unique per page
- [x] hreflang tags — 11 variants (en, ar, fr, it, en-AE, ar-AE, en-SA, ar-SA, fr-FR, it-IT, x-default)
- [x] `metadataBase` — `https://getswiftbill.app` for absolute URL resolution
- [x] Apple Smart App Banner — `app-id=6760855924`
- [x] Google Search Console — Verified + sitemap submitted
- [x] CNAME file — `getswiftbill.app` for GitHub Pages

### Structured Data ✅
- [x] Organization schema (name, url, logo, contactPoint)
- [x] SoftwareApplication schema (iOS, BusinessApplication, pricing, aggregateRating)
- [x] FAQPage schema (5 Q&A pairs, localized per language)
- [x] Article schema (on blog posts — headline, datePublished, author, publisher)

### Open Graph + Twitter Cards ✅
- [x] og:title, og:description, og:image, og:type, og:locale, og:site_name
- [x] twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image

### On-Page SEO ✅
- [x] Unique titles per page/language/country
- [x] Unique meta descriptions per page
- [x] Proper heading hierarchy (using inline styles to override global h1-h6)
- [x] Image alt tags — no missing
- [x] Internal linking (nav, footer, blog cross-links)

---

## i18n System

### Languages
| Code | Language | Direction | Translation File | Country Override |
|------|----------|-----------|-----------------|-----------------|
| `en` | English | LTR | `en.json` | `en-ae.json`, `en-sa.json` |
| `ar` | Arabic | RTL | `ar.json` | `ar-ae.json`, `ar-sa.json` |
| `fr` | French | LTR | `fr.json` | `fr-fr.json` |
| `it` | Italian | LTR | `it.json` | `it-it.json` |

### How it works
- `t(lang, key)` — Returns translation from base language file
- `t(lang, key, country)` — Tries country override first, falls back to base
- Country overrides only contain keys that differ (hero, meta, features subtitle)
- Header/Footer detect country from URL pathname to preserve when switching languages

---

## Legal Compliance

### Privacy Policy (19 sections)
- GDPR legal basis table (contract, legitimate interests, consent, legal obligation)
- CCPA rights (45-day response, "We do NOT sell")
- Saudi Arabia PDPL rights
- UAE PDPL rights
- Mixpanel analytics disclosure
- Supabase cloud sync disclosure
- Google Gemini AI consent + accuracy disclaimer
- Apple StoreKit 2 mandatory Schedule 2 subscription text
- Data retention schedule with specific periods
- Account deletion process (in-app + email, 30-day timeline)
- Children's privacy (under 16)
- CalOPPA Do Not Track
- Tax tools disclaimer ("NOT a certified tax compliance provider")

### Terms of Service (20 sections)
- Apple Schedule 2 auto-renewal text (verbatim — prevents app rejection)
- Free vs Pro tier limitations
- User content ownership + prohibited uses (fraudulent invoices)
- AI-generated content disclaimer (drafts only, no accuracy guarantee)
- Tax tools disclaimer (NOT licensed tax advisor, NOT certified by ZATCA/FTA)
- ALL CAPS warranty disclaimer + limitation of liability
- Indemnification for tax non-compliance

### Key Legal Language
- "formatting" NOT "compliance" — we don't claim compliance
- "follows published format requirements" NOT "compliant with"
- "Not officially certified by ZATCA or FTA"
- "Requirements may change — always verify with your tax advisor"
- Uses descriptive references only (never implies endorsement)

---

## File Structure

```
swiftbill-web/
├── .github/workflows/deploy.yml    # GitHub Pages deployment
├── public/
│   ├── CNAME                       # getswiftbill.app
│   ├── sitemap.xml                 # 59 URLs with hreflang
│   ├── robots.txt
│   ├── google5509506f5c2158b9.html # Search Console verification
│   └── images/app-icon.png
├── src/
│   ├── app/
│   │   ├── globals.css             # Onramper design tokens + typography
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Root redirect to /en/
│   │   └── [lang]/
│   │       ├── layout.tsx          # Lang layout (Header, Footer, structured data, hreflang)
│   │       ├── page.tsx            # Homepage
│   │       ├── [country]/page.tsx  # Country-specific pages
│   │       ├── blog/
│   │       │   ├── page.tsx        # Blog index
│   │       │   ├── BlogGrid.tsx    # Client-side category filter
│   │       │   └── [slug]/page.tsx # Individual blog posts
│   │       ├── privacy/page.tsx    # Privacy Policy
│   │       └── terms/page.tsx      # Terms of Service
│   ├── components/
│   │   └── sections/
│   │       ├── Header.tsx          # Fixed nav, 4-language dropdown
│   │       ├── Hero.tsx            # Two-column, country-aware
│   │       ├── Features.tsx        # 4-card product grid
│   │       ├── Compliance.tsx      # ZATCA + UAE FTA cards, country-aware
│   │       ├── Templates.tsx       # 15-template gallery
│   │       ├── Pricing.tsx         # Free + Pro cards with toggle
│   │       ├── FAQ.tsx             # Accordion, country-specific questions
│   │       ├── CTA.tsx             # Blue gradient CTA
│   │       └── Footer.tsx          # 5-column, multi-language
│   ├── content/blog/
│   │   ├── en/  (15 posts)
│   │   ├── ar/  (10 posts)
│   │   ├── fr/  (6 posts)
│   │   └── it/  (6 posts)
│   ├── i18n/
│   │   ├── utils.ts               # t(), getDir(), Lang type, country overrides
│   │   ├── countries.ts            # Country type, slug mapping
│   │   ├── en.json, ar.json, fr.json, it.json
│   │   ├── en-ae.json, ar-ae.json  # UAE overrides
│   │   ├── en-sa.json, ar-sa.json  # Saudi overrides
│   │   ├── fr-fr.json              # France overrides
│   │   └── it-it.json              # Italy overrides
│   └── lib/
│       ├── blog.ts                 # MDX parser (gray-matter + marked)
│       └── utils.ts                # cn() utility
├── SEO-STRATEGY.md                 # Full SEO strategy document
├── PROGRESS.md                     # This file
├── next.config.ts                  # output: 'export', trailingSlash: true
└── package.json
```

---

## Deployment

- **Build:** `npx next build` → generates `out/` folder (166 static HTML pages)
- **Deploy:** Push to `main` → GitHub Actions builds → deploys to GitHub Pages
- **Domain:** getswiftbill.app → GoDaddy DNS → GitHub Pages IPs
- **SSL:** Let's Encrypt auto-provisioned, HTTPS enforced

---

## What's Done ✅

1. ✅ Full website redesign (dark → Onramper light theme)
2. ✅ 4 languages (EN, AR, FR, IT)
3. ✅ 6 country-specific landing pages (SA, UAE, France, Italy)
4. ✅ 34 SEO-optimized blog posts
5. ✅ Complete Privacy Policy (19 sections, multi-jurisdiction)
6. ✅ Complete Terms of Service (20 sections, Apple Schedule 2)
7. ✅ Technical SEO (sitemap, structured data, hreflang, OG tags)
8. ✅ Google Search Console verified + sitemap submitted
9. ✅ GitHub Pages deployment with auto-deploy
10. ✅ Custom domain (getswiftbill.app) with HTTPS

## What's Next 📋

1. ⬜ Submit to Product Hunt, AlternativeTo, Capterra, G2 (backlinks)
2. ⬜ Share blog posts on LinkedIn, Twitter, Reddit (traffic)
3. ⬜ Monitor Search Console for indexing progress (2-4 weeks)
4. ⬜ Track keyword rankings after 4-6 weeks
5. ⬜ Write more blog posts (aim for 50+ total)
6. ⬜ Add more languages (Spanish, German, Turkish, Portuguese)
7. ⬜ Add more country pages (UK, Germany, India, Egypt)
8. ⬜ Build App Store screenshots page
9. ⬜ Add testimonials section when reviews come in
10. ⬜ Set up Mixpanel web analytics
11. ⬜ Formalize company (Saudi + UAE) when revenue starts
12. ⬜ Get legal review from Saudi-licensed attorney (~SAR 5-10K)
