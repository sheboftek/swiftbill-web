export type Country = "ae" | "sa" | null;
export type CountrySlug = "uae" | "saudi";

export const countries = {
  ae: { name: "UAE", nameAr: "الإمارات", slug: "uae" as CountrySlug, flag: "🇦🇪" },
  sa: { name: "Saudi Arabia", nameAr: "السعودية", slug: "saudi" as CountrySlug, flag: "🇸🇦" },
} as const;

export function countryFromSlug(slug: string): Country {
  if (slug === "uae") return "ae";
  if (slug === "saudi") return "sa";
  return null;
}

export function slugFromCountry(country: Country): CountrySlug | null {
  if (country === "ae") return "uae";
  if (country === "sa") return "saudi";
  return null;
}
