# SwiftBill Marketing Website Architecture Research

**Date:** 2026-03-26
**Domain:** getswiftbill.app
**Stack Decision:** Next.js App Router (recommended over Astro -- see rationale below)
**Languages:** EN (default), AR (RTL), DE, ES, FR, JA, PT-BR, SV

---

## System Overview

```
+------------------------------------------------------------------+
|                        DEPLOYMENT LAYER                          |
|  Vercel / Netlify / Cloudflare Pages  (Static + Edge Middleware) |
+------------------------------------------------------------------+
         |                    |                    |
+--------v-------+  +--------v--------+  +--------v--------+
|   MIDDLEWARE    |  |    STATIC       |  |    CDN / EDGE   |
| Locale detect  |  |    ASSETS       |  |  Image Optim.   |
| Redirect /xx/  |  |  Fonts, OG imgs |  |  next/image     |
| Accept-Language |  |  iPhone mockups |  |  WebP/AVIF      |
+--------+-------+  +-----------------+  +-----------------+
         |
+--------v---------------------------------------------------------+
|                     NEXT.JS APP ROUTER                           |
|  app/[locale]/                                                   |
|  +------------------+  +-----------------+  +------------------+ |
|  | LAYOUT LAYER     |  | PAGE LAYER      |  | CONTENT LAYER    | |
|  | RootLayout       |  | page.tsx (SSG)  |  | /messages/*.json | |
|  | dir={rtl|ltr}    |  | generateStatic  |  | /content/blog/   | |
|  | lang={locale}    |  | Params          |  |   /{locale}/*.mdx| |
|  | <Header/>        |  | setRequestLocale|  | mdx-components   | |
|  | <Footer/>        |  +-----------------+  +------------------+ |
|  +------------------+                                            |
+------------------------------------------------------------------+
         |                    |                    |
+--------v-------+  +--------v--------+  +--------v--------+
|   COMPONENT    |  |   ANIMATION     |  |   I18N ENGINE   |
|   LIBRARY      |  |   SYSTEM        |  |   next-intl     |
| <DeviceMockup> |  | Motion (framer) |  | useTranslations |
| <PricingTable> |  | whileInView     |  | useLocale       |
| <GlassCard>    |  | <ScrollReveal>  |  | middleware.ts   |
| <CTAButton>    |  | variants        |  | routing.ts      |
+----------------+  +-----------------+  +-----------------+
```

---

## Framework Recommendation: Next.js over Astro

| Criterion | Next.js App Router | Astro |
|---|---|---|
| Static perf (Lighthouse) | ~90-95 | ~95-99 |
| JS shipped (static pages) | ~85KB baseline | ~8KB baseline |
| i18n ecosystem | next-intl (mature, typed) | Built-in but simpler |
| MDX support | @next/mdx + Rust compiler | Native MDX/content collections |
| Animation ecosystem | Motion (framer-motion) seamless | Needs React islands |
| RTL layout support | Full (dir on html, CSS logical) | Full |
| Middleware (locale detect) | Edge middleware built-in | Needs adapter |
| Image optimization | next/image (automatic AVIF/WebP) | Manual / @astrojs/image |
| Deployment | Vercel zero-config, all platforms | All platforms |
| React component reuse | Native | Via islands (extra config) |

**Verdict:** Next.js App Router is recommended. While Astro ships less JS for pure static content, SwiftBill's marketing site requires scroll-triggered animations throughout, interactive pricing tables, and potential future interactive features. Next.js provides a more unified development experience with Motion (framer-motion), has a more mature i18n ecosystem (next-intl), and the performance difference is negligible when using `output: 'export'` or ISR with proper static generation. The animation-heavy nature of the site tips the scale toward Next.js.

**Confidence:** HIGH -- based on official docs, 2026 comparison articles, and production patterns.

---

## Component Responsibilities

