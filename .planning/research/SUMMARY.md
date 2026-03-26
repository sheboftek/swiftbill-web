# Project Research Summary

**Project:** SwiftBill Marketing Website (getswiftbill.app)
**Domain:** App marketing / landing page website (multilingual, animated, SSG)
**Researched:** 2026-03-26
**Confidence:** HIGH

## Executive Summary

SwiftBill needs a Stripe-level polished marketing website to convert visitors into App Store downloads. The research is clear on three points: (1) **Astro 5 is the right framework** — it ships zero JS by default, has built-in i18n routing, and Content Collections handle the MDX blog natively; React islands provide interactivity only where needed. (2) **Arabic RTL + ZATCA compliance is the killer differentiator** — no competitor combines Arabic, ZATCA QR compliance, and mobile-first App Store downloads on one page. (3) **Performance is non-negotiable** — Gulf audiences on mobile networks will bounce on slow pages; Astro's zero-JS default makes 90+ Lighthouse scores trivial.

The recommended approach is: build the English landing page first with all table stakes (hero, App Store badge, screenshots, features, social proof, footer), then add Arabic RTL as the immediate second phase (this is the competitive moat), then layer in animations, template gallery, pricing, and blog. CSS Logical Properties must be used from day one — RTL cannot be retrofitted.

Key risks: RTL Arabic is far more than `dir="rtl"` (bidi text, number formatting, icon flipping), scroll animations can destroy LCP if the hero is animated, and hreflang/canonical mistakes will make Arabic pages invisible in Gulf search results. All three are preventable with the architecture decisions outlined below.

## Key Findings

### Recommended Stack

**Astro 5** wins over Next.js for this use case. A marketing site doesn't need React's 85KB runtime on every page. Astro ships zero JS by default, hits 95-100 Lighthouse out of the box, and has first-class i18n with locale-prefixed URL routing (`/ar/`, `/de/`). React components load only in interactive islands (`client:visible`) for animations and pricing toggles.

> **Note:** The Architecture research agent recommended Next.js, but the Stack research makes a compelling case for Astro. The deciding factors: (a) commercial hosting — Vercel Hobby forbids commercial use, while Cloudflare Pages is free with unlimited bandwidth; (b) performance — 8KB vs 85KB baseline JS; (c) built-in i18n routing — no `next-intl` dependency needed; (d) the site is primarily static content with isolated interactive sections — perfect for islands architecture.

**Core technologies:**
- **Astro 5.17** — SSG framework with zero-JS default, built-in i18n, Content Collections
- **React 19** — Interactive islands only (animations, pricing toggle)
- **Tailwind CSS 4.2** — CSS-first config, logical properties for RTL (`ms-*`, `me-*`, `ps-*`, `pe-*`)
- **Motion 12.x** — Scroll-triggered animations in React islands (32KB gzipped)
- **@astrojs/mdx** — Blog content with Zod-validated Content Collections
- **Cloudflare Pages** — Free hosting, 330+ edge locations, unlimited bandwidth, commercial OK

### Expected Features

**Must have (table stakes):**
- Hero section with clear value prop + App Store badge above fold
- App screenshots in iPhone device mockups (3-5 key screens)
- Feature benefits section (benefits, not features — "Get paid faster" not "payment module")
- Social proof — App Store rating badge + review count
- Apple Smart App Banner (`<meta name="apple-itunes-app" content="app-id=6760855924">`)
- Footer with privacy/terms links, support email
- SEO: title tags, OG tags, Schema.org SoftwareApplication, sitemap

**Should have (competitive differentiation):**
- Arabic language toggle with full RTL layout — #1 differentiator, no competitor has this for a mobile invoice app
- ZATCA/UAE FTA compliance badge section — eliminates Saudi users' #1 concern
- Interactive template gallery showing 15 PDF templates visually
- Scroll-triggered animations (subtle, Stripe-level)
- Pricing transparency section (Free vs Pro)

