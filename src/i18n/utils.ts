import en from "./en.json";
import ar from "./ar.json";
import enAe from "./en-ae.json";
import arAe from "./ar-ae.json";
import enSa from "./en-sa.json";
import arSa from "./ar-sa.json";
import type { Country } from "./countries";

export const languages = { en: "English", ar: "العربية" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

const translations = { en, ar } as const;

const countryTranslations: Record<string, Record<string, unknown>> = {
  "en-ae": enAe,
  "ar-ae": arAe,
  "en-sa": enSa,
  "ar-sa": arSa,
};

function lookupKey(obj: unknown, key: string): string | null {
  const keys = key.split(".");
  let value: unknown = obj;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return null;
    }
  }
  return typeof value === "string" ? value : null;
}

export function t(lang: Lang, key: string, country?: Country): string {
  // Try country-specific translation first
  if (country) {
    const countryKey = `${lang}-${country}`;
    const countryResult = lookupKey(countryTranslations[countryKey], key);
    if (countryResult) return countryResult;
  }

  // Fall back to base language
  const keys = key.split(".");
  let value: unknown = translations[lang];
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to English
      let fallback: unknown = translations.en;
      for (const fk of keys) {
        if (fallback && typeof fallback === "object" && fk in fallback) {
          fallback = (fallback as Record<string, unknown>)[fk];
        } else {
          return key;
        }
      }
      return typeof fallback === "string" ? fallback : key;
    }
  }
  return typeof value === "string" ? value : key;
}

export function getDir(lang: Lang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function getLocalizedPath(lang: Lang, path: string = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${cleanPath === "/" ? "" : cleanPath}`;
}

export function getCountryLocalizedPath(lang: Lang, country: Country, path?: string): string {
  const slug = country === "ae" ? "uae" : country === "sa" ? "saudi" : "";
  if (!slug) return getLocalizedPath(lang, path);
  return `/${lang}/${slug}${path || ""}`;
}
