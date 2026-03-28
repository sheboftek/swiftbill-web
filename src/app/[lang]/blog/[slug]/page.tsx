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

  for (const lang of ["en", "ar"] as const) {
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
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;
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
        "x-default": `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: lang === "ar" ? "ar_SA" : "en_US",
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
  tips: { en: "Tips", ar: "نصائح" },
  tax: { en: "Tax", ar: "ضرائب" },
  updates: { en: "Updates", ar: "تحديثات" },
};

const categoryColors: Record<string, string> = {
  tips: "bg-[#e8f5e9] text-[#2e7d32]",
  tax: "bg-[#fff3e0] text-[#e65100]",
  updates: "bg-[#e3f2fd] text-[#1565c0]",
};

function formatDate(dateStr: string, lang: Lang): string {
  try {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
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
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;
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
          <h4 className="font-heading text-off-black">
            {lang === "ar" ? "المقال غير متوفر بالعربية" : "Post Not Available in English"}
          </h4>
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
  const backLabel = lang === "ar" ? "\u2192 العودة للمدونة" : "\u2190 Back to Blog";
  const ctaTitle =
    lang === "ar"
      ? "جرّب سويفت بيل مجاناً"
      : "Try SwiftBill Free";
  const ctaDescription =
    lang === "ar"
      ? "أنشئ فواتير احترافية في ثوانٍ. 15 قالب PDF، توافق ZATCA و FTA، تتبع المصروفات، والمزيد."
      : "Create professional invoices in seconds. 15 PDF templates, ZATCA & FTA compliance, expense tracking, and more.";
  const ctaButton =
    lang === "ar" ? "حمّل من App Store" : "Download on the App Store";

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

          <h3 className="mt-4 font-heading text-off-black">{post.title}</h3>

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
          <h5 className="font-heading text-off-black">{ctaTitle}</h5>
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