| Component | Responsibility | Renders On | Notes |
|---|---|---|---|
| `middleware.ts` | Locale detection, redirect to /xx/ | Edge | Uses Accept-Language + cookie |
| `app/[locale]/layout.tsx` | Root HTML, dir/lang attrs, Header/Footer | Server (SSG) | Calls `setRequestLocale()` |
| `app/[locale]/page.tsx` | Home page | Server (SSG) | Hero, features, pricing, CTA |
| `app/[locale]/blog/page.tsx` | Blog index | Server (SSG) | Lists posts for current locale |
| `app/[locale]/blog/[slug]/page.tsx` | Blog post | Server (SSG) | Renders MDX content |
| `app/[locale]/pricing/page.tsx` | Pricing page | Server (SSG) | Interactive toggle (Client) |
| `messages/{locale}.json` | UI translations | Build time | Loaded by next-intl |
| `content/blog/{locale}/*.mdx` | Blog posts per language | Build time | Compiled by @next/mdx |
| `components/ui/*` | Reusable UI primitives | Mixed | Buttons, cards, inputs |
| `components/sections/*` | Page sections | Server | Hero, Features, Testimonials |
| `components/animations/*` | Animation wrappers | Client | ScrollReveal, FadeIn, etc. |
| `components/device-mockup.tsx` | iPhone frame + screenshot | Server | Uses next/image |
| `lib/i18n/routing.ts` | Locale config, navigation helpers | Shared | createNavigation() |
| `lib/i18n/request.ts` | Server-side locale resolution | Server | getRequestConfig() |
| `lib/fonts.ts` | Font loading (Inter, Open Sans) | Server | next/font/google |
| `lib/metadata.ts` | SEO metadata + hreflang generation | Server | generateMetadata() |

---

## Recommended Project Structure

