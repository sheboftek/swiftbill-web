import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const languages = {
  en: "English",
  ar: "العربية",
} as const;

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
      value = translations.en;
      for (const fk of keys) {
        if (value && typeof value === "object" && fk in value) {
          value = (value as Record<string, unknown>)[fk];
        } else {
          return key; // Return key if not found
        }
      }
      return typeof value === "string" ? value : key;
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

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getAlternateLinks(currentLang: Lang, currentPath: string) {
  const pathWithoutLang = currentPath.replace(`/${currentLang}`, "") || "/";
  return Object.keys(languages).map((lang) => ({
    lang,
    href: `https://getswiftbill.app/${lang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`,
  }));
}
