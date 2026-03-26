# Preventable Pitfalls: Multilingual App Marketing Website

> Research compiled March 2026 for SwiftBill (getswiftbill.app)
> Context: 8-language SSG marketing site with Arabic RTL, scroll animations, iPhone mockups, MDX blog, targeting Gulf region (Saudi/UAE), driving iOS App Store downloads for an invoicing app.

---

## Critical Pitfalls

### 1. RTL Arabic Layout Breaks Beyond Simple Mirroring

**What goes wrong:** Teams apply `dir="rtl"` and assume CSS mirroring handles everything. In reality, bidirectional (bidi) text with mixed Arabic and English (common in invoicing contexts -- "Invoice #2847" in Arabic copy) renders in unpredictable order. CSS Grid does not auto-reverse column order. Directional icons (arrows, chevrons) don't flip. `text-overflow: ellipsis` truncates the wrong end of bidi strings. Number formatting shows Western digits (0-9) instead of expected Eastern Arabic numerals in Gulf markets. CSS `padding-left`/`margin-right` hardcoded values break every layout.

**Why it happens:** RTL is treated as a CSS toggle rather than a layout system. Developers test with placeholder text instead of real Arabic content. The Unicode Bidirectional Algorithm handles inline text reordering but cannot fix structural layout issues. Gulf-specific expectations (Eastern Arabic numerals, Hijri date references in cultural context) are unknown to Western developers.

**How to avoid:**
- Use CSS Logical Properties exclusively (`padding-inline-start`, `margin-block-end`, `inset-inline`) -- never directional properties
- Set `dir="rtl"` on `<html>` and use `[dir="rtl"]` selectors for icon flipping
- Use `Intl.NumberFormat('ar-SA')` for number display; offer `ar-u-nu-latn` variant if audience prefers Western digits
- Test with real Arabic content from native speakers, not machine translation
- Audit every directional icon: arrows, chevrons, progress indicators must flip; logos, playback controls, checkmarks must NOT flip
- Wrap embedded LTR text (brand names, code, URLs) in `<bdo dir="ltr">` or `<span dir="ltr">`

**Warning signs:** Layout looks "fine" in Chrome DevTools RTL emulation but real Arabic speakers report it feels wrong. Numbers appear inconsistent. Arrows point the wrong way. Testimonials with mixed-language content scramble.

**Phase to address:** Phase 1 (Foundation) -- CSS Logical Properties must be the standard from line one. RTL cannot be retrofitted without rewriting every layout.

**Confidence:** HIGH -- documented extensively across Arabic localization guides, W3C bidi specifications, and real-world GCC UX audits.

---

### 2. Scroll Animations Destroy LCP and Mobile Performance

**What goes wrong:** Scroll-triggered animations (parallax, reveal-on-scroll, staggered entrances) cause the Largest Contentful Paint (LCP) element to be delayed because the hero image/text is hidden or transformed until JavaScript executes. On mobile (82.9% of landing page traffic), animation jank drops frames below 60fps, and bounce probability increases 123% when load time goes from 1s to 10s. Sites score 40-60 on Lighthouse Performance instead of the target 90+.

**Why it happens:** Animation libraries (Framer Motion, GSAP) add JavaScript weight that blocks or delays rendering. Developers animate properties that trigger layout recalculation (width, height, top, left) instead of compositor-only properties (transform, opacity). IntersectionObserver callbacks fire during scroll, competing with the main thread. Hero content starts `opacity: 0` or `translateY(100px)`, so LCP measures the delay until the animation reveals it. iPhone mockup images are loaded at full resolution without size optimization.

**How to avoid:**
- Never animate the LCP element -- hero text/image must be visible on first paint, no reveal animation
- Only animate `transform` and `opacity` -- these run on the GPU compositor thread
- Set hard guardrails: max 50KB animation library bundle, 55+ FPS on mid-range phones, CLS impact < 0.05
- Use `will-change: transform` only immediately before animation, remove after
- Stagger animations with 40-60ms delays to avoid frame budget spikes
- Lazy-load animation libraries: load GSAP/Motion only after first paint via dynamic import
- Respect `prefers-reduced-motion`: disable all non-essential animation (WCAG 2.3.3 AAA)
- Prefer CSS animations for simple reveals; reserve JS animation for complex sequences

**Warning signs:** Lighthouse Performance score below 80. LCP > 2.5s on mobile. CLS > 0.1. Visible jank on iPhone SE or Android mid-range devices. Hero section "pops in" instead of being immediately visible.

**Phase to address:** Phase 2 (Hero/Landing) -- animation architecture decisions cement here and propagate to every subsequent section.