```
swiftbill-web/
+-- .planning/                        # Planning docs (not deployed)
|   +-- research/
|       +-- ARCHITECTURE.md           # This file
+-- public/
|   +-- images/
|   |   +-- mockups/                  # iPhone device screenshots
|   |   |   +-- hero-light.webp       # Pre-optimized WebP/AVIF
|   |   |   +-- feature-tracking.webp
|   |   +-- og/                       # Open Graph images per locale
|   |   |   +-- og-en.png             # 1200x630 per locale
|   |   |   +-- og-ar.png
|   |   +-- icons/                    # Favicons, app icons
|   |   +-- logo.svg                  # SVG logo (scales perfectly)
|   +-- fonts/                        # Self-hosted font files (if not using next/font)
+-- src/
|   +-- app/
|   |   +-- [locale]/                 # Dynamic locale segment
|   |   |   +-- layout.tsx            # Root layout: <html lang dir>, Header, Footer
|   |   |   +-- page.tsx              # Home: Hero + Features + Pricing + CTA
|   |   |   +-- pricing/
|   |   |   |   +-- page.tsx          # Dedicated pricing page
|   |   |   +-- blog/
|   |   |   |   +-- page.tsx          # Blog index (lists posts for locale)
|   |   |   |   +-- [slug]/
|   |   |   |       +-- page.tsx      # Individual blog post (renders MDX)
|   |   |   +-- privacy/
|   |   |   |   +-- page.tsx          # Privacy policy
|   |   |   +-- terms/
|   |   |       +-- page.tsx          # Terms of service
|   |   +-- layout.tsx                # Minimal root (no UI, just providers if needed)
|   |   +-- not-found.tsx             # 404 page
|   |   +-- sitemap.ts                # Dynamic sitemap with all locales
|   |   +-- robots.ts                 # robots.txt generation
|   +-- components/
|   |   +-- ui/                       # Design system primitives
|   |   |   +-- button.tsx
|   |   |   +-- card.tsx
|   |   |   +-- badge.tsx
|   |   |   +-- container.tsx
|   |   |   +-- section.tsx
|   |   +-- sections/                 # Page-level sections (Server Components)
|   |   |   +-- hero.tsx
|   |   |   +-- features.tsx
|   |   |   +-- pricing-table.tsx
|   |   |   +-- testimonials.tsx
|   |   |   +-- cta-banner.tsx
|   |   |   +-- faq.tsx
|   |   +-- layout/                   # Structural components
|   |   |   +-- header.tsx            # Nav bar with locale switcher
|   |   |   +-- footer.tsx
|   |   |   +-- locale-switcher.tsx   # Language dropdown
|   |   |   +-- mobile-nav.tsx
|   |   +-- animations/              # Client Components ("use client")
|   |   |   +-- scroll-reveal.tsx     # whileInView wrapper
|   |   |   +-- fade-in.tsx
|   |   |   +-- slide-up.tsx
|   |   |   +-- stagger-children.tsx
|   |   |   +-- counter.tsx           # Animated number counter
|   |   +-- blog/                     # Blog-specific components
|   |   |   +-- post-card.tsx
|   |   |   +-- post-header.tsx
|   |   |   +-- table-of-contents.tsx
|   |   +-- device-mockup.tsx         # iPhone frame with screenshot
|   |   +-- app-store-badge.tsx       # App Store download button
|   +-- content/
|   |   +-- blog/                     # MDX blog posts organized by locale
|   |   |   +-- en/
|   |   |   |   +-- getting-started.mdx
|   |   |   |   +-- bill-tracking-tips.mdx
|   |   |   +-- ar/
|   |   |   |   +-- getting-started.mdx
|   |   |   +-- de/
|   |   |   |   +-- getting-started.mdx
|   |   |   +-- es/
|   |   |   +-- fr/
|   |   |   +-- ja/
|   |   |   +-- pt-BR/
|   |   |   +-- sv/
|   +-- messages/                     # Translation JSON files (next-intl)
|   |   +-- en.json                   # English (default)
|   |   +-- ar.json                   # Arabic (RTL)
|   |   +-- de.json                   # German
|   |   +-- es.json                   # Spanish
|   |   +-- fr.json                   # French
|   |   +-- ja.json                   # Japanese
|   |   +-- pt-BR.json               # Portuguese (Brazil)
|   |   +-- sv.json                   # Swedish
|   +-- lib/
|   |   +-- i18n/
|   |   |   +-- routing.ts           # Locale list, default locale, pathnames
|   |   |   +-- request.ts           # getRequestConfig for server components
|   |   |   +-- navigation.ts        # createNavigation() exports: Link, redirect, etc.
|   |   +-- fonts.ts                  # next/font/google: Inter + Open Sans
|   |   +-- metadata.ts              # Shared metadata + hreflang generator
|   |   +-- blog.ts                   # Blog post loading, sorting, filtering
|   |   +-- constants.ts             # App Store URLs, social links, brand colors
|   |   +-- utils.ts                 # cn() classname merge, formatDate, etc.
|   +-- styles/
|   |   +-- globals.css              # Tailwind directives + CSS custom properties
|   |   +-- rtl.css                  # RTL-specific overrides (minimal, most handled by logical props)
|   +-- middleware.ts                 # Root middleware: locale detection + redirect
+-- mdx-components.tsx               # Global MDX component mappings
+-- next.config.mjs                   # Next.js config: withMDX, i18n, images
+-- tailwind.config.ts               # Tailwind: brand colors, fonts, animations
+-- tsconfig.json
+-- package.json
```

**Confidence:** HIGH -- based on Next.js official project structure docs, next-intl recommended patterns, and 2026 production guides.

---

## Architectural Patterns

### 1. i18n Routing (URL-Based with next-intl)

**Pattern:** Dynamic `[locale]` segment with middleware-driven locale detection.

```
URL Structure:
  getswiftbill.app/           -> English (default, no prefix)
  getswiftbill.app/ar/        -> Arabic (RTL)
  getswiftbill.app/de/        -> German
  getswiftbill.app/es/        -> Spanish
  getswiftbill.app/fr/        -> French
  getswiftbill.app/ja/        -> Japanese
  getswiftbill.app/pt-BR/     -> Portuguese (Brazil)
  getswiftbill.app/sv/        -> Swedish
```

**Key files:**

`src/lib/i18n/routing.ts`:
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'de', 'es', 'fr', 'ja', 'pt-BR', 'sv'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'  // No /en/ prefix for default
});
```

`src/lib/i18n/navigation.ts`:
```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// ALWAYS use these instead of next/navigation
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

