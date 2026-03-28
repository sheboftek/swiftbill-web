import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Lang } from "@/i18n/utils";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  date: string;
  category: "tips" | "tax" | "updates";
  author: string;
  content: string; // HTML rendered from markdown
}

export function getAllPosts(lang: Lang): BlogPost[] {
  const dir = path.join(CONTENT_DIR, lang);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts: BlogPost[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      lang,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ? String(data.date).split("T")[0] : "",
      category: data.category ?? "tips",
      author: data.author ?? "SwiftBill Team",
      content: marked.parse(content, { async: false }) as string,
    };
  });

  // Sort by date descending (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(lang: Lang, slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, lang, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    lang,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ? String(data.date).split("T")[0] : "",
    category: data.category ?? "tips",
    author: data.author ?? "SwiftBill Team",
    content: marked.parse(content, { async: false }) as string,
  };
}

export function getAllSlugs(): string[] {
  const slugSet = new Set<string>();

  for (const lang of ["en", "ar", "fr", "it"] as const) {
    const dir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      slugSet.add(file.replace(/\.mdx$/, ""));
    }
  }

  return Array.from(slugSet);
}