**Defer (v2+):**
- App preview video (needs production)
- Blog/SEO content (subdomain, defer to later)
- Device-aware CTAs (iOS/Android/desktop detection)
- Newsletter signup
- A/B testing framework

### Architecture Approach

Astro with locale-based URL routing (`/[lang]/`). English at root or `/en/`, all others at `/ar/`, `/de/`, etc. Translations in JSON files per locale (`src/i18n/locales/en.json`). Blog posts in MDX per locale (`src/content/blog/en/`, `src/content/blog/ar/`). CSS Logical Properties everywhere — never `margin-left`, always `margin-inline-start`. RTL handled via `dir="rtl"` on `<html>` + Tailwind logical utilities.

**Major components:**
1. **BaseLayout** — `<html lang dir>`, head meta, font loading, analytics
2. **Pages** — `src/pages/[lang]/index.astro`, `pricing.astro`, `blog/`, `privacy.astro`, `terms.astro`
3. **Components** — `Hero.astro`, `Features.astro`, `PricingTable.astro`, `IPhoneMockup.astro`, `Footer.astro`
4. **React Islands** — `ScrollReveal.tsx`, `TemplateGallery.tsx` (only hydrate where interactive)
5. **i18n** — JSON translation files + `getLocalizedPath()` utility + language switcher
6. **Content** — MDX blog posts organized by locale in Content Collections

### Critical Pitfalls

