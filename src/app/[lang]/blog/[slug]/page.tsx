import type { Metadata } from "next";
import Link from "next/link";
import { type Lang, getDir } from "@/i18n/utils";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const lang of ["en", "ar", "fr", "it"] as const) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;
  const post = getPostBySlug(lang, slug);

  if (!post) {
    return {
      title: lang === "ar" ? "المقال غير موجود" : "Post Not Found",
    };
  }

  return {
    title: `${post.title} — SwiftBill`,
    description: post.description,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
        it: `/it/blog/${slug}`,
        "x-default": `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : lang === "it" ? "it_IT" : "en_US",
      siteName: "SwiftBill",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const categoryLabels: Record<string, Record<Lang, string>> = {
  tips: { en: "Tips", ar: "\u0646\u0635\u0627\u0626\u062D", fr: "Conseils", it: "Consigli" },
  tax: { en: "Tax", ar: "\u0636\u0631\u0627\u0626\u0628", fr: "Fiscal", it: "Fiscale" },
  updates: { en: "Updates", ar: "\u062A\u062D\u062F\u064A\u062B\u0627\u062A", fr: "Nouveaut\u00e9s", it: "Novit\u00e0" },
};

const categoryColors: Record<string, string> = {
  tips: "bg-[#e8f5e9] text-[#2e7d32]",
  tax: "bg-[#fff3e0] text-[#e65100]",
  updates: "bg-[#e3f2fd] text-[#1565c0]",
};

function formatDate(dateStr: string, lang: Lang): string {
  try {
    const date = new Date(dateStr + "T00:00:00");
    const localeMap: Record<string, string> = { en: "en-US", ar: "ar-SA", fr: "fr-FR", it: "it-IT" };
    return date.toLocaleDateString(localeMap[lang] ?? "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ------------------------------------------------------------------ */
/*  Article JSON-LD                                                    */
/* ------------------------------------------------------------------ */

function ArticleStructuredData({ post }: { post: { title: string; description: string; date: string; author: string; slug: string; lang: Lang } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SwiftBill",
      url: "https://getswiftbill.app",
      logo: {
        "@type": "ImageObject",
        url: "https://getswiftbill.app/images/app-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://getswiftbill.app/${post.lang}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;
  const dir = getDir(lang);
  const post = getPostBySlug(lang, slug);

  /* ---- Post not found for this language ---- */
  if (!post) {
    const altLang: Lang = lang === "ar" ? "en" : "ar";
    const altPost = getPostBySlug(altLang, slug);

    return (
      <section dir={dir} className="mx-auto max-w-[800px] px-6 py-20">
        <Link
          href={`/${lang}/blog/`}
          className="text-sm font-medium text-blue hover:underline"
        >
          {lang === "ar" ? "\u2192 العودة للمدونة" : "\u2190 Back to Blog"}
        </Link>

        <div className="mt-12 text-center">
          <div className="font-heading" style={{ fontSize: 32, fontWeight: 500, color: "#151515" }}>
            {lang === "ar" ? "المقال غير متوفر بالعربية" : "Post Not Available in English"}
          </div>
          <p className="mt-4 text-body-copy">
            {lang === "ar"
              ? "هذا المقال غير متاح باللغة العربية حالياً."
              : "This post is not available in English yet."}
          </p>
          {altPost && (
            <Link
              href={`/${altLang}/blog/${slug}/`}
              className="mt-6 inline-block rounded-full bg-off-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-80"
            >
              {lang === "ar" ? "اقرأ بالإنجليزية" : "Read in Arabic"}
            </Link>
          )}
        </div>
      </section>
    );
  }

  /* ---- Render post ---- */
  const backLabelMap: Record<string, string> = {
    en: "\u2190 Back to Blog",
    ar: "\u2192 \u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0645\u062F\u0648\u0646\u0629",
    fr: "\u2190 Retour au blog",
    it: "\u2190 Torna al blog",
  };
  const ctaTitleMap: Record<string, string> = {
    en: "Try SwiftBill Free",
    ar: "\u062C\u0631\u0651\u0628 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0645\u062C\u0627\u0646\u0627\u064B",
    fr: "Essayez SwiftBill gratuitement",
    it: "Prova SwiftBill gratis",
  };
  const ctaDescriptionMap: Record<string, string> = {
    en: "Create professional invoices in seconds. 15 PDF templates, ZATCA & FTA compliance, expense tracking, and more.",
    ar: "\u0623\u0646\u0634\u0626 \u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0641\u064A \u062B\u0648\u0627\u0646\u064D. 15 \u0642\u0627\u0644\u0628 PDF\u060C \u062A\u0648\u0627\u0641\u0642 ZATCA \u0648 FTA\u060C \u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0635\u0631\u0648\u0641\u0627\u062A\u060C \u0648\u0627\u0644\u0645\u0632\u064A\u062F.",
    fr: "Cr\u00e9ez des factures professionnelles en quelques secondes. 15 mod\u00e8les PDF, suivi des d\u00e9penses, rapports de rentabilit\u00e9 et plus encore.",
    it: "Crea fatture professionali in pochi secondi. 15 modelli PDF, tracciamento spese, report di redditivit\u00e0 e molto altro.",
  };
  const ctaButtonMap: Record<string, string> = {
    en: "Download on the App Store",
    ar: "\u062D\u0645\u0651\u0644 \u0645\u0646 App Store",
    fr: "T\u00e9l\u00e9charger sur l\u2019App Store",
    it: "Scarica dall\u2019App Store",
  };
  const backLabel = backLabelMap[lang] ?? backLabelMap.en;
  const ctaTitle = ctaTitleMap[lang] ?? ctaTitleMap.en;
  const ctaDescription = ctaDescriptionMap[lang] ?? ctaDescriptionMap.en;
  const ctaButton = ctaButtonMap[lang] ?? ctaButtonMap.en;

  return (
    <section dir={dir}>
      <ArticleStructuredData post={post} />

      <article className="mx-auto max-w-[800px] px-6 py-12 md:py-20">
        {/* Back link */}
        <Link
          href={`/${lang}/blog/`}
          className="text-sm font-medium text-blue hover:underline"
        >
          {backLabel}
        </Link>

        {/* Header */}
        <header className="mt-8">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {categoryLabels[post.category]?.[lang] ?? post.category}
          </span>

          <div className="mt-4 font-heading" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, letterSpacing: "-0.5px", lineHeight: "120%", color: "#151515" }}>{post.title}</div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-steel">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <span aria-hidden="true">|</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose mt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom CTA */}
        <div className="mt-16 rounded-[16px] bg-white p-8 text-center md:p-12">
          <div className="font-heading" style={{ fontSize: 28, fontWeight: 600, color: "#151515" }}>{ctaTitle}</div>
          <p className="mx-auto mt-3 max-w-[500px] text-body-copy">
            {ctaDescription}
          </p>
          <a
            href="https://apps.apple.com/app/id6760855924"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-off-black px-8 py-4 text-base font-medium text-white transition hover:opacity-80"
          >
            {ctaButton}
          </a>
        </div>
      </article>
    </section>
  );
}
