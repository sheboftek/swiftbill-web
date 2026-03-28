import en from "./en.json";
import ar from "./ar.json";

export const languages = { en: "English", ar: "العربية" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

const translations = { en, ar } as const;

export function t(lang: Lang, key: string): string {
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