`src/middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ar|de|es|fr|ja|pt-BR|sv)/:path*']
};
```

`src/app/[locale]/layout.tsx`:
```typescript
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const direction = ['ar'].includes(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body>{children}</body>
    </html>
  );
}
```

**Critical rule:** Every page and layout under `[locale]` MUST call `setRequestLocale(locale)` or it falls back to dynamic rendering, breaking SSG.

**Confidence:** HIGH -- from next-intl official docs and Next.js i18n guide.

---

### 2. Translation File Organization

**Pattern:** Single JSON file per locale, namespaced by feature/section.

```json
// messages/en.json
{
  "Metadata": {
    "title": "SwiftBill - Track Bills & Subscriptions",
    "description": "Never miss a payment again..."
  },
  "Header": {
    "features": "Features",
    "pricing": "Pricing",
    "blog": "Blog",
    "downloadApp": "Download App"
  },
  "Hero": {
    "headline": "Take Control of Your Bills",
    "subheadline": "Track subscriptions, bills, and recurring payments in one place.",
    "ctaPrimary": "Download Free",
    "ctaSecondary": "See Pricing"
  },
  "Features": {
    "title": "Everything You Need",
    "tracking": {
      "title": "Smart Bill Tracking",
      "description": "..."
    }
  },
  "Pricing": {
    "title": "Simple Pricing",
    "monthly": "Monthly",
    "annual": "Annual",
    "lifetime": "Lifetime"
  },
  "Footer": {
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "copyright": "2026 SwiftBill. All rights reserved."
  }
}
```

```json
// messages/ar.json  (Arabic -- same keys, RTL content)
{
  "Metadata": {
    "title": "SwiftBill - تتبع الفواتير والاشتراكات",
    "description": "لا تفوت أي دفعة مرة أخرى..."
  },
  "Hero": {
    "headline": "تحكم في فواتيرك",
    "subheadline": "تتبع الاشتراكات والفواتير والمدفوعات المتكررة في مكان واحد.",
    "ctaPrimary": "تحميل مجاني",
    "ctaSecondary": "عرض الأسعار"
  }
}
```

**Why single-file-per-locale over per-page files:** For a marketing site with ~5-8 pages, single files stay manageable (likely under 500 keys). Splitting into per-page files adds overhead without meaningful benefit at this scale. If the site grows past ~1000 keys, split into modular files like `messages/en/hero.json`, `messages/en/pricing.json` and merge them at load time.

**Confidence:** HIGH -- next-intl recommends this pattern for small-to-medium sites.

---

### 3. RTL Handling Architecture

**Strategy: Three-layer approach -- dir attribute + CSS logical properties + minimal RTL overrides.**

#### Layer 1: HTML `dir` attribute (automatic layout flip)
```typescript
// In app/[locale]/layout.tsx
const RTL_LOCALES = ['ar'] as const;
const direction = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
// <html lang={locale} dir={direction}>
```

Setting `dir="rtl"` on `<html>` causes:
- Flexbox and Grid automatically reverse
- Text alignment flips
- Scroll direction reverses
- Browser chrome adapts

#### Layer 2: CSS Logical Properties (replaces physical directions)

**Use these everywhere instead of physical properties:**

| Physical (avoid) | Logical (use) |
|---|---|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `border-left` | `border-inline-start` |
| `left: 0` | `inset-inline-start: 0` |
| `right: 0` | `inset-inline-end: 0` |
| `float: left` | `float: inline-start` |

In Tailwind CSS (v3.4+/v4), use logical utility classes:
```
ms-4     -> margin-inline-start
me-4     -> margin-inline-end
ps-4     -> padding-inline-start
pe-4     -> padding-inline-end
start-0  -> inset-inline-start
end-0    -> inset-inline-end
```

#### Layer 3: RTL-specific overrides (minimal)
```css
/* styles/rtl.css -- only for things that can't use logical properties */
[dir="rtl"] .chevron-icon {
  transform: scaleX(-1);  /* Flip directional icons */
}

[dir="rtl"] .phone-mockup {
  transform: none;  /* Don't flip device mockups */
}
```

