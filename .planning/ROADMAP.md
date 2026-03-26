# Roadmap: SwiftBill Marketing Website

## Overview

Build a Stripe-level polished marketing website for SwiftBill at getswiftbill.app. Start with a complete English landing page with all core sections, then add Arabic RTL as the #1 competitive differentiator, then layer in interactive features and animations, and finally add the MDX blog system. Astro 5 + React islands + Tailwind CSS 4 on Cloudflare Pages.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3, 4): Planned milestone work
- Decimal phases: Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Foundation & Core Site** — Astro project setup, hero, features, pricing, footer, legal, SEO
- [ ] **Phase 2: Arabic RTL & i18n** — Arabic translation, RTL layout, language switcher, hreflang
- [ ] **Phase 3: Interactive Features & Animations** — Scroll animations, template gallery, ZATCA/FTA, device-aware CTA
- [ ] **Phase 4: Blog System** — MDX Content Collections, categories, per-locale posts, prose styling

## Phase Details

### Phase 1: Foundation & Core Site
**Goal**: Complete English marketing site with all core sections, SEO, and performance targets met
**Depends on**: Nothing (first phase)
**Requirements**: HERO-01, HERO-02, HERO-03, CONT-01, PRIC-01, PRIC-02, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, LEGAL-01, LEGAL-02, LEGAL-03, I18N-05
**Success Criteria** (what must be TRUE):
  1. Visitor sees hero with value prop headline and App Store download badge above fold
  2. Visitor can scroll through feature benefits section with clear benefits-first copy
  3. Visitor sees Free vs Pro pricing comparison with correct prices
  4. Footer shows legal links, support email, social links, and App Store badge
  5. Privacy Policy and Terms of Service pages render with styled typography
  6. Lighthouse scores 90+ on all categories on mobile
  7. All CSS uses logical properties (no margin-left/right, padding-left/right)
**Research**: Unlikely (Astro setup is well-documented, standard SSG patterns)
**Plans**: TBD

Plans:
- [ ] 01-01: Astro project scaffolding, Tailwind config, base layout, global styles
- [ ] 01-02: Hero section, features section, pricing section, footer
- [ ] 01-03: Legal pages (privacy, terms), SEO meta/OG/structured data, sitemap, robots.txt

### Phase 2: Arabic RTL & i18n
**Goal**: Full Arabic translation with RTL layout, language switching, and proper international SEO
**Depends on**: Phase 1
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-06
**Success Criteria** (what must be TRUE):
  1. Visitor at /ar/ sees fully translated Arabic page with correct RTL layout
  2. All flex/grid layouts mirror correctly in RTL (navigation, features, pricing)
  3. Language switcher in header and footer toggles between EN and AR
  4. Every page has hreflang tags for en, ar, and x-default
  5. Directional icons (arrows, chevrons) flip in RTL; logos and mockups do not
**Research**: Likely (Arabic RTL has many edge cases — bidi text, number formatting, icon flipping)
**Research topics**: Real Arabic content review, bidi text handling, Eastern Arabic numerals decision, Astro i18n routing patterns
**Plans**: TBD

Plans:
- [ ] 02-01: i18n system setup (translation JSON files, locale routing, language switcher)
- [ ] 02-02: Arabic translations, RTL layout testing, hreflang tags

### Phase 3: Interactive Features & Animations
**Goal**: Stripe-level polish with scroll animations, interactive template gallery, country-specific compliance content, and device-aware CTAs
**Depends on**: Phase 2
**Requirements**: HERO-04, CONT-02, CONT-03, CONT-04, PRIC-03
**Success Criteria** (what must be TRUE):
  1. Feature sections animate in on scroll (fade/slide) without affecting LCP
  2. Template gallery displays 15 PDF templates with visual previews
  3. ZATCA compliance section shows for Saudi context, UAE FTA shows for UAE context
  4. Country-specific content is selectable or geo-targeted (Saudi/UAE/default)
  5. iOS visitors see App Store badge CTA, desktop visitors see QR code
  6. Animations respect prefers-reduced-motion
**Research**: Unlikely (Motion library and IntersectionObserver are standard patterns)
**Plans**: TBD

Plans:
- [ ] 03-01: Scroll animation system (React islands with Motion), device-aware CTA
- [ ] 03-02: Template gallery, ZATCA/FTA compliance sections, country-specific content

### Phase 4: Blog System
**Goal**: Full MDX blog with categories, bilingual posts (EN + AR), and proper content styling
**Depends on**: Phase 2
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05
**Success Criteria** (what must be TRUE):
  1. Blog index page lists posts with category filtering
  2. Blog posts render MDX content with proper prose typography
  3. Arabic blog posts render in RTL with correct layout
  4. Posts are organized by category (invoice tips, tax guides, product updates)
  5. Blog pages include proper SEO meta tags and OG tags
**Research**: Unlikely (Astro Content Collections + MDX is well-documented)
**Plans**: TBD

Plans:
- [ ] 04-01: Content Collections setup, MDX pipeline, blog layout, blog index
- [ ] 04-02: Sample posts (EN + AR), category filtering, blog SEO

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation & Core Site | 0/3 | Not started | - |
| 2. Arabic RTL & i18n | 0/2 | Not started | - |
| 3. Interactive Features & Animations | 0/2 | Not started | - |
| 4. Blog System | 0/2 | Not started | - |
