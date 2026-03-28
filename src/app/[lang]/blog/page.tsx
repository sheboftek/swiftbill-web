import type { Metadata } from "next";
import { type Lang, getDir } from "@/i18n/utils";
import { getAllPosts } from "@/lib/blog";
import { BlogGrid } from "./BlogGrid";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;

  const title =
    lang === "ar"
      ? "المدونة — سويفت بيل | نصائح الفوترة والضرائب"
      : "Blog — SwiftBill | Invoicing Tips, Tax Guides & Updates";
  const description =
    lang === "ar"
      ? "نصائح الفوترة، أدلة ZATCA والضرائب الإماراتية، وآخر تحديثات سويفت بيل للمستقلين والشركات الصغيرة."
      : "Invoicing tips, ZATCA & UAE tax guides, and the latest SwiftBill updates for freelancers and small businesses.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: {
        en: "/en/blog",
        ar: "/ar/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang === "ar" ? "ar_SA" : "en_US",
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
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;
  const dir = getDir(lang);
  const posts = getAllPosts(lang);

  const heroTitle = lang === "ar" ? "المدونة" : "Blog";
  const heroSubtitle =
    lang === "ar"
      ? "نصائح عملية للفوترة، أدلة الامتثال الضريبي، وآخر أخبار سويفت بيل."
      : "Practical invoicing tips, tax compliance guides, and the latest SwiftBill news.";

  return (
    <section dir={dir}>
      {/* Hero */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 text-center md:py-28">
          <h4 className="font-heading text-off-black">{heroTitle}</h4>
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
