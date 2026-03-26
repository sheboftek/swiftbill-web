# Requirements: SwiftBill Marketing Website

**Defined:** 2026-03-26
**Core Value:** Convert visitors to App Store downloads through a stunning, trust-building first impression that makes SwiftBill look like it's backed by a billion-dollar company.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Hero & First Impression

- [ ] **HERO-01**: Hero section with clear value prop headline and subheadline
- [ ] **HERO-02**: App Store download badge visible above fold
- [ ] **HERO-03**: Mobile-first responsive design with min 48x48dp tap targets
- [ ] **HERO-04**: Scroll-triggered reveal animations on feature sections (never on LCP element)

### Content & Features Showcase

- [ ] **CONT-01**: Feature benefits section with benefits-first copy ("Get paid faster")
- [ ] **CONT-02**: Interactive template gallery showing 15 PDF templates visually
- [ ] **CONT-03**: ZATCA/UAE FTA compliance badge section with QR code mention
- [ ] **CONT-04**: Country-specific content — Saudi visitors see ZATCA e-invoicing, UAE visitors see FTA e-invoicing (geo-targeted or selectable)

### Pricing & Conversion

- [ ] **PRIC-01**: Pricing section with Free vs Pro comparison ($5.99/mo, $39.99/yr)
- [ ] **PRIC-02**: Contact/support email link accessible from every page
- [ ] **PRIC-03**: Device-aware CTA — iOS shows App Store badge, desktop shows QR code

### Localization

- [ ] **I18N-01**: English language version (default)
- [ ] **I18N-02**: Arabic language version with full RTL layout
- [ ] **I18N-03**: Language switcher in header and footer
- [ ] **I18N-04**: URL-based locale routing (/ar/ for Arabic, root for English)
- [ ] **I18N-05**: CSS Logical Properties used throughout (no directional CSS)
- [ ] **I18N-06**: Hreflang tags for EN + AR + x-default on every page

### SEO & Performance

- [ ] **SEO-01**: SEO meta tags (title, description) on every page
- [ ] **SEO-02**: Open Graph tags for social sharing (WhatsApp/Twitter/Facebook)
- [ ] **SEO-03**: Schema.org SoftwareApplication structured data (JSON-LD)
- [ ] **SEO-04**: XML sitemap with hreflang for EN + AR locales
- [ ] **SEO-05**: robots.txt allowing all crawlers
- [ ] **SEO-06**: 90+ Lighthouse score on all categories (Performance, Accessibility, Best Practices, SEO)
- [ ] **SEO-07**: LCP < 2.5s on mobile

### Legal & Footer

- [ ] **LEGAL-01**: Privacy Policy page (styled, replaces GitHub Pages version)
- [ ] **LEGAL-02**: Terms of Service page (styled, replaces GitHub Pages version)
- [ ] **LEGAL-03**: Footer with legal links, support email, social media links, App Store badge, language switcher

### Blog

- [ ] **BLOG-01**: MDX-based blog with Content Collections
- [ ] **BLOG-02**: Blog post categories (invoice tips, tax guides, product updates)
- [ ] **BLOG-03**: Per-locale blog posts (EN + AR)
- [ ] **BLOG-04**: Blog index page with category filtering
- [ ] **BLOG-05**: Prose styling for blog content (typography plugin)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Visual Polish

- **VIS-01**: iPhone device mockup frames for app screenshots
- **VIS-02**: App preview video (15-30 sec demo)
- **VIS-03**: Per-locale OG images for social sharing

### Social Proof

- **SOCL-01**: App Store rating badge + review count near CTAs
- **SOCL-02**: Testimonials from Gulf region users
- **SOCL-03**: Performance stats bar ("X invoices created, Y countries")

### Content Expansion

- **EXPN-01**: Competitor comparison table (SwiftBill vs Invoice Simple vs Wave)
- **EXPN-02**: Use-case sections by audience (Freelancers, SMBs, Contractors)
- **EXPN-03**: Localized currency display (SAR/AED alongside USD)

### Localization Expansion

- **L10N-01**: German translation
- **L10N-02**: Spanish translation
- **L10N-03**: French translation
- **L10N-04**: Japanese translation
- **L10N-05**: Portuguese (BR) translation
- **L10N-06**: Swedish translation

### Platform

- **PLAT-01**: Apple Smart App Banner meta tag
- **PLAT-02**: Newsletter signup

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Web app / dashboard | Marketing site only, no user auth or invoice creation |
| Payment processing | All purchases through App Store |
| User accounts / login | No Supabase integration on website |
| Custom CMS | Blog is file-based MDX, not database-backed |
| Android / Google Play | iOS only for now |
| Hero carousel / slider | Anti-feature: <1% CTR after first slide |
| Chatbot / live chat | JS bloat, covers CTA on mobile, support burden |
| Social media feed embeds | 200-500KB JS, slow load, distracts from CTA |
| Auto-redirect by locale | Blocks Googlebot — use static paths instead |
| Registration / accounts | App handles onboarding, website drives App Store only |
| Multiple competing CTAs | Decision paralysis — one primary CTA (Download) |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | - | Pending |
| HERO-02 | - | Pending |
| HERO-03 | - | Pending |
| HERO-04 | - | Pending |
| CONT-01 | - | Pending |
| CONT-02 | - | Pending |
| CONT-03 | - | Pending |
| CONT-04 | - | Pending |
| PRIC-01 | - | Pending |
| PRIC-02 | - | Pending |
| PRIC-03 | - | Pending |
| I18N-01 | - | Pending |
| I18N-02 | - | Pending |
| I18N-03 | - | Pending |
| I18N-04 | - | Pending |
| I18N-05 | - | Pending |
| I18N-06 | - | Pending |
| SEO-01 | - | Pending |
| SEO-02 | - | Pending |
| SEO-03 | - | Pending |
| SEO-04 | - | Pending |
| SEO-05 | - | Pending |
| SEO-06 | - | Pending |
| SEO-07 | - | Pending |
| LEGAL-01 | - | Pending |
| LEGAL-02 | - | Pending |
| LEGAL-03 | - | Pending |
| BLOG-01 | - | Pending |
| BLOG-02 | - | Pending |
| BLOG-03 | - | Pending |
| BLOG-04 | - | Pending |
| BLOG-05 | - | Pending |

**Coverage:**
- v1 requirements: 32 total
- Mapped to phases: 0
- Unmapped: 32 (pending roadmap creation)

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after initial definition*
