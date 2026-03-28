export type Country = "ae" | "sa" | "fr" | "it" | null;
export type CountrySlug = "uae" | "saudi" | "france" | "italy";

export const countries = {
  ae: { name: "UAE", nameAr: "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A", slug: "uae" as CountrySlug, flag: "\uD83C\uDDE6\uD83C\uDDEA" },
  sa: { name: "Saudi Arabia", nameAr: "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629", slug: "saudi" as CountrySlug, flag: "\uD83C\uDDF8\uD83C\uDDE6" },
  fr: { name: "France", nameAr: "\u0641\u0631\u0646\u0633\u0627", slug: "france" as CountrySlug, flag: "\uD83C\uDDEB\uD83C\uDDF7" },
  it: { name: "Italy", nameAr: "\u0625\u064A\u0637\u0627\u0644\u064A\u0627", slug: "italy" as CountrySlug, flag: "\uD83C\uDDEE\uD83C\uDDF9" },
} as const;

export function countryFromSlug(slug: string): Country {
  if (slug === "uae") return "ae";
  if (slug === "saudi") return "sa";
  if (slug === "france") return "fr";
  if (slug === "italy") return "it";
  return null;
}

export function slugFromCountry(country: Country): CountrySlug | null {
  if (country === "ae") return "uae";
  if (country === "sa") return "saudi";
  if (country === "fr") return "france";
  if (country === "it") return "italy";
  return null;
}
