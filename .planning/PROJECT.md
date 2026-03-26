# SwiftBill Marketing Website — getswiftbill.app

## What This Is

A Stripe-level polished marketing website for SwiftBill, an iOS invoicing app for freelancers and small businesses. The site drives App Store downloads through beautiful design, animated feature showcases, and trust-building content. Domain: getswiftbill.app. Fully localized in 8 languages.

## Core Value

Convert visitors to App Store downloads through a stunning, trust-building first impression that makes SwiftBill look like it's backed by a billion-dollar company.

## Requirements

### Validated

(None yet — ship to validate)

### Active

**Hero & Landing**
- [ ] Hero section with animated app mockup/card + "Download on App Store" badge
- [ ] Smooth scroll-triggered animations throughout (Stripe-level polish, not gimmicky)
- [ ] All-light theme: white/cream backgrounds with SwiftBill blue (#3053EC) accent + complementary colors
- [ ] Responsive: pixel-perfect on mobile, tablet, desktop
- [ ] Fast: < 2s LCP, 90+ Lighthouse score

**Features Showcase**
- [ ] Animated sections for each major feature: PDF templates, AI generation, document variants (ZATCA/UAE FTA), recurring invoices, expense tracking, reports
- [ ] iPhone mockups showing real app screenshots embedded in device frames
- [ ] Scroll-triggered reveal animations (fade, slide, parallax — tasteful, not excessive)

**Pricing**
- [ ] Free vs Pro comparison table matching App Store pricing ($5.99/mo, $39.99/yr)
- [ ] CTA buttons linking to App Store download
- [ ] Feature checklist with checkmarks/crosses per tier

**Legal**
- [ ] Privacy Policy page (replace GitHub Pages version)
- [ ] Terms of Service page (replace GitHub Pages version)
- [ ] Clean typography, readable layout

**Blog / Updates**
- [ ] MDX or markdown-based blog for content marketing
- [ ] SEO-optimized: meta tags, Open Graph, structured data, sitemap
- [ ] Categories: invoice tips, tax guides, product updates, freelancer resources

**Localization**
- [ ] 8 languages: English (default), Arabic (RTL), German, Spanish, French, Japanese, Portuguese (BR), Swedish
- [ ] Arabic must render correctly with RTL layout (mirrored navigation, text alignment)
- [ ] Language switcher in header/footer
- [ ] URL-based routing: getswiftbill.app/ar/, getswiftbill.app/de/, etc.

**Footer & Navigation**
- [ ] Sticky header with logo + nav links + language switcher + App Store CTA
- [ ] Footer: links to all pages, social media, App Store badge, legal links, language switcher
- [ ] Smooth scroll navigation between sections on homepage

**SEO & Performance**
- [ ] Server-side rendered or statically generated for SEO
- [ ] Open Graph images per page (auto-generated or custom)
- [ ] Structured data (Organization, SoftwareApplication)
- [ ] Sitemap.xml, robots.txt
- [ ] Analytics integration (Mixpanel or simple page views)

### Out of Scope

- Web app / dashboard — this is a marketing site only, no user auth or invoice creation
- Payment processing — all purchases go through App Store
- User accounts / login — no Supabase integration on the website
- Custom CMS — blog is file-based (MDX), not a database-backed CMS
- Android — iOS only for now, no Google Play links

## Context

- **SwiftBill iOS app** is LIVE on App Store (v1.2). App Store ID: 6760855924
- **Current website** is bare GitHub Pages at sheboftek.github.io/swiftbill/ (just privacy/terms)
- **Domain:** getswiftbill.app purchased on GoDaddy — needs DNS setup to point to hosting
- **App design:** Light mode, #3053EC blue accent, white backgrounds, Inter + Open Sans fonts
- **Target audience:** Freelancers, contractors, small business owners — especially in Gulf region (Saudi, UAE) but global
- **Languages:** EN, AR, DE, ES, FR, JA, PT-BR, SV (matching app localization)
- **Key selling points:** 15 PDF templates, ZATCA/UAE FTA compliance, AI document generation, bilingual Arabic invoices, beautiful design
- **Competitors to outshine:** Invoice Simple, Invoicely, Wave — most have mediocre websites

## Constraints

- **Design**: Stripe-level polish — all-light theme, blue accent, smooth animations, professional photography/mockups
- **Performance**: Must score 90+ on Lighthouse (all categories)
- **Hosting**: Static/JAMstack deployment (Vercel, Netlify, or Cloudflare Pages) for speed and cost
- **SEO**: Must be SSR/SSG — no client-only SPA that search engines can't crawl
- **RTL**: Arabic pages must have fully mirrored RTL layout
- **Domain**: getswiftbill.app — need to configure DNS from GoDaddy to hosting provider
- **Budget**: Minimal — use free tier hosting, no paid stock photos (use app screenshots + generated mockups)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| All-light theme (not dark) | Matches the iOS app's light-mode-only design | -- Pending |
| Stripe-level design energy | Premium positioning — SwiftBill is a Pro product | -- Pending |
| File-based blog (MDX) | No CMS dependency, fast builds, developer-friendly | -- Pending |
| 8-language localization | Match app languages, Gulf market is primary audience | -- Pending |
| Static generation + hosting | Fast, cheap, CDN-distributed, great for SEO | -- Pending |

---
*Last updated: 2026-03-26 after initialization*
