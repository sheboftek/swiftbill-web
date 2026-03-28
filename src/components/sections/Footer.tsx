"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { type Lang, t, getLocalizedPath, languages } from "@/i18n/utils";

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

const onramperEase = [0.86, 0, 0.07, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Footer link styles — exact Onramper values                         */
/* ------------------------------------------------------------------ */

const linkStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: 20,
  fontWeight: 500,
  letterSpacing: "0.24px",
  lineHeight: "120%",
  color: "#151515",
  textDecoration: "none",
  transition: "color 0.35s cubic-bezier(0.86, 0, 0.07, 1)",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "110%",
  color: "#808099",
  marginBottom: 34,
};

/* ------------------------------------------------------------------ */
/*  Link column                                                        */
/* ------------------------------------------------------------------ */

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#3053EC";
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "#151515";
  };

  return (
    <div>
      <div style={titleStyle}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {links.map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              style={linkStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {link.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer({ lang }: { lang: Lang }) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const year = new Date().getFullYear();
  const pathname = usePathname();

  // Detect country from current URL to preserve when switching languages
  const segments = pathname.split("/").filter(Boolean);
  const countrySlugs = ["uae", "saudi", "france", "italy"];
  const currentCountry = segments.length >= 2 && countrySlugs.includes(segments[1]) ? segments[1] : null;

  const langNames: Record<Lang, string> = {
    en: "English",
    ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    fr: "Fran\u00e7ais",
    it: "Italiano",
  };

  const allLangs = Object.keys(languages) as Lang[];

  function getLangHref(targetLang: Lang): string {
    // Gulf countries only make sense for en/ar
    if (currentCountry && (currentCountry === "uae" || currentCountry === "saudi") && (targetLang === "fr" || targetLang === "it")) {
      return getLocalizedPath(targetLang);
    }
    if (currentCountry === "france" && targetLang !== "fr") return getLocalizedPath(targetLang);
    if (currentCountry === "italy" && targetLang !== "it") return getLocalizedPath(targetLang);
    return currentCountry ? `/${targetLang}/${currentCountry}/` : getLocalizedPath(targetLang);
  }

  const columns = [
    {
      title: t(lang, "footer.product"),
      links: [
        { label: t(lang, "nav.features"), href: getLocalizedPath(lang, "/#features") },
        { label: t(lang, "templates.label"), href: getLocalizedPath(lang, "/#templates") },
        { label: t(lang, "nav.pricing"), href: getLocalizedPath(lang, "/#pricing") },
        { label: t(lang, "nav.download"), href: APP_STORE_URL, external: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: t(lang, "nav.blog"), href: getLocalizedPath(lang, "/blog") },
      ],
    },
    {
      title: t(lang, "footer.legal"),
      links: [
        { label: t(lang, "footer.privacy"), href: getLocalizedPath(lang, "/privacy") },
        { label: t(lang, "footer.terms"), href: getLocalizedPath(lang, "/terms") },
      ],
    },
    {
      title: t(lang, "footer.support"),
      links: [
        { label: t(lang, "footer.email"), href: `mailto:${t(lang, "footer.email")}`, external: true },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: getLocalizedPath(lang, "/#") },
      ],
    },
  ];

  return (
    <footer dir={dir} style={{ backgroundColor: "#ffffff", position: "relative" }}>
      {/* ---- Menus section — exact Onramper: padding 60px, 5-col grid, gap 41px ---- */}
      <div
        style={{
          maxWidth: 1340,
          marginInline: "auto",
          paddingBlock: 60,
          paddingInline: 60,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            columnGap: 41,
            rowGap: 0,
          }}
        >
          {columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>
      </div>

      {/* ---- Bottom section — exact Onramper: pt 80px, pb 20px ---- */}
      <div
        style={{
          maxWidth: 1340,
          marginInline: "auto",
          paddingBlockStart: 80,
          paddingBlockEnd: 20,
          paddingInline: 60,
        }}
      >
        {/* Bottom wrap — flex between, items end, mb 40px */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: onramperEase }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          {/* Large brand text — exact Onramper footer logo size */}
          <Link
            href={getLocalizedPath(lang)}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 70,
              fontWeight: 500,
              letterSpacing: "-1.4px",
              lineHeight: "100%",
              color: "#151515",
              textDecoration: "none",
            }}
          >
            SwiftBill
          </Link>

          {/* "Get in touch" with arrow circle */}
          <a
            href={`mailto:${t(lang, "footer.email")}`}
            className="group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 28,
                lineHeight: "90%",
                color: "#151515",
              }}
            >
              Get in touch
            </span>
            <span
              className="transition-transform duration-300 group-hover:scale-110"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#3053EC",
                color: "white",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Copyright + language toggle */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: "110%",
              color: "#808099",
              marginTop: 20,
            }}
          >
            &copy; {year} {t(lang, "footer.copyright")}
          </span>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {allLangs
              .filter((l) => l !== lang)
              .map((l) => (
                <Link
                  key={l}
                  href={getLangHref(l)}
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#808099",
                    textDecoration: "none",
                    transition: "color 0.35s cubic-bezier(0.86, 0, 0.07, 1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#3053EC")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#808099")}
                >
                  {langNames[l]}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 991px) {
          footer > div:first-child {
            padding: 40px 20px !important;
          }
          footer > div:first-child > div {
            grid-template-columns: 1fr 1fr !important;
            column-gap: 60px !important;
            row-gap: 40px !important;
          }
          footer > div:nth-child(2) {
            padding-inline: 20px !important;
          }
        }
        @media (max-width: 479px) {
          footer > div:first-child > div {
            grid-template-columns: 1fr !important;
            row-gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
