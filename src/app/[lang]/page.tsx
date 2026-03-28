import { Hero } from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Compliance from "@/components/sections/Compliance";
import Templates from "@/components/sections/Templates";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { type Lang } from "@/i18n/utils";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "fr" }, { lang: "it" }];
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;

  return (
    <>
      <Hero lang={lang} />
      <Features lang={lang} />
      <Compliance lang={lang} />
      <Templates lang={lang} />
      <Pricing lang={lang} />
      <FAQ lang={lang} />
      <CTA lang={lang} />
    </>
  );
}
