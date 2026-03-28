import { Hero } from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Compliance from "@/components/sections/Compliance";
import Templates from "@/components/sections/Templates";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { type Lang, t } from "@/i18n/utils";
import { countryFromSlug } from "@/i18n/countries";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://getswiftbill.app";

export function generateStaticParams() {
  return [
    { lang: "en", country: "uae" },
    { lang: "en", country: "saudi" },
    { lang: "ar", country: "uae" },
    { lang: "ar", country: "saudi" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; country: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, country: rawCountry } = await params;
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;
  const country = countryFromSlug(rawCountry);

  return {
    title: t(lang, "meta.title", country),
    description: t(lang, "meta.description", country),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${lang}/${rawCountry}/`,
      languages: {
        en: `${BASE_URL}/en/`,
        ar: `${BASE_URL}/ar/`,
        "en-AE": `${BASE_URL}/en/uae/`,
        "ar-AE": `${BASE_URL}/ar/uae/`,
        "en-SA": `${BASE_URL}/en/saudi/`,
        "ar-SA": `${BASE_URL}/ar/saudi/`,
        "x-default": `${BASE_URL}/en/`,
      },
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ lang: string; country: string }>;
}) {
  const { lang: rawLang, country: rawCountry } = await params;
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;
  const country = countryFromSlug(rawCountry);

  if (!country) {
    redirect(`/${lang}/`);
  }

  return (
    <>
      <Hero lang={lang} country={country} />
      <Features lang={lang} />
      <Compliance lang={lang} country={country} />
      <Templates lang={lang} />
      <Pricing lang={lang} />
      <FAQ lang={lang} country={country} />
      <CTA lang={lang} />
    </>
  );
}
