import type { Metadata } from "next";
import "@/app/globals.css";
import { type Lang, getDir, t } from "@/i18n/utils";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

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

  const title = t(lang, "meta.title");
  const description = t(lang, "meta.description");
  const ogTitle = t(lang, "meta.ogTitle");
  const ogDescription = t(lang, "meta.ogDescription");

  return {
    title,
    description,
    icons: {
      icon: "/images/app-icon.png",
      apple: "/images/app-icon.png",
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      siteName: "SwiftBill",
      images: [
        {
          url: "/images/app-icon.png",
          width: 512,
          height: 512,
          alt: "SwiftBill",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/images/app-icon.png"],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;
  const dir = getDir(lang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className="bg-[#efeef3] text-[#151515] antialiased">
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
