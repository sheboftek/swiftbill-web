import type { Metadata } from "next";
import { type Lang, getDir } from "@/i18n/utils";
import { getAllPosts } from "@/lib/blog";
import { BlogGrid } from "./BlogGrid";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "fr" }, { lang: "it" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;

  const titleMap: Record<string, string> = {
    en: "Blog \u2014 SwiftBill | Invoicing Tips, Tax Guides & Updates",
    ar: "\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u2014 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 | \u0646\u0635\u0627\u0626\u062D \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0648\u0627\u0644\u0636\u0631\u0627\u0626\u0628",
    fr: "Blog \u2014 SwiftBill | Conseils facturation, guides fiscaux et nouveaut\u00e9s",
    it: "Blog \u2014 SwiftBill | Consigli fatturazione, guide fiscali e novit\u00e0",
  };
  const descMap: Record<string, string> = {
    en: "Invoicing tips, ZATCA & UAE tax guides, and the latest SwiftBill updates for freelancers and small businesses.",
    ar: "\u0646\u0635\u0627\u0626\u062D \u0627\u0644\u0641\u0648\u062A\u0631\u0629\u060C \u0623\u062F\u0644\u0629 ZATCA \u0648\u0627\u0644\u0636\u0631\u0627\u0626\u0628 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A\u064A\u0629\u060C \u0648\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B\u0627\u062A \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0644\u0644\u0645\u0633\u062A\u0642\u0644\u064A\u0646 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0629.",
    fr: "Conseils de facturation, guides de conformit\u00e9 fiscale et derni\u00e8res actualit\u00e9s SwiftBill pour freelances et petites entreprises.",
    it: "Consigli di fatturazione, guide fiscali e le ultime novit\u00e0 SwiftBill per freelance e piccole imprese.",
  };
  const title = titleMap[lang] ?? titleMap.en;
  const description = descMap[lang] ?? descMap.en;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: {
        en: "/en/blog",
        ar: "/ar/blog",
        fr: "/fr/blog",
        it: "/it/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : lang === "it" ? "it_IT" : "en_US",
      siteName: "SwiftBill",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;
  const dir = getDir(lang);
  const posts = getAllPosts(lang);

  const heroTitleMap: Record<string, string> = {
    en: "Blog",
    ar: "\u0627\u0644\u0645\u062F\u0648\u0646\u0629",
    fr: "Blog",
    it: "Blog",
  };
  const heroSubtitleMap: Record<string, string> = {
    en: "Practical invoicing tips, tax compliance guides, and the latest SwiftBill news.",
    ar: "\u0646\u0635\u0627\u0626\u062D \u0639\u0645\u0644\u064A\u0629 \u0644\u0644\u0641\u0648\u062A\u0631\u0629\u060C \u0623\u062F\u0644\u0629 \u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u060C \u0648\u0622\u062E\u0631 \u0623\u062E\u0628\u0627\u0631 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644.",
    fr: "Conseils pratiques de facturation, guides de conformit\u00e9 fiscale et derni\u00e8res actualit\u00e9s SwiftBill.",
    it: "Consigli pratici di fatturazione, guide di conformit\u00e0 fiscale e le ultime novit\u00e0 SwiftBill.",
  };
  const heroTitle = heroTitleMap[lang] ?? heroTitleMap.en;
  const heroSubtitle = heroSubtitleMap[lang] ?? heroSubtitleMap.en;

  return (
    <section dir={dir}>
      {/* Hero */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 text-center md:py-28">
          <div className="font-heading" style={{ fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 500, letterSpacing: "-0.5px", lineHeight: "100%", color: "#151515" }}>{heroTitle}</div>
          <p className="mx-auto mt-4 max-w-[600px] text-lg text-body-copy">
            {heroSubtitle}
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <BlogGrid posts={posts} lang={lang} />
      </div>
    </section>
  );
}