**Key RTL rules for SwiftBill:**
1. Directional icons (arrows, chevrons) must flip via `scaleX(-1)` or use `chevron.backward`/`chevron.forward` semantics
2. iPhone mockups do NOT flip -- screenshots show LTR app content
3. Numbers, brand names, and English product names within Arabic text remain LTR (handled by Unicode bidi algorithm automatically)
4. App Store badges remain LTR (they are branded assets)
5. Font: Arabic text needs a different font or font stack (e.g., Noto Sans Arabic or IBM Plex Arabic as fallback)

**Confidence:** HIGH -- W3C i18n guidelines, CSS spec, Tailwind docs, production RTL sites.

---

### 4. MDX Blog Pipeline

**Pattern:** Locale-prefixed content directories with shared MDX components.

```
Content Flow:
  content/blog/en/getting-started.mdx
       |
       v
  [Build: @next/mdx + mdxRs compiler]
       |
       v
  app/[locale]/blog/[slug]/page.tsx
       |
       v
  Rendered with shared <MDXComponents>
       |
       v
  Static HTML at /blog/getting-started
                  /ar/blog/getting-started
                  /de/blog/getting-started
```

**MDX file structure:**
```mdx
---
title: "Getting Started with SwiftBill"
description: "Learn how to set up bill tracking in under 2 minutes"
date: "2026-03-15"
author: "SwiftBill Team"
image: "/images/blog/getting-started-hero.webp"
tags: ["tutorial", "getting-started"]
---

import { DeviceMockup } from '@/components/device-mockup'
import { Callout } from '@/components/ui/callout'

# Getting Started with SwiftBill

<Callout type="info">
  SwiftBill is available on the App Store for iPhone.
</Callout>

<DeviceMockup src="/images/mockups/onboarding.webp" alt="SwiftBill onboarding screen" />
```

**Blog post loading (`lib/blog.ts`):**
```typescript
// Loads MDX files from content/blog/{locale}/
// Parses frontmatter for metadata
// Returns sorted posts for a given locale
// Falls back to English if a post is not translated
```

**Key decisions:**
- Blog posts are separate files per locale (not one file with multiple translations) because blog content diverges significantly between languages
- Not every post needs translation for all 8 languages -- show only translated posts in each locale's blog index
- Shared MDX components (`mdx-components.tsx`) map standard elements to styled components
- Frontmatter parsed at build time for metadata, OG images, and structured data

**Confidence:** HIGH -- Next.js MDX guide, production multilingual blog patterns.

---

### 5. Animation System

**Pattern:** Thin client-side wrapper components using Motion (framer-motion), composed into Server Component pages.**

```
Animation Architecture:

  Server Component (page.tsx)
       |
       +-- <ScrollReveal>          (Client Component wrapper)
       |       +-- <FeatureCard>   (Server Component content)
       |
       +-- <StaggerChildren>       (Client Component wrapper)
       |       +-- <PricingTier>   (Server Component content)
       |       +-- <PricingTier>
       |
       +-- <FadeIn>                (Client Component wrapper)
               +-- <CTABanner>     (Server Component content)
```

**Core animation wrapper (`components/animations/scroll-reveal.tsx`):**
```typescript
"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

const directionOffset = {
  up:    { y: 40 },
  down:  { y: -40 },
  left:  { x: 40 },     // Uses x, not physical left/right -- works with RTL
  right: { x: -40 },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Animation rules:**
1. All animation components are Client Components (`"use client"`)
2. Content inside animation wrappers remains Server Components (no unnecessary client bundling)
3. Use `whileInView` with `viewport={{ once: true }}` for scroll-triggered animations (fires once, not on every scroll)
4. Use `margin: "-100px"` on viewport to trigger slightly before element enters view
5. Page transitions via `<AnimatePresence>` in the locale layout (optional, adds complexity)
6. Stagger children with incremental `delay` values (0, 0.1, 0.2...)
7. Motion's x/y transforms work correctly in both LTR and RTL contexts

**Confidence:** HIGH -- Motion/framer-motion official docs, Next.js App Router compatibility confirmed.

---

### 6. Image Optimization Strategy

**Pattern:** next/image for all images, pre-optimized mockups in `/public/images/`.**

```
Image Pipeline:

  Source (design tool)
       |
       v
  Export at 2x resolution (for Retina)
       |
       v
  Optimize: squoosh/sharp -> WebP (quality 85)
       |
       v
  Place in /public/images/mockups/
       |
       v
  Reference via next/image with sizes prop
       |
       v
  Next.js serves AVIF/WebP with responsive srcset