1. **RTL Arabic is not just `dir="rtl"`** — Bidi text, Eastern Arabic numerals, directional icons, CSS Logical Properties required from day one. Cannot be retrofitted.
2. **Scroll animations destroy LCP** — Never animate the hero/LCP element. Only animate `transform`/`opacity`. Lazy-load animation library after first paint. Max 50KB animation budget.
3. **Hreflang/canonical mistakes** — Every page must self-canonicalize and include reciprocal hreflang for all 8 locales + `x-default`. Wrong language codes are silently ignored by Google.
4. **Font loading (Arabic fonts 200-500KB)** — Self-host via `@fontsource`, `font-display: swap`, WOFF2 only, load Arabic font only on Arabic pages via `unicode-range`.
5. **Auto-redirect by locale blocks Googlebot** — Never auto-redirect by Accept-Language. Use static locale paths with a non-intrusive language suggestion banner.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & English Landing Page
**Rationale:** Ship the English version first with all table stakes. This validates the design, gets indexed by Google, and starts converting immediately.
**Delivers:** Fully functional English marketing site with hero, App Store CTA, device mockups, features, social proof, pricing mention, footer, legal pages, SEO meta, Smart App Banner
**Addresses:** All 12 table stakes from FEATURES.md
**Avoids:** Over-engineering animation before content is solid (Pitfall #2)
**Key decisions:** Astro project setup, Tailwind config with CSS Logical Properties, component library, image optimization pipeline

### Phase 2: Arabic RTL & i18n System
**Rationale:** Arabic RTL is the #1 competitive differentiator. Must be built on CSS Logical Properties foundation from Phase 1 — this is why Logical Properties are enforced in Phase 1 even for English-only.
**Delivers:** Full Arabic translation, RTL layout, language switcher, hreflang tags, per-locale URLs
**Implements:** i18n routing, translation JSON files, BaseLayout dir/lang switching
**Avoids:** RTL retrofit nightmare (Pitfall #1), hreflang errors (Pitfall #3), auto-redirect (Pitfall #5)

### Phase 3: Animations & Interactive Features
**Rationale:** Animations are the "Stripe-level polish" layer. Applied after content and RTL are solid.
**Delivers:** Scroll-triggered reveal animations, interactive template gallery, pricing toggle
**Uses:** Motion library in React islands (`client:visible`), IntersectionObserver
**Avoids:** LCP destruction (Pitfall #2) — hero is never animated, only secondary sections

### Phase 4: Remaining Languages & SEO
**Rationale:** With English + Arabic proven, expand to remaining 6 languages. SEO structured data and sitemap generation.
**Delivers:** DE, ES, FR, JA, PT-BR, SV translations, OG images per locale, structured data, XML sitemap
**Addresses:** Full 8-language coverage matching the iOS app

### Phase 5: Blog & Content Marketing
**Rationale:** Blog is an SEO play that takes months to pay off. Ship after the landing page is converting.
**Delivers:** MDX blog with Content Collections, per-locale posts, prose styling, syntax highlighting
**Implements:** Content layer from ARCHITECTURE.md

### Phase 6: ZATCA/Compliance Showcase & Polish
**Rationale:** Dedicated compliance section for Gulf market. Competitor comparison table. Final polish pass.
**Delivers:** ZATCA compliance badge section, UAE FTA section, competitor comparison, testimonials, performance optimization pass

### Phase Ordering Rationale

- **Phase 1 before 2:** CSS Logical Properties must be established in Phase 1 to avoid RTL retrofit. English-first validates design before translation overhead.
- **Phase 2 before 3:** RTL layout must be tested before animations are added — animations that work in LTR can break in RTL.
- **Phase 3 before 4:** Animation system tested on 2 languages (EN + AR) before expanding to 6 more.
- **Phase 5 late:** Blog is not a conversion driver at launch. Features research explicitly lists it as an anti-feature on the landing page — defer to subdomain or separate section.
- **Phase 6 late:** ZATCA showcase requires specific compliance copy review and is enhancement, not core conversion.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2:** Arabic RTL implementation — needs real Arabic content from native speakers, bidi testing, Eastern Arabic numeral decisions
- **Phase 5:** MDX blog i18n — how to handle posts that don't exist in all languages, URL structure for multilingual blog

Phases with standard patterns (skip research-phase):
- **Phase 1:** Standard Astro setup, well-documented
- **Phase 3:** Motion scroll animations are well-documented
- **Phase 4:** Translation is mechanical once i18n system exists

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro 5 verified via official docs + Context7. Clear winner for static marketing sites. |
| Features | HIGH | Based on competitor analysis (Invoice Simple, Wave, FreshBooks, Wafeq) + conversion research |
| Architecture | HIGH | Standard Astro i18n patterns, well-documented. Architecture agent recommended Next.js but Stack analysis is more compelling for this use case. |
| Pitfalls | HIGH | RTL, hreflang, font loading, animation LCP — all well-documented with specific prevention strategies |

**Overall confidence:** HIGH

### Gaps to Address

- **Arabic content quality:** Need native Arabic speaker to write/review website copy (not machine translation)
- **iPhone mockup images:** Need actual app screenshots in device frames — not yet produced
- **App preview video:** Deferred to v2, but needs production planning if prioritized later
- **Domain DNS:** getswiftbill.app purchased on GoDaddy — DNS setup to Cloudflare Pages not yet done

## Sources

### Primary (HIGH confidence)
- Astro 5 official documentation — i18n routing, Content Collections, MDX integration
- Tailwind CSS v4 docs — logical properties, Vite plugin
- Google Search Central — hreflang specifications, canonical tag guidelines
- Web.dev — Core Web Vitals, LCP optimization, CLS prevention
- W3C Internationalization — bidi text, RTL layout specifications

### Secondary (MEDIUM confidence)
- Competitor website analysis (Invoice Simple, Invoicely, Wave, FreshBooks, Wafeq)
- App marketing conversion studies (video impact, CTA placement, social proof)
- Motion (framer-motion) documentation — scroll animations, `whileInView`
- Cloudflare Pages pricing and limits

### Tertiary (LOW confidence)
- Animation performance budgets (50KB, 55+ FPS targets) — based on community benchmarks, not formal studies
- Blog conversion impact claims — varies significantly by domain

---
*Research completed: 2026-03-26*
*Ready for roadmap: yes*
