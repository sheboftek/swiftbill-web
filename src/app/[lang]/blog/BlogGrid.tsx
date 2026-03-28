"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import type { Lang } from "@/i18n/utils";

const CATEGORIES = ["all", "tips", "tax", "updates"] as const;
type Category = (typeof CATEGORIES)[number];

const categoryLabels: Record<Category, Record<Lang, string>> = {
  all: { en: "All", ar: "الكل" },
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

  const noPostsText =
    lang === "ar"
      ? "لا توجد مقالات في هذه الفئة حالياً."
      : "No posts in this category yet.";

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
              <h3 className="mt-4 font-heading text-[20px] font-semibold leading-[130%] tracking-[-0.2px] text-off-black group-hover:text-blue">
                {post.title}
              </h3>

              {/* Description */}
              <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-[160%] text-body-copy">
                {post.description}
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between text-sm text-steel">
                <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
                <span className="font-medium text-blue transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {lang === "ar" ? "اقرأ المزيد \u2190" : "Read more \u2192"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