```

**iPhone mockup component:**
```typescript
// components/device-mockup.tsx
import Image from 'next/image';

export function DeviceMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-[280px]">
      {/* iPhone frame (CSS or SVG overlay) */}
      <div className="device-frame">
        <Image
          src={src}
          alt={alt}
          width={1179}    // iPhone 15 Pro screenshot width
          height={2556}   // iPhone 15 Pro screenshot height
          sizes="(max-width: 768px) 240px, 280px"
          quality={90}
          priority={false}  // true only for hero mockup
          className="rounded-[2rem]"
        />
      </div>
    </div>
  );
}
```

**Image organization:**
```
public/images/
+-- mockups/           # iPhone device screenshots
|   +-- hero.webp      # Hero section (priority load)
|   +-- tracking.webp  # Bill tracking feature
|   +-- insights.webp  # AI insights feature
|   +-- widgets.webp   # Widget showcase
+-- og/                # Open Graph images (1200x630)
|   +-- og-en.png      # One per locale (localized text on image)
|   +-- og-ar.png
+-- blog/              # Blog post images
|   +-- getting-started-hero.webp
+-- icons/             # Favicons, Apple touch icons
+-- logo.svg           # Vector logo
+-- app-store-badge.svg
```

**Key rules:**
1. Hero mockup image uses `priority={true}` for LCP optimization
2. Below-fold mockups use default lazy loading
3. Specify `sizes` prop to avoid serving oversized images on mobile
4. Pre-optimize to WebP before placing in `/public/` -- next/image will further optimize
5. OG images must be locale-specific if they contain text
6. SVGs for logos and badges (resolution-independent)

**Confidence:** HIGH -- Next.js image optimization docs, Core Web Vitals best practices.

---

## Data Flow Diagrams

### Request Flow (Static Site)
```
User visits getswiftbill.app/ar/pricing

  Browser
    |
    v
  CDN Edge (Vercel/Cloudflare)
    |-- Cached? --> Serve static HTML + assets
    |
    v (cache miss at build)
  Middleware (Edge Runtime)
    |-- Has /ar/ prefix? --> Yes, proceed
    |-- No locale prefix? --> Detect via Accept-Language
    |                         Redirect to /xx/
    v
  app/[locale]/pricing/page.tsx
    |-- setRequestLocale('ar')
    |-- Load messages/ar.json
    |-- Render Server Components
    |-- Inject dir="rtl" on <html>
    v
  Static HTML (pre-built at deploy)
    |-- Includes <link rel="alternate" hreflang="..."> for all locales
    |-- next/image references optimized /images/...
    v
  Browser renders
    |-- CSS logical properties auto-flip for RTL
    |-- Motion animations trigger on scroll (client JS)
    |-- Locale switcher available in header
```

### Blog Content Flow
```
  content/blog/en/getting-started.mdx
       |
  [Build time]
       |
       v
  lib/blog.ts -- getAllPosts('en')
       |-- Read directory content/blog/en/
       |-- Parse frontmatter (gray-matter)
       |-- Sort by date descending
       |-- Return PostMeta[]
       v
  app/[locale]/blog/page.tsx
       |-- Lists posts for current locale
       |-- Falls back: if locale has 0 posts, show English
       v
  app/[locale]/blog/[slug]/page.tsx
       |-- generateStaticParams(): all locale+slug combos
       |-- Load specific MDX file
       |-- Render with <MDXComponents>
       |-- Generate metadata (title, description, OG)
       v
  Static HTML at /ar/blog/getting-started
