"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import type { Lang } from "@/i18n/utils";

const CATEGORIES = ["all", "tips", "tax", "updates"] as const;
type Category = (typeof CATEGORIES)[number];

const categoryLabels: Record<Category, Record<Lang, string>> = {
  all: { en: "All", ar: "\u0627\u0644\u0643\u0644", fr: "Tous", it: "Tutti" },
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

export function BlogGrid({
  posts,
  lang,
}: {
  posts: BlogPost[];
  lang: Lang;
}) {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  const noPostsMap: Record<string, string> = {
    en: "No posts in this category yet.",
    ar: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u0626\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.",
    fr: "Aucun article dans cette cat\u00e9gorie pour le moment.",
    it: "Nessun articolo in questa categoria per il momento.",
  };
  const noPostsText = noPostsMap[lang] ?? noPostsMap.en;

  return (
    <>
      {/* Category Filter Pills */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              active === cat
                ? "bg-off-black text-white"
                : "bg-white text-body-copy hover:bg-off-black/5"
            }`}
          >
            {categoryLabels[cat][lang]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-body-copy">{noPostsText}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}/`}
              className="group flex flex-col rounded-[16px] bg-white p-8 transition-shadow hover:shadow-lg"
            >
              {/* Category Badge */}
              <span
                className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {categoryLabels[post.category as Category]?.[lang] ??
                  post.category}
              </span>

              {/* Title */}
              <div
                className="mt-4 font-heading group-hover:text-[#3053EC]"
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  lineHeight: "130%",
                  letterSpacing: "-0.2px",
                  color: "#151515",
                }}
              >
                {post.title}
              </div>

              {/* Description */}
              <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-[160%] text-body-copy">
                {post.description}
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between text-sm text-steel">
                <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
                <span className="font-medium text-blue transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {lang === "ar" ? "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F \u2190" : lang === "fr" ? "Lire la suite \u2192" : lang === "it" ? "Continua a leggere \u2192" : "Read more \u2192"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
