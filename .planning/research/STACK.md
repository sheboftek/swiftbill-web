# SwiftBill Marketing Website - Technology Stack Research

> **Research Date:** March 26, 2026
> **Domain:** getswiftbill.app
> **Purpose:** iOS invoicing app marketing site — drive App Store downloads
> **Requirements:** 8 languages (EN, AR/RTL, DE, ES, FR, JA, PT-BR, SV), MDX blog, scroll animations, iPhone mockups, pricing page, all-light theme (#3053EC blue accent), free-tier hosting, 90+ Lighthouse

---

## Recommendation: Astro 5

**Astro is the clear winner for this project.** The reasoning:

1. **Performance by default** — Ships zero JS unless you opt in. Lighthouse 95-100 out of the box vs Next.js 85-95. Marketing sites don't need React's runtime on every page.
2. **Built-in i18n routing** — First-class `i18n` config in `astro.config.mjs` with locale prefixing, default locale handling, and `dir="rtl"` support.
3. **Content Collections + MDX** — Type-safe content layer with Zod schemas, glob-based loaders, and native MDX integration. No third-party content SDK needed.
4. **Islands architecture** — Use React components only where you need interactivity (scroll animations, pricing toggles). The rest is static HTML.
5. **Free hosting on any platform** — No vendor lock-in. Cloudflare Pages, Vercel, and Netlify all support Astro equally well.
6. **Build speed** — 3x faster builds than Next.js for content sites. Incremental builds measured in microseconds with Tailwind v4's Vite plugin.

---

## Core Technologies

| Technology | Version | Purpose | Why Recommended | Confidence |
|---|---|---|---|---|
| **Astro** | 5.17.x | SSG framework | Zero-JS default, built-in i18n routing, Content Collections, 95-100 Lighthouse scores. Purpose-built for content/marketing sites. | HIGH |
| **React** | 19.x | Interactive islands only | Used exclusively inside `client:visible` / `client:load` islands for animations and interactive components. Not loaded on static pages. | HIGH |
| **Tailwind CSS** | 4.2.x | Styling | CSS-first config, logical properties for RTL (`ms-*`, `me-*`, `ps-*`, `pe-*`), `@tailwindcss/vite` plugin. 5x faster builds than v3. Zero config file needed. | HIGH |
| **MDX** | via `@astrojs/mdx` 5.0.x | Blog content | Native Astro integration. Use `.mdx` files in Content Collections with Zod schema validation. Supports custom components. | HIGH |
| **TypeScript** | 5.x | Type safety | Astro has first-class TS support. Content Collections are fully typed via Zod schemas. | HIGH |

---

## Supporting Libraries

| Library | Version | Purpose | Why Recommended | Confidence |
|---|---|---|---|---|
| **Motion** (formerly Framer Motion) | 12.38.x | Scroll-triggered animations | Hardware-accelerated scroll animations via `useScroll()`. React-native API, smaller bundle (32KB gz) than GSAP. Works in Astro React islands with `client:visible`. | HIGH |
| **@astrojs/react** | latest | React integration | Enables React islands in Astro pages. Only hydrates where `client:*` directives are used. | HIGH |
| **@astrojs/sitemap** | 3.7.x | XML sitemap | Auto-generates multilingual sitemap with `hreflang` tags for all 8 locales. Critical for SEO. | HIGH |
| **@astrojs/mdx** | 5.0.x | MDX support | Processes `.mdx` files within Content Collections. Supports custom components, syntax highlighting. | HIGH |
| **@tailwindcss/vite** | 4.x | Tailwind v4 integration | Replaces deprecated `@astrojs/tailwind`. Direct Vite plugin, zero config. | HIGH |
| **@tailwindcss/typography** | 0.5.x | Prose styling | `prose` classes for blog post content. Handles headings, lists, blockquotes, code blocks. | HIGH |
| **sharp** | 0.33.x | Image optimization | Astro's default image processor. Auto-generates WebP/AVIF, sets width/height to prevent CLS, responsive `srcset`. | HIGH |
| **astro-icon** | 1.x | Icon system | Inline SVG icons. Supports Iconify icon sets (Heroicons, Lucide, etc.). Zero runtime JS. | MEDIUM |
| **@fontsource/inter** | 5.x | Font loading | Self-hosted Inter font. Eliminates render-blocking Google Fonts requests. Use `@fontsource-variable/inter` for variable font. | HIGH |
| **rehype-pretty-code** | 0.14.x | Code syntax highlighting | Shiki-based syntax highlighting for blog code blocks. Zero client JS. | MEDIUM |

---

## Development Tools

| Tool | Version | Purpose | Notes |
|---|---|---|---|
| **Node.js** | 22.x LTS | Runtime | Astro 5 requires Node 18.17.1+. Use 22 LTS for latest features. |
| **pnpm** | 9.x | Package manager | Faster installs, strict dependency resolution, disk-efficient. |
| **Prettier** | 3.x | Code formatting | Use `prettier-plugin-astro` and `prettier-plugin-tailwindcss`. |
| **ESLint** | 9.x | Linting | Flat config. Use `eslint-plugin-astro`. |
| **prettier-plugin-astro** | 0.14.x | Astro file formatting | Formats `.astro` files in Prettier. |
| **prettier-plugin-tailwindcss** | 0.6.x | Tailwind class sorting | Auto-sorts Tailwind classes. Must be loaded last in Prettier plugin array. |

---

## Installation Commands

```bash
# Create Astro project
pnpm create astro@latest swiftbill-web -- --template minimal --typescript strict

# Navigate to project
cd swiftbill-web

# Core integrations (Astro CLI auto-configures astro.config.mjs)
pnpm astro add react mdx sitemap

# Tailwind CSS v4 (Vite plugin, NOT @astrojs/tailwind)
pnpm add tailwindcss @tailwindcss/vite @tailwindcss/typography

# Animation library (for React islands)
pnpm add motion

# Image optimization (Astro uses sharp by default, install explicitly)
pnpm add sharp

# Fonts (self-hosted, no Google Fonts)
pnpm add @fontsource-variable/inter

# Icons
pnpm add astro-icon

# Blog syntax highlighting
pnpm add rehype-pretty-code shiki

# Dev tools
pnpm add -D prettier prettier-plugin-astro prettier-plugin-tailwindcss eslint eslint-plugin-astro @types/react @types/react-dom
```

---

## Project Structure

```
swiftbill-web/
├── astro.config.mjs          # i18n routing, integrations, Tailwind vite plugin
├── src/
│   ├── components/           # Reusable Astro + React components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── PricingTable.astro
│   │   ├── IPhoneMockup.astro
│   │   ├── ScrollReveal.tsx   # React island — Motion scroll animations
│   │   └── LanguageSwitcher.astro
│   ├── content/
│   │   ├── content.config.ts  # Zod schemas for blog collection
│   │   └── blog/
│   │       ├── en/            # English blog posts (.mdx)
│   │       ├── ar/            # Arabic blog posts (.mdx)
│   │       ├── de/
│   │       ├── es/
│   │       ├── fr/
│   │       ├── ja/
│   │       ├── pt-br/
│   │       └── sv/
│   ├── i18n/
│   │   ├── ui.ts             # UI string translations (nav, buttons, footer)
│   │   ├── utils.ts          # getLocalizedPath(), getCurrentLocale()
│   │   └── locales/
│   │       ├── en.json
│   │       ├── ar.json
│   │       ├── de.json
│   │       ├── es.json
│   │       ├── fr.json
│   │       ├── ja.json
│   │       ├── pt-br.json
│   │       └── sv.json
│   ├── layouts/
│   │   ├── BaseLayout.astro   # <html lang dir> + head + body wrapper
│   │   ├── PageLayout.astro   # Header + Footer + slot
│   │   └── BlogLayout.astro   # Blog post layout with prose styling
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── index.astro    # Homepage
│   │   │   ├── features.astro
│   │   │   ├── pricing.astro
│   │   │   ├── blog/
│   │   │   │   ├── index.astro
│   │   │   │   └── [...slug].astro
│   │   │   ├── privacy.astro
│   │   │   └── terms.astro
│   │   └── index.astro        # Redirect to /en/
│   ├── styles/
│   │   └── global.css         # @import "tailwindcss"; custom theme vars
│   └── assets/
│       ├── images/            # iPhone mockups, screenshots
│       └── og/                # Open Graph images per locale
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── robots.txt
└── package.json
```

---

## Key Configuration

### astro.config.mjs

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://getswiftbill.app",
  output: "static",
  i18n: {
    locales: ["en", "ar", "de", "es", "fr", "ja", "pt-br", "sv"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true, // /en/pricing not /pricing
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          ar: "ar",
          de: "de",
          es: "es",
          fr: "fr",
          ja: "ja",
          "pt-br": "pt-BR",
          sv: "sv",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
```

### RTL Support in BaseLayout.astro

```astro
---
const { lang } = Astro.params;
const dir = lang === "ar" ? "rtl" : "ltr";
---
<html lang={lang} dir={dir}>
  <head>...</head>
  <body class="bg-white text-gray-900">
    <slot />
  </body>
</html>
```

### Tailwind CSS global.css

```css
@import "tailwindcss";

@theme {
  --color-brand: #3053EC;
  --color-brand-dark: #2442C7;
  --color-brand-light: #5B7BF5;
  --font-sans: "Inter Variable", system-ui, sans-serif;
}
```

### React Island Example (ScrollReveal.tsx)

```tsx
// src/components/ScrollReveal.tsx
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

Usage in `.astro`:
```astro
---
import { ScrollReveal } from "../components/ScrollReveal";
---
<ScrollReveal client:visible>
  <h2>Invoicing made simple</h2>
</ScrollReveal>
```

---

## Alternatives Considered

### Framework Alternatives

| Framework | Version | Verdict | Why Not |
|---|---|---|---|
| **Next.js 15/16** | 15.x / 16.x | REJECTED for this project | Ships React runtime (85KB+) on every page. Lighthouse 85-95 vs Astro's 95-100. Overkill for a marketing site with no auth, no database, no dynamic features. Vendor lock-in risk with Vercel for optimal performance. `next-intl` adds complexity vs Astro's built-in i18n. |
| **Remix (React Router v7)** | 7.x | REJECTED | Server-first framework designed for dynamic apps with forms/mutations. SSG support exists but is bolted on. No built-in i18n routing. Wrong tool for a static marketing site. |
| **Gatsby** | 5.x | REJECTED | Declining ecosystem, slower builds, GraphQL complexity for simple content. Community has largely moved to Astro/Next.js. |
| **Hugo** | 0.145.x | CONSIDERED but rejected | Blazing fast builds but Go templating is harder to maintain. No React islands for animations. RTL/i18n requires manual work. |
| **Eleventy (11ty)** | 3.x | CONSIDERED but rejected | Excellent SSG but lacks built-in i18n routing, image optimization, and component model. Would need more manual wiring. |

### Animation Alternatives

| Library | Verdict | Why Not |
|---|---|---|
| **GSAP + ScrollTrigger** | REJECTED | Larger bundle (23KB core + 12KB ScrollTrigger). Licensing concerns for commercial use (requires paid license). Overkill for marketing site scroll reveals. Better for narrative scroll experiences. |
| **CSS-only (`@scroll-timeline`)** | PARTIAL USE | Use CSS `animation-timeline: view()` for simple fade-ins where supported. Fall back to Motion for spring physics and staggered animations. Browser support still limited. |
| **AOS (Animate On Scroll)** | REJECTED | Unmaintained (last update 2021). Uses data attributes, not composable. Motion is the modern replacement. |

### i18n Alternatives

| Library | Verdict | Why Not |
|---|---|---|
| **next-intl** | N/A | Next.js-specific. Excellent library (TypeScript-first, ICU messages, 6-form Arabic plurals) but irrelevant since we chose Astro. |
| **Paraglide.js** | CONSIDERED | Compiler-based i18n with tree-shaking. Worth evaluating but Astro's built-in i18n + JSON files is simpler and sufficient for 8 locales. |
| **i18next** | REJECTED | Runtime overhead. Designed for React SPAs. Unnecessary when Astro pre-renders all locale pages at build time. |

### MDX Alternatives (if Next.js were chosen)

| Library | Verdict | Notes |
|---|---|---|
| **Contentlayer** | REJECTED | Abandoned — last update March 2024, PRs closed without merge. |
| **Velite** | WOULD RECOMMEND (for Next.js) | Active development, Zod schemas, static file handling. Best Contentlayer replacement. |
| **@next/mdx** | ACCEPTABLE | Official but limited — files must live in app/ directory, less flexible. |

### Styling Alternatives

| Library | Verdict | Why Not |
|---|---|---|
| **Vanilla CSS** | REJECTED | No utility classes, slower development. RTL requires manual logical properties everywhere. |
| **UnoCSS** | CONSIDERED | Faster than Tailwind v3, but Tailwind v4's Vite plugin closed the gap. Tailwind has larger ecosystem, more resources. |
| **CSS Modules** | REJECTED | Scoped styles are nice but utility-first is faster for marketing sites with many unique sections. |

---

## What NOT to Use

| Technology | Reason |
|---|---|
| **@astrojs/tailwind** | DEPRECATED for Tailwind v4. Use `@tailwindcss/vite` plugin instead. |
| **Contentlayer** | Abandoned. Use Astro Content Collections (or Velite if using Next.js). |
| **Google Fonts `<link>`** | Render-blocking. Use `@fontsource-variable/inter` for self-hosted fonts. |
| **framer-motion** (old package name) | Renamed to `motion`. Import from `motion/react`, not `framer-motion`. |
| **next-translate / next-i18next** | Pages Router only. Incompatible with Next.js App Router. (Moot since we chose Astro.) |
| **react-i18next** | Runtime translation loading. Unnecessary overhead when all pages are pre-rendered. |
| **Lottie** | Heavy runtime (250KB+). Use CSS animations or Motion for marketing site animations. |
| **jQuery / jQuery plugins** | Obvious, but worth stating: zero reason to include in a 2026 stack. |
| **Turbopack** | Next.js specific. Astro uses Vite. |

---

## Version Compatibility Matrix

| Package | Minimum | Recommended | Compatibility Notes |
|---|---|---|---|
| Node.js | 18.17.1 | 22.x LTS | Astro 5 requires 18.17.1+. Use LTS for stability. |
| Astro | 5.0.0 | 5.17.x | Content Collections API stable since 5.0. |
| React | 18.3.0 | 19.x | Astro supports React 18 and 19. Motion 12 requires React 18+. |
| Tailwind CSS | 4.0.0 | 4.2.x | Requires `@tailwindcss/vite` plugin. Do NOT use `@astrojs/tailwind`. |
| Motion | 12.0.0 | 12.38.x | Import from `motion/react`. Hardware-accelerated scroll since v12. |
| TypeScript | 5.0.0 | 5.7.x | Astro bundles its own TS config. |
| sharp | 0.32.0 | 0.33.x | Astro's default image service. Auto-installed with Astro. |
| pnpm | 8.0.0 | 9.x | Recommended over npm for monorepo-like dependency management. |

---

## Hosting Recommendation

### Primary: Cloudflare Pages (FREE)

| Feature | Cloudflare Pages | Vercel (Hobby) | Netlify (Starter) |
|---|---|---|---|
| **Bandwidth** | Unlimited | 100 GB | 100 GB |
| **Builds/month** | 500 | 6000 | 300 minutes |
| **Edge locations** | 330+ | ~20 | ~10 |
| **Commercial use** | Yes | NO (Hobby = personal only) | Yes |
| **Custom domain** | Free | Free | Free |
| **SSL** | Free | Free | Free |
| **Cost** | $0 | $0 (personal) / $20/mo (Pro) | $0 |

**Cloudflare Pages is the best choice** because:
1. Unlimited bandwidth on free tier (critical for marketing site traffic spikes)
2. 330+ global edge locations (fastest CDN)
3. Commercial use allowed on free tier (Vercel Hobby forbids commercial use)
4. No vendor lock-in — Astro static output works anywhere
5. Built-in Web Analytics (privacy-friendly, free)

**Deployment:**
```bash
# Build
pnpm build

# Output directory: dist/
# Connect GitHub repo to Cloudflare Pages dashboard
# Build command: pnpm build
# Output directory: dist
```

---

## Performance Budget

| Metric | Target | How Achieved |
|---|---|---|
| Lighthouse Performance | 95+ | Zero JS default, optimized images, self-hosted fonts |
| Lighthouse Accessibility | 95+ | Semantic HTML, ARIA labels, RTL dir attribute, color contrast |
| Lighthouse Best Practices | 95+ | HTTPS, no console errors, secure headers via Cloudflare |
| Lighthouse SEO | 95+ | Sitemap, meta tags, hreflang, structured data, robots.txt |
| First Contentful Paint | < 1.0s | Static HTML, preloaded font, above-fold CSS inlined by Astro |
| Largest Contentful Paint | < 1.5s | Optimized hero image (WebP/AVIF), responsive srcset |
| Cumulative Layout Shift | < 0.05 | Explicit image dimensions, font-display: swap with matched fallback |
| Total Blocking Time | < 100ms | No JS on static pages. React islands only hydrate on interaction/visibility. |
| Total JS (homepage) | < 5KB | Astro ships 0KB JS for static pages. Islands add Motion only where used. |

---

## Sources

### Official Documentation (HIGH confidence)
- [Astro Documentation — i18n Routing](https://docs.astro.build/en/guides/internationalization/)
- [Astro Documentation — Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Documentation — MDX Integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS — Install with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Motion (Framer Motion) Documentation](https://motion.dev/)
- [Next.js Internationalization Guide](https://nextjs.org/docs/app/guides/internationalization)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)

### Framework Comparisons (HIGH confidence)
- [Makers' Den — Next.js vs Astro for Marketing Websites 2025](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website)
- [Astro vs Next.js: 40% Faster Static Site Performance](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/)
- [Astro 5 vs Next.js 15 Complete Technical Comparison](https://wppoland.com/en/astro-5-vs-nextjs-15-comparison-2026/)
- [Pagepro — Astro vs Next.js 2026](https://pagepro.co/blog/astro-nextjs/)
- [Strapi — Next.js vs Astro vs Remix](https://strapi.io/blog/nextjs-vs-astro-vs-remix-choosing-the-right-frontend-framework)

### Library Comparisons (MEDIUM confidence)
- [Motion — GSAP vs Motion Comparison](https://motion.dev/docs/gsap-vs-motion)
- [Velite — Contentlayer to Velite Migration](https://www.mikevpeeren.nl/blog/refactoring-contentlayer-to-velite)
- [next-intl Official Site](https://next-intl.dev/)

### Hosting Comparisons (HIGH confidence)
- [Vercel vs Netlify vs Cloudflare Pages 2025](https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison)
- [Cloudflare vs Vercel vs Netlify Edge Performance 2026](https://dev.to/dataformathub/cloudflare-vs-vercel-vs-netlify-the-truth-about-edge-performance-2026-50h0)

### Version Numbers (HIGH confidence — npm registry, March 26, 2026)
- Astro: 5.17.x ([npm](https://www.npmjs.com/package/astro))
- Tailwind CSS: 4.2.2 ([npm](https://www.npmjs.com/package/tailwindcss))
- Motion: 12.38.0 ([npm](https://www.npmjs.com/package/motion))
- @astrojs/mdx: 5.0.2 ([npm](https://www.npmjs.com/package/@astrojs/mdx))
- @astrojs/sitemap: 3.7.1 ([npm](https://www.npmjs.com/package/@astrojs/sitemap))