**Confidence:** HIGH -- Core Web Vitals impact on SEO ranking is well-documented; animation performance benchmarks are extensively tested.

---

### 3. Hreflang and Canonical Tag Conflicts Kill International SEO

**What goes wrong:** Each language version canonicalizes to the English "master" page instead of self-referencing. Hreflang tags are missing reciprocal links (French page links to German, but German doesn't link back to French). Language codes use wrong format (`en-uk` instead of `en-GB`; standalone country code `sa` instead of `ar-SA`). Google ignores all hreflang annotations and shows the wrong language version in search results, or flags pages as "Duplicate, Google chose different canonical than user."

**Why it happens:** Developers don't understand that hreflang requires EVERY page to reference ALL language versions including itself. Canonical tags are set globally without per-locale logic. Hreflang is treated as "set and forget" -- when new languages are added, existing pages aren't updated. Testing tools don't always catch silent failures (wrong language codes are simply ignored by Google with no error).

**How to avoid:**
- Every page self-canonicalizes: `/ar/pricing` canonicalizes to `/ar/pricing`, not to `/en/pricing`
- Every page includes hreflang tags for ALL language versions plus `x-default`
- Use subdirectory structure (`/en/`, `/ar/`, `/de/`) -- Google recommends this over subdomains for link equity
- Use ISO 639-1 language codes, optionally with ISO 3166-1 Alpha 2 country: `ar`, `en`, `de`, `fr`, `es`, `pt-BR`, `tr`, `ja`
- Automate hreflang generation in the SSG build (Astro's i18n routing + sitemap integration)
- Validate with Google Search Console International Targeting report and hreflang tag testing tools
- Include hreflang in XML sitemap as backup (belt and suspenders)

**Warning signs:** Google Search Console shows "no return tag" errors. Wrong language appears in SERPs for target regions. Indexed page count per language is inconsistent. Arabic pages not appearing in Saudi/UAE search results.

**Phase to address:** Phase 1 (Foundation) -- URL structure and routing must be decided before any content is created.

**Confidence:** HIGH -- Google's own documentation and multiple SEO audits confirm these patterns. Martin Splitt (Google) confirmed in July 2025 that hreflang tags are treated as hints, making correct implementation even more critical.

---

### 4. Font Loading Causes Invisible Text (FOIT) or Layout Shift (FOUT)

**What goes wrong:** Custom fonts for 8 languages (Latin, Arabic, possibly CJK glyphs for Japanese) create large download payloads. Arabic fonts are typically 200-500KB+ due to glyph complexity. Browser hides all text until fonts download (FOIT), causing 1-3s of invisible content that directly hurts LCP. Or, fallback fonts render first then swap to custom fonts (FOUT), causing visible layout shift (CLS penalty) because Arabic and Latin fonts have different metrics. Users in Gulf region on slower mobile connections see blank pages for seconds.

**Why it happens:** Developers load all font weights/styles for all languages on every page. Arabic fonts aren't subsetted. No `font-display` strategy is set (browser defaults to FOIT). Fallback font metrics don't match custom font metrics, so text reflows on swap. Variable font alternatives aren't considered.

**How to avoid:**
- Use `font-display: swap` on all `@font-face` declarations to prevent FOIT
- Subset fonts per language using `unicode-range` -- browser only downloads needed glyphs
- Use WOFF2 format exclusively (best compression, universal support)
- If using 3+ weights of one family, switch to variable fonts (40-60% size reduction)
- Preload critical fonts with `<link rel="preload" as="font" type="font/woff2" crossorigin>`
- Set font-size-adjust or use `@font-face` `size-adjust` descriptor to match fallback metrics
- Load Arabic font only on Arabic pages, not globally
- Consider system font stack for body text; custom font only for headings

**Warning signs:** LCP > 2.5s. Visible text "pop" on page load. CLS > 0.1. Network waterfall shows font files blocking render. Arabic pages load noticeably slower than English pages.

**Phase to address:** Phase 1 (Foundation) -- font strategy must be decided before any typography is implemented.

**Confidence:** HIGH -- MDN, web.dev, and extensive performance audits document these patterns consistently.

---

### 5. Missing Translation Fallbacks Show Raw Keys or Empty Strings to Users

**What goes wrong:** A translation key like `pricing.annual.description` is missing in Turkish or Arabic JSON. Users see the raw key string "pricing.annual.description" in the UI, or worse, an empty string that collapses layout elements. CTA buttons become empty rectangles. SEO meta descriptions contain translation keys. The site looks broken and untrustworthy -- a conversion killer for an invoicing app where trust is paramount.

**Why it happens:** Translation files are maintained manually and fall out of sync. New features add keys to English but translators haven't provided all 7 other languages yet. Some i18n libraries treat empty strings as valid translations and don't fall back. Build process doesn't validate translation completeness. Dynamic content (blog posts, feature descriptions) may not have translations for all languages.

**How to avoid:**
- Configure i18n library with explicit fallback chain: `current locale -> English -> key itself (dev only)`
- In production, NEVER display raw keys -- always fall back to English content
- Add build-time validation: CI script that compares all locale JSON files against English and fails on missing keys
- Use TypeScript types for translation keys to catch mismatches at compile time
- For MDX blog content, show an "Available in English" notice rather than a broken page or auto-translated garbage
- Log missing translations in production analytics to track gaps

**Warning signs:** Any page in non-English locale shows English-looking variable names. Empty buttons or headings. Console warnings about missing keys in development. SEO audit shows meta tags with raw key strings.

**Phase to address:** Phase 2 (Content) -- but fallback infrastructure must be in Phase 1 foundation.

**Confidence:** HIGH -- i18next documentation, Vue-i18n issues, and React i18n guides all document this as the #1 i18n implementation mistake.

---

### 6. Auto-Redirect by Locale Blocks Googlebot and Annoys Users

**What goes wrong:** The site detects browser language or IP geolocation and auto-redirects to a locale URL (`/` -> `/ar/` for Saudi IP). Googlebot typically crawls from US IPs with `en-US` headers, so it never sees Arabic content -- Arabic pages are never indexed. Users sharing links across locales get redirected away from the shared content. Expats in Saudi Arabia who prefer English are forced into Arabic with no obvious escape.

**Why it happens:** Developers assume auto-redirect is good UX ("show them their language!"). IP geolocation is unreliable (VPNs, travelers, expats). The redirect prevents Googlebot from discovering non-English pages. No `x-default` fallback page is provided.

**How to avoid:**
- NEVER auto-redirect. Google explicitly recommends against this.
- Show a non-intrusive language suggestion banner: "This page is available in Arabic" with a link
- Let users choose their language; persist the choice in a cookie/localStorage
- Ensure every locale URL is directly accessible without redirects
- Set `x-default` hreflang to the English version or a language selector page
- In Astro SSG, all locale pages are pre-rendered and statically served -- no redirect logic needed

**Warning signs:** Google Search Console shows only English pages indexed. Arabic organic traffic is near zero despite targeting Saudi/UAE. Users complain about being redirected to the wrong language. Googlebot logs show redirect loops.

**Phase to address:** Phase 1 (Foundation) -- routing architecture decision.

**Confidence:** HIGH -- Google's official documentation explicitly warns against automatic redirects for multilingual sites.

---

### 7. iPhone Mockup Images Bloat Page Weight and Kill Mobile LCP

**What goes wrong:** iPhone mockup screenshots are exported as full-resolution PNGs (2-5MB each). Multiple mockups per page (hero, features, testimonials) push total page weight to 15-30MB. On mobile connections in Gulf region, pages take 8-15s to fully load. LCP is the hero mockup image, which hasn't loaded yet. Lighthouse Performance plummets. 73% of mobile pages have an image as the LCP element -- and yours is a 3MB PNG.

**Why it happens:** Designers export mockups at Retina 3x resolution. No image optimization pipeline exists. Images are served as PNG instead of WebP/AVIF. No responsive `srcset` provides appropriately-sized images for different viewports. Lazy loading is applied to above-the-fold hero image (which delays LCP) while below-fold images load eagerly (wasting bandwidth).

**How to avoid:**
- Convert all images to WebP (broad support) with AVIF (20-30% smaller) as progressive enhancement using `<picture>` element
- Use responsive `srcset` with 3-4 breakpoints (640w, 1024w, 1536w, 2048w)
- Compress aggressively: quality 75-80 for WebP is visually indistinguishable from PNG
- Hero mockup: `fetchpriority="high"`, `loading="eager"`, preload via `<link rel="preload">`
- All below-fold mockups: `loading="lazy"`, `decoding="async"`
- Use Astro's built-in `<Image>` component for automatic optimization
- Target: hero image under 150KB, total page images under 500KB
- Consider CSS-rendered phone frames with screenshot-only images (much smaller than full mockup renders)

**Warning signs:** Total page weight > 2MB. LCP > 2.5s on 4G. Individual images > 500KB. Network waterfall shows images blocking other resources. Lighthouse flags "Properly size images" or "Serve images in next-gen formats."

**Phase to address:** Phase 2 (Hero/Features) -- image pipeline must be established before first mockup is placed.

**Confidence:** HIGH -- Core Web Vitals data shows images are the LCP element on 73% of mobile pages.

---

### 8. Structured Data and OG Tags Missing or Wrong Per Locale

**What goes wrong:** JSON-LD structured data (SoftwareApplication schema) uses English-only values for all locales. Open Graph tags show English title/description on Arabic pages. Social shares from Arabic pages show English preview text. Google doesn't show rich results (star ratings, pricing) for non-English queries. The site misses 15x AI search visibility uplift that structured data enables.

**Why it happens:** Structured data is implemented once for the English version and copy-pasted. OG tags are hardcoded in the base layout without locale awareness. Developers don't realize that Google uses structured data language to determine content relevance. Social media crawlers (Facebook, Twitter, WhatsApp) use OG tags that should match the page language.

**How to avoid:**
- Generate JSON-LD per locale: translate `name`, `description`, `applicationCategory` in SoftwareApplication schema
- Set `inLanguage` property in structured data to match page locale
- Dynamic OG tags per locale: `og:title`, `og:description`, `og:locale`, `og:locale:alternate`
- Use `og:locale` with proper format: `ar_SA`, `en_US`, `de_DE`
- Include localized `offers` with correct `priceCurrency` per region
- Validate with Google Rich Results Test for each locale
- WhatsApp is dominant in Gulf region -- preview cards MUST show Arabic text for Arabic pages

**Warning signs:** Social shares from Arabic pages show English text. Google Rich Results Test fails for non-English pages. No rich snippets appear in non-English search results. WhatsApp link previews show wrong language.

**Phase to address:** Phase 3 (SEO) -- but OG tag infrastructure should be in Phase 1 layout template.

**Confidence:** HIGH -- schema.org documentation and Google's structured data guidelines are explicit about language requirements.

---

## Technical Debt Patterns

| Pattern | Symptom | Root Cause | Cost to Fix Later | Prevention |
|---------|---------|------------|-------------------|------------|
| Hardcoded directional CSS | Every RTL page has broken spacing | Used `margin-left` instead of `margin-inline-start` | Rewrite all CSS (days) | Use logical properties from day 1 |
| Monolithic translation files | 500KB JSON loaded for every page | Single file per language with all keys | Restructure into namespaced chunks | Namespace translations by page/feature |
| Unoptimized image pipeline | 15MB page weight | No build-time optimization | Add pipeline + re-export all images | Use Astro Image from first asset |
| Hardcoded English strings | Untranslatable microcopy | String literals in components | Find-and-extract hundreds of strings | All strings through i18n from line 1 |
| Animation without perf budget | Sub-60fps on mobile | No performance guardrails | Rewrite animations or remove them | Set FPS/bundle/CLS budgets upfront |
| Single canonical strategy | Duplicate content penalties | Global canonical to English | Rewrite all canonical tags | Per-locale self-canonical from start |
| Client-side locale detection | SEO invisible non-English pages | JS-based routing/redirect | Migrate to static locale routes | SSG with pre-rendered locale paths |
| Missing `alt` text per locale | Accessibility + SEO failure | English-only alt attributes | Audit + translate all images | Include alt in translation files |

---

## Integration Gotchas

### Analytics
- **Google Analytics 4**: Set up separate data streams or use custom dimensions for locale tracking. UTM parameters must persist across locale switches -- a user clicking from an Arabic ad who switches to English mid-session loses attribution.
- **Event naming**: Use locale-agnostic event names (`cta_click`, not "Download Now clicked") so analytics aggregate across languages.
- **Cookie consent**: GDPR applies to EU languages (German, French). Gulf region has lighter requirements but UAE's PDPL (2025) requires consent notices. Cookie banner must be translated and locale-aware.

### App Store Links
- **Localized App Store URLs**: Use Apple's Marketing Tools (https://tools.applemediaservices.com) to generate locale-specific App Store links. `https://apps.apple.com/sa/app/swiftbill/id{ID}` for Saudi Arabia vs `/us/` for United States.
- **Smart App Banner**: `<meta name="apple-itunes-app" content="app-id={ID}">` shows native iOS banner. Works on Safari only. Must be present on all pages.
- **Badge localization**: Apple provides App Store badges in 40 languages. Use the Arabic badge on Arabic pages. Badge must meet Apple's minimum size and clear space requirements.
- **Attribution**: Append campaign tokens (`ct=website_ar`, `pt={provider_id}`) to App Store links for download attribution tracking in App Store Connect Analytics.
- **Deep links**: If the app supports universal links, ensure AASA (Apple App Site Association) file is at `/.well-known/apple-app-site-association` and served with correct content-type.

### Fonts
- **Arabic font licensing**: Many premium Arabic fonts have web licensing restrictions separate from desktop. Verify WOFF2 web embedding is permitted.
- **Font pairing**: Arabic and Latin fonts need deliberate pairing -- different x-heights, ascenders, and baseline positions cause misalignment in mixed-language headings.
- **Variable font availability**: Few Arabic variable fonts exist. You may need static weights for Arabic while using variable for Latin, creating an inconsistent loading strategy.

### Images
- **Culturally appropriate imagery**: iPhone mockups should show Arabic UI screenshots for Arabic pages, not English screenshots. Invoice examples should show Arabic text and SAR/AED currency.
- **Image text**: Any text baked into images (mockup screenshots, feature callouts) must be localized per language or the image becomes misleading.
- **WhatsApp OG images**: WhatsApp is the dominant sharing platform in Gulf region. OG images must be 1200x630px and the text in them should match the page language.

---

## Performance Traps

### Animation
| Trap | Impact | Mitigation |
|------|--------|------------|
| Animating hero/LCP element | LCP delayed until JS executes animation | Never animate the LCP element; it must be visible at first paint |
| Layout-triggering properties | Jank, dropped frames, CLS | Only animate `transform` and `opacity` |
| Loading full animation library upfront | +50-100KB to initial bundle | Dynamic import after first paint |
| No `prefers-reduced-motion` support | WCAG violation, vestibular disorder triggers | Wrap all animation in media query; provide toggle |
| Scroll listener on main thread | Frame drops during scroll | Use IntersectionObserver, not scroll event listeners |
| Animating during page load | Competes with critical resource loading | Delay non-hero animations until `load` event or idle callback |

### Images
| Trap | Impact | Mitigation |
|------|--------|------------|
| PNG mockups at 3x Retina | 2-5MB per image, LCP > 5s | WebP/AVIF at quality 75-80, responsive srcset |
| `loading="lazy"` on hero image | Delays LCP (browser waits for viewport intersection) | Hero: `loading="eager"` + `fetchpriority="high"` |
| No responsive sizing | 2048px image on 375px phone | srcset with 640w/1024w/1536w breakpoints |
| All images in one format | No modern format benefits | `<picture>` with AVIF > WebP > fallback |

### Fonts
| Trap | Impact | Mitigation |
|------|--------|------------|
| Loading all locale fonts globally | 1-2MB of unused fonts per page | Conditional loading: only current locale's font |
| No `font-display` strategy | FOIT: 1-3s invisible text | `font-display: swap` on all @font-face |
| Unsubsetted Arabic font | 400KB+ per weight | Subset to used glyphs or unicode-range per page |
| Multiple static weights | 5 x 80KB = 400KB | Variable font: single ~120KB file |

### JS Bundle / i18n
| Trap | Impact | Mitigation |
|------|--------|------------|
| All translations loaded upfront | 200KB+ JSON for 8 languages | Load only current locale; namespace by page |
| Full React hydration on static pages | 150KB+ runtime for zero interactivity | Astro Islands: hydrate only interactive components |
| Client-side i18n routing | Extra JS, flash of wrong locale | SSG pre-renders all locale pages statically |
| Uncode-split animation libraries | GSAP/Motion in main bundle | Dynamic import with `client:visible` directive |

---

## Security Mistakes

### XSS in Translation Strings
**Risk:** Translation files (JSON/XLIF) are often edited by external translators or agencies. If translation values contain HTML and are rendered with `dangerouslySetInnerHTML` or equivalent, a compromised translation file becomes an XSS vector. In March 2026, Angular's i18n system was hit by CVE-2026-27970 -- a high-severity XSS where malicious scripts in translation files executed with full app privileges.

**Mitigation:**
- Never render translation strings as raw HTML
- If HTML is needed in translations (bold, links), use a sanitization library (DOMPurify)
- Validate translation files in CI: scan for `<script>`, `javascript:`, `on*=` attributes
- Set strict Content-Security-Policy headers: `script-src 'self'`; no `unsafe-inline`
- Treat translation files as untrusted input

### Open Redirects in Language Switching
**Risk:** Language switcher constructs redirect URL from user input: `/switch?lang=ar&redirect=/ar/pricing`. An attacker crafts `/switch?lang=ar&redirect=https://evil.com` -- user is redirected to a phishing page that mimics SwiftBill.

**Mitigation:**
- Language switching should use static links (`/ar/pricing`), not server-side redirects
- If redirects are needed, whitelist allowed paths (must start with `/` and not `//`)
- With Astro SSG, language switching is just navigation to a different static URL -- no redirect logic needed

### Dependency Supply Chain
**Risk:** i18n libraries, animation libraries, and font loaders are npm packages. A compromised dependency injects code that runs on every page.

**Mitigation:**
- Lock dependency versions with `package-lock.json` / `pnpm-lock.yaml`
- Enable npm audit in CI
- Minimize dependencies: prefer Astro built-ins over third-party packages
- Subresource Integrity (SRI) for any CDN-loaded scripts

---

## UX Pitfalls

### Language Switcher
- **Hidden or unclear**: Language switcher buried in footer or behind a hamburger menu. Users can't find it. Must be visible in header on all pages.
- **Using flags for languages**: Flags represent countries, not languages. Arabic is spoken in 25+ countries. Use language names in their native script: "العربية" not "Arabic" or a Saudi flag.
- **Loses current page**: Switcher goes to homepage of new locale instead of the equivalent page. `/en/pricing` should switch to `/ar/pricing`, not `/ar/`.
- **Not persistent**: User selects Arabic, navigates to blog, gets English again. Persist choice in cookie/localStorage and apply site-wide.

### RTL-Specific UX
- **Progress indicators go wrong direction**: Step 1-2-3 flows should go right-to-left in Arabic.
- **Swipe gestures reversed**: Carousels, image galleries, and slide interactions must reverse direction.
- **Form field alignment**: Labels, placeholders, and validation messages must align to the right. Input text direction must be `dir="auto"` to handle mixed LTR/RTL input (email addresses in Arabic forms).
- **Scrollbars**: On some browsers, scrollbar position changes in RTL mode. Test this.

### Mobile Responsiveness
- **Desktop-first animation design**: Animations designed for 1920px monitors become janky or invisible on 375px phones. Design mobile-first.
- **CTA below fold on mobile**: Hero section is too tall with large mockup image, pushing "Download" CTA below the fold. On mobile, the primary CTA must be within the first viewport.
- **Touch target size**: Buttons must be minimum 44x44px (Apple HIG). Language switcher links are often too small.
- **Hamburger menu hides everything**: All CTAs and language switcher hidden behind hamburger on mobile kills conversion.

### CTA Placement
- **Single CTA location**: Only one "Download" button at the top. Users who scroll through features/pricing never see another CTA. Repeat the primary CTA after every major section.
- **Generic CTA text**: "Download" is weaker than "Download SwiftBill Free" or "Start Invoicing Now." CTA text should state the benefit, and must be translated (not left in English on Arabic pages).
- **App Store badge too small**: Apple mandates minimum badge size. Badge should be immediately recognizable.
- **No social proof near CTA**: App Store rating, download count, or testimonial quote adjacent to the CTA increases conversion.

---

## "Looks Done But Isn't" Checklist

- [ ] **Every page in every locale tested in a real browser** -- not just Chrome DevTools
- [ ] **Arabic pages reviewed by native Arabic speaker** -- not just rendered correctly in browser
- [ ] **Social sharing tested per locale** -- share each locale page on WhatsApp, Twitter, Facebook; verify preview card shows correct language
- [ ] **hreflang validated** -- use Google Search Console International Targeting report; zero "no return tag" errors
- [ ] **`prefers-reduced-motion` honored** -- test with system setting enabled; all non-essential animation stops
- [ ] **404 page exists per locale** -- `/ar/nonexistent` shows Arabic 404, not English
- [ ] **Sitemap includes all locale URLs** -- every page x every language in XML sitemap with hreflang
- [ ] **robots.txt doesn't block locale paths** -- `/ar/` is not accidentally disallowed
- [ ] **Canonical tags self-reference per locale** -- `/ar/pricing` canonicalizes to itself, not `/en/pricing`
- [ ] **App Store links are locale-specific** -- Arabic page links to Saudi/UAE App Store, not US
- [ ] **Apple badge uses correct localization** -- Arabic badge on Arabic pages (Apple provides 40 localizations)
- [ ] **Meta descriptions translated** -- not raw keys, not English on Arabic pages
- [ ] **OG images appropriate per locale** -- or at minimum, text-free OG image that works in all languages
- [ ] **Cookie/consent banner translated** -- legal requirement in some jurisdictions
- [ ] **Form validation messages translated** -- email signup, contact form errors in correct language
- [ ] **Number/date/currency formatting localized** -- Gulf region may expect Eastern Arabic numerals
- [ ] **Blog MDX content has clear fallback** -- untranslated posts show "Available in English" notice, not 404
- [ ] **Lighthouse audit per locale** -- Arabic pages often score differently due to font weight
- [ ] **Print stylesheet works in RTL** -- users may print invoicing app feature comparisons
- [ ] **Email links work** -- `mailto:` links on contact/support page functional
- [ ] **AASA file present** -- `/.well-known/apple-app-site-association` for universal links
- [ ] **Build time under 5 minutes** -- 8 locales x N pages can explode build time on free tier

---

## Recovery Strategies

### If RTL is broken after launch
1. Add CSS Logical Properties as overrides (don't rewrite existing CSS yet)
2. Use `[dir="rtl"]` selector to patch worst layout breaks
3. Prioritize: hero section > navigation > CTA sections > footer > blog
4. Get one native Arabic speaker to do a 30-minute walkthrough and flag top 10 issues

### If Lighthouse score is below 70
1. Remove/defer all non-critical JS (animation libraries first)
2. Convert all images to WebP, add srcset
3. Inline critical CSS, defer non-critical
4. Add `fetchpriority="high"` to LCP image
5. Move fonts to `font-display: swap` + preload critical font
6. Target: fix LCP first (highest SEO weight), then CLS, then INP

### If SEO indexing is wrong
1. Audit all canonical tags -- fix any cross-locale canonicals immediately
2. Validate hreflang with Aleyda Solis's hreflang tag generator tool
3. Submit corrected sitemap to Google Search Console
4. Request re-indexing of affected pages
5. Allow 2-4 weeks for Google to re-process

### If translations are incomplete at launch
1. Set fallback to English for all missing keys
2. Add visible "[EN]" badge on sections showing fallback content (dev/staging only)
3. Prioritize translating: hero > CTA > pricing > navigation > footer > blog
4. Use professional translators for Gulf-market Arabic (not Google Translate -- cultural nuance matters for invoicing terminology)

### If conversion rate is low
1. Add App Store badge + CTA after every section, not just hero
2. Add social proof (ratings, testimonials, download count) near each CTA
3. Test CTA text in each language with A/B testing
4. Ensure CTA is above fold on mobile (most critical fix)
5. Add Smart App Banner meta tag for Safari users

---

## Pitfall-to-Phase Mapping

| Phase | Critical Pitfalls to Address |
|-------|------------------------------|
| **Phase 1: Foundation** | CSS Logical Properties for RTL (#1), URL structure + routing (#3, #6), font strategy (#4), translation fallback infrastructure (#5), OG tag template (#8) |
| **Phase 2: Hero & Features** | Animation performance budget (#2), image optimization pipeline (#7), hero CTA placement (UX), iPhone mockup optimization (#7) |
| **Phase 3: Content & Blog** | MDX translation fallback (#5), blog hreflang (#3), structured data per locale (#8) |
| **Phase 4: SEO & Analytics** | hreflang validation (#3), sitemap generation, App Store link localization, analytics setup, structured data testing (#8) |
| **Phase 5: Polish & Launch** | Native speaker RTL review (#1), cross-locale social sharing test, Lighthouse per locale, reduced-motion audit (#2), "Looks Done But Isn't" checklist |

---

## Sources

### RTL & Arabic Localization
- [RTL Website Design Mistakes & Best Practices - Reffine](https://www.reffine.com/en/blog/rtl-website-design-and-development-mistakes-best-practices) -- HIGH confidence
- [Arabic Localization Challenges - Weglot](https://www.weglot.com/blog/arabic-localization) -- HIGH confidence
- [Localized UX for Arabic Users - PGS UAE](https://www.pgsuae.com/blogs/localized-ux-and-cultural-design-for-arabic-users/) -- HIGH confidence
- [UX Design Best Practices for GCC Websites - Digital Bee Studio](https://digitalbeestudio.ae/en/ux-design-best-practices-that-boost-conversions-on-gcc-websites/) -- MEDIUM confidence
- [Optimizing UX for Arabic Websites in GCC - Ali Almoosawi](https://almoosawi.com/optimizing-ux-for-arabic-websites-in-the-gcc-a-comprehensive-guide-for-kuwait-dubai-and-riyadh/) -- MEDIUM confidence
- [Localizing Dates, Numbers & Currency for Arabic - WATranslator](https://watranslator.com/localizing-dates-numbers-currencies-arabic-users/) -- HIGH confidence

### SEO & Hreflang
- [Hreflang Tags Complete Guide 2026 - ClickRank](https://www.clickrank.ai/hreflang-tags-complete-guide/) -- HIGH confidence
- [Multilingual SEO Issues - Seobility](https://www.seobility.net/en/blog/multilingual-seo-issues/) -- HIGH confidence
- [Google Managing Multi-Regional Sites (Official)](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) -- HIGH confidence
- [Hreflang Canonical Conflicts - SEOlogist](https://www.seologist.com/knowledge-sharing/canonical-hreflang/) -- HIGH confidence
- [Hreflang Duplicate Content - The Gray Company](https://thegray.company/blog/duplicate-content-international-seo-hreflang) -- HIGH confidence

### Animation & Performance
- [Web Animation Performance Tier List - Motion Magazine](https://motion.dev/magazine/web-animation-performance-tier-list) -- HIGH confidence
- [Motion Design Without Hurting Page Speed - Thrive](https://thriveagency.com/news/how-to-use-motion-design-without-hurting-page-speed/) -- MEDIUM confidence
- [GSAP vs Motion Comparison - Motion.dev](https://motion.dev/docs/gsap-vs-motion) -- HIGH confidence
- [Core Web Vitals Image Delivery - SearchX](https://searchxpro.com/core-web-vitals-image-delivery-best-practices/) -- MEDIUM confidence

### Font Loading
- [Font Loading Strategies Guide 2025 - Font Converters](https://font-converters.com/guides/font-loading-strategies) -- HIGH confidence
- [Web Font Optimization 2026 - Enepsters](https://www.enepsters.com/2026/03/web-font-optimization-in-2026-balancing-performance-accessibility-and-design/) -- MEDIUM confidence
- [Fix LCP by Optimizing Image Loading - MDN](https://developer.mozilla.org/en-US/blog/fix-image-lcp/) -- HIGH confidence

### Image Optimization
- [Image Optimization 2025 - FrontendTools](https://www.frontendtools.tech/blog/modern-image-optimization-techniques-2025) -- HIGH confidence
- [High Performance Images Guide 2026 - Request Metrics](https://requestmetrics.com/web-performance/high-performance-images/) -- HIGH confidence
- [Mobile LCP Optimization 2025 - GWAA](https://gwaa.net/mobile-lcp-optimization-best-practices) -- MEDIUM confidence

### Accessibility & Reduced Motion
- [WCAG 2.3.3 Animation from Interactions - W3C](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html) -- HIGH confidence
- [CSS prefers-reduced-motion - W3C Technique](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) -- HIGH confidence
- [Accessible Animation Guide - Pope Tech](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) -- HIGH confidence

### Conversion & Landing Pages
- [Landing Page Statistics 2026 - Hostinger](https://www.hostinger.com/tutorials/landing-page-statistics) -- MEDIUM confidence
- [Mobile CTA Buttons 2026 - WiserNotify](https://wisernotify.com/blog/mobile-call-to-action/) -- MEDIUM confidence
- [Landing Page Optimization - Unbounce](https://unbounce.com/101-landing-page-optimization-tips/) -- HIGH confidence

### Security
- [Angular i18n XSS CVE-2026-27970 - CyberPress](https://cyberpress.org/severe-xss-vulnerability/) -- HIGH confidence
- [Angular i18n XSS Advisory - GitHub](https://github.com/angular/angular/security/advisories/GHSA-prjf-86w9-mfqv) -- HIGH confidence

### i18n Implementation
- [20 i18n Mistakes in React Apps - TranslatedRight](https://www.translatedright.com/blog/20-i18n-mistakes-developers-make-in-react-apps-and-how-to-fix-them/) -- HIGH confidence
- [i18next Fallback Principles](https://www.i18next.com/principles/fallback) -- HIGH confidence
- [Astro i18n Routing - Official Docs](https://docs.astro.build/en/guides/internationalization/) -- HIGH confidence
- [Astro Islands Architecture - Official Docs](https://docs.astro.build/en/concepts/islands/) -- HIGH confidence

### Hosting & Deployment
- [Vercel Limits - Official](https://vercel.com/docs/limits) -- HIGH confidence
- [Cloudflare vs Vercel vs Netlify Edge Performance 2026](https://dev.to/dataformathub/cloudflare-vs-vercel-vs-netlify-the-truth-about-edge-performance-2026-50h0) -- MEDIUM confidence

### App Store Marketing
- [Apple Marketing Resources & Identity Guidelines (Official)](https://developer.apple.com/app-store/marketing/guidelines/) -- HIGH confidence
- [App Store Connect Campaign Links (Official)](https://developer.apple.com/help/app-store-connect/view-app-analytics/manage-campaigns/) -- HIGH confidence
- [Smart App Banner Setup - Branch](https://www.branch.io/resources/blog/how-to-setup-an-ios-and-android-smart-app-banner-with-deep-linking-and-download-tracking/) -- MEDIUM confidence

### Structured Data
- [SoftwareApplication Schema Guide - Unhead](https://unhead.unjs.io/docs/schema-org/api/schema/software-app) -- HIGH confidence
- [Schema JSON-LD for SEO 2026 - Incremys](https://www.incremys.com/en/resources/blog/schema-seo) -- MEDIUM confidence