```

### Translation Flow
```
  messages/ar.json
       |
  [Build time: next-intl]
       |
       v
  getRequestConfig() in lib/i18n/request.ts
       |-- Reads locale from middleware header
       |-- Dynamically imports messages/{locale}.json
       v
  Server Component: useTranslations('Hero')
       |-- t('headline') -> "تحكم في فواتيرك"
       |-- t('ctaPrimary') -> "تحميل مجاني"
       v
  Client Component: useTranslations('Pricing')
       |-- Messages passed via NextIntlClientProvider
       |-- Only the namespace used is sent to client (tree-shaking)
```

---

## Integration Points

### App Store Links
```typescript
// lib/constants.ts
export const APP_STORE_URL = 'https://apps.apple.com/app/swiftbill/id{APP_ID}';
// Consider locale-specific App Store URLs:
// https://apps.apple.com/{country_code}/app/swiftbill/id{APP_ID}
// ar -> /sa/ or /ae/, de -> /de/, ja -> /jp/, etc.
```

### Analytics
- **Recommended:** Vercel Analytics (zero-config with Vercel deployment) or Plausible/Fathom (privacy-first)
- Track locale as a custom property on all events
- Track blog post views per locale
- Track App Store link clicks per locale
- **Implementation:** Analytics provider component in root layout, outside `[locale]` segment

### Fonts
```typescript
// lib/fonts.ts
import { Inter, Open_Sans, Noto_Sans_Arabic } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '600', '700'],
});
```

Apply conditionally in layout:
```typescript
// Arabic gets Noto Sans Arabic; all others get Inter + Open Sans
const fontClass = locale === 'ar'
  ? `${notoSansArabic.variable} ${inter.variable}`
  : `${inter.variable} ${openSans.variable}`;
```

### SEO / Metadata
```typescript
// Each page generates locale-aware metadata
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://getswiftbill.app/${locale === 'en' ? '' : locale + '/'}`,
      languages: Object.fromEntries(
        routing.locales.map(l => [
          l,
          `https://getswiftbill.app/${l === 'en' ? '' : l + '/'}`
        ])
      ),
    },
    openGraph: {
      images: [`/images/og/og-${locale}.png`],
    },
  };
}
```

### Structured Data (JSON-LD)
- SoftwareApplication schema on home page
- BlogPosting schema on each blog post
- Organization schema in footer/layout
- BreadcrumbList on all pages

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Do This Instead |
|---|---|---|
| Forgetting `setRequestLocale()` in pages/layouts | Falls back to dynamic rendering, breaks SSG | Add to EVERY page and layout under `[locale]` |
| Using `next/navigation` instead of next-intl navigation | Links lose locale prefix, break routing | Always import `Link`, `useRouter` from `@/lib/i18n/navigation` |
| Physical CSS properties (`margin-left`, `padding-right`) | Breaks RTL layout | Use logical properties (`margin-inline-start`, `padding-inline-end`) |
| Separate CSS files for RTL | Maintenance nightmare, easy to forget | CSS logical properties + `dir` attribute handles 95% automatically |
| Translating blog posts inline in one MDX file | Unmanageable, huge files | Separate MDX files per locale in `content/blog/{locale}/` |
| Loading all translations on every page | Bloats client bundle | next-intl automatically tree-shakes; use namespaces |
| Hardcoding strings in components | Untranslatable | Always use `t('key')` from useTranslations |
| Using `text-align: left` in global CSS | Breaks Arabic layout | Use `text-align: start` or Tailwind `text-start` |
| Flipping iPhone mockups in RTL | Screenshots show LTR app -- flipping looks wrong | Never transform mockup images for RTL |
| Single OG image for all locales | Misses localization opportunity, wrong language in previews | Generate locale-specific OG images |
| Putting animation logic in Server Components | Won't work -- needs browser APIs | Keep animation wrappers as Client Components, content as Server |
| Using `float: left/right` | Doesn't respect `dir` attribute | Use `float: inline-start/end` or Flexbox/Grid |
| Skipping `hreflang` tags | Search engines can't discover alternate language versions | Generate in `generateMetadata()` using `alternates.languages` |
| Non-unique translation keys across namespaces | Confusing, hard to maintain | Namespace keys by section: `Hero.headline`, `Pricing.title` |
| Deploying without testing Arabic in real browser | RTL bugs only visible in rendered layout | Always QA Arabic pages in browser with `dir="rtl"` before deploy |

---

## Sources

### Official Documentation (HIGH confidence)
- [Next.js App Router Internationalization Guide](https://nextjs.org/docs/app/guides/internationalization) -- Official Next.js i18n patterns
- [next-intl App Router Setup](https://next-intl.dev/docs/getting-started/app-router) -- next-intl official docs
- [next-intl Locale-Based Routing Setup](https://next-intl.dev/docs/routing/setup) -- Middleware and routing config
- [next-intl Rendering Translations](https://next-intl.dev/docs/usage/translations) -- Translation usage patterns
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) -- Official folder conventions
- [Next.js MDX Guide](https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/mdx.mdx) -- MDX setup with App Router
- [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images) -- next/image component
- [Astro i18n Routing](https://github.com/withastro/docs/blob/main/src/content/docs/en/guides/internationalization.mdx) -- Astro's built-in i18n (reference)
- [Astro Multilingual Content Recipes](https://github.com/withastro/docs/blob/main/src/content/docs/en/recipes/i18n.mdx) -- Content collection i18n
- [W3C HTML dir Attribute](https://www.w3.org/International/questions/qa-html-dir.en.html) -- Authoritative RTL markup guide
- [Motion Scroll Animations](https://www.framer.com/motion/scroll-animations/) -- whileInView, useInView official docs
- [Motion inView](https://motion.dev/docs/inview) -- Intersection observer wrapper

### Technical Articles (MEDIUM confidence)
- [Next.js i18n Made Easy (2026)](https://gundogmuseray.medium.com/next-js-i18n-made-easy-build-multilingual-apps-with-app-router-in-2026-236151f37d60) -- 2026 App Router i18n walkthrough
- [next-intl App Router i18n Guide (2026)](https://nextjslaunchpad.com/article/nextjs-internationalization-next-intl-app-router-i18n-guide) -- Comprehensive next-intl tutorial
- [Split Translations in next-intl](https://dev.to/hpouyanmehr/split-your-translations-in-next-intl-in-a-nice-way-4jof) -- Modular translation file patterns
- [Stop Fighting RTL Layouts: CSS Logical Properties](https://dev.to/web_dev-usman/stop-fighting-rtl-layouts-use-css-logical-properties-for-better-design-5g3m) -- Logical properties guide
- [RTL Styling 101](https://rtlstyling.com/posts/rtl-styling/) -- Comprehensive RTL CSS reference
- [Astro vs Next.js (2026)](https://pagepro.co/blog/astro-nextjs/) -- Framework comparison
- [Astro vs Next.js: 40% Faster Static Performance](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/) -- Performance benchmarks
- [Next.js Folder Structure Best Practices (2026)](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide) -- Scalable project organization
- [How I Made My Blog with NextJS i18n and MDX](https://seanv.dev/posts/how-i-made-my-blog) -- Practical multilingual MDX blog
- [Next.js RTL with i18n](https://medium.com/wtxhq/next-js-i18n-support-and-rtl-layouts-87144ad727c9) -- RTL layout switching pattern
- [Phrase: Next.js App Router Localization](https://phrase.com/blog/posts/next-js-app-router-localization-next-intl/) -- Step-by-step next-intl setup
- [Arabic Web Design: UX, RTL and Cultural Considerations](https://www.extradigital.co.uk/articles/design/elements-arabic-web-design/) -- Cultural design considerations

### Community / Discussion (LOW confidence)
- [MDX files and Internationalization Discussion](https://github.com/vercel/next.js/discussions/68374) -- Community approaches to i18n MDX
- [next-intl + Contentlayer Integration](https://github.com/amannn/next-intl/discussions/355) -- CMS integration patterns
- [Dynamic dir Attribute Discussion](https://github.com/vercel/next.js/discussions/19049) -- Community solutions for RTL switching
