"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { type Lang, t, getLocalizedPath, languages } from "@/i18n/utils";

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

/* Onramper easing */
const EASE_ONRAMPER: [number, number, number, number] = [0.86, 0, 0.07, 1];

/** Extract country slug from pathname (e.g., /en/saudi -> "saudi", /en -> null) */
function getCountryFromPath(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] = lang, segments[1] = country or page
  if (segments.length >= 2) {
    const second = segments[1];
    if (second === "uae" || second === "saudi" || second === "france" || second === "italy") return second;
  }
  return null;
}

/** Map language to its preferred country slug (for preserving country context) */
function getCountryForLang(lang: Lang, currentCountry: string | null): string | null {
  // If switching to fr and currently not on a country page, suggest france
  // If switching to it, suggest italy
  // Otherwise preserve current country if it makes sense for the target lang
  if (!currentCountry) return null;

  // Gulf countries only make sense for en/ar
  if ((currentCountry === "uae" || currentCountry === "saudi") && (lang === "fr" || lang === "it")) {
    return null;
  }
  // France only makes sense for fr
  if (currentCountry === "france" && lang !== "fr") {
    return null;
  }
  // Italy only makes sense for it
  if (currentCountry === "italy" && lang !== "it") {
    return null;
  }

  return currentCountry;
}

const langLabels: Record<Lang, string> = {
  en: "EN",
  ar: "AR",
  fr: "FR",
  it: "IT",
};

const langNames: Record<Lang, string> = {
  en: "English",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  fr: "Fran\u00e7ais",
  it: "Italiano",
};

export function Header({ lang }: { lang: Lang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Detect country from current URL to preserve it when switching languages
  const currentCountry = getCountryFromPath(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close language dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    if (langDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langDropdownOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: t(lang, "nav.features"), href: getLocalizedPath(lang, "/#features") },
    { label: t(lang, "nav.pricing"), href: getLocalizedPath(lang, "/#pricing") },
    { label: t(lang, "nav.blog"), href: getLocalizedPath(lang, "/blog") },
  ];

  function getLangHref(targetLang: Lang): string {
    const country = getCountryForLang(targetLang, currentCountry);
    return country
      ? `/${targetLang}/${country}/`
      : getLocalizedPath(targetLang);
  }

  const allLangs = Object.keys(languages) as Lang[];

  return (
    <header
      ref={headerRef}
      dir={dir}
      className="fixed inset-inline-0 top-0 z-40 w-full"
      style={{ paddingTop: 0, paddingBottom: 24 }}
    >
      {/* Inner wrap */}
      <div
        className="mx-auto flex max-w-[1440px] items-center justify-between"
        style={{ paddingTop: 24, paddingInlineStart: 24, paddingInlineEnd: 24 }}
      >
        {/* --- Logo Pill --- */}
        <Link
          href={getLocalizedPath(lang)}
          className="flex items-center justify-center gap-2.5"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 123,
            padding: "14px 20px",
          }}
        >
          <motion.img
            src="/images/app-icon.png"
            alt="SwiftBill"
            className="h-7 w-7 rounded-lg"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          />
          <span
            className="font-heading font-bold"
            style={{
              color: "#151515",
              fontSize: 18,
              letterSpacing: "-0.18px",
              lineHeight: "90%",
            }}
          >
            SwiftBill
          </span>
        </Link>

        {/* --- Desktop Nav Pill --- */}
        <nav
          className="hidden items-center md:flex"
          style={{
            backgroundColor: scrolled ? "#ffffff" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(11px)",
            WebkitBackdropFilter: "blur(11px)",
            borderRadius: 123,
            padding: "11px 12px",
            gap: 24,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="header__nav-link"
              style={{
                color: "#151515",
                borderRadius: 123,
                padding: "10px 13px",
                fontSize: 18,
                fontWeight: 500,
                lineHeight: "90%",
                opacity: 0.6,
                transition: "all 0.35s cubic-bezier(0.86, 0, 0.07, 1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.6";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* --- Desktop Right Actions --- */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language dropdown */}
          <div ref={langDropdownRef} className="relative">
            <button
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              className="button secondary flex items-center gap-1.5"
              style={{
                padding: "10px 20px",
                fontSize: 16,
                cursor: "pointer",
              }}
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              {langLabels[lang]}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: langDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
                aria-hidden="true"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: EASE_ONRAMPER }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    insetInlineEnd: 0,
                    minWidth: 160,
                    backgroundColor: "#ffffff",
                    borderRadius: 14,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                    zIndex: 50,
                  }}
                >
                  {allLangs.map((l) => (
                    <Link
                      key={l}
                      href={getLangHref(l)}
                      onClick={() => setLangDropdownOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 18px",
                        fontSize: 15,
                        fontWeight: 500,
                        color: l === lang ? "#3053EC" : "#151515",
                        backgroundColor: l === lang ? "rgba(48,83,236,0.06)" : "transparent",
                        textDecoration: "none",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (l !== lang) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (l !== lang) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      }}
                    >
                      <span>{langNames[l]}</span>
                      {l === lang && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M3 7L6 10L11 4" stroke="#3053EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download -- primary button (Onramper "Get Started" equivalent) */}
          <motion.a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button primary"
            style={{
              padding: "18px 30px",
              fontSize: 20,
              fontWeight: 500,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Apple logo SVG */}
            <svg
              width="16"
              height="20"
              viewBox="0 0 814 1000"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.3-105.9-209-105.9-329.1 0-193.9 126-296.7 250-296.7 65.9 0 120.9 43.4 162.3 43.4 39.4 0 100.9-46 175.4-46 28.3 0 130.1 2.6 197.3 99.8zm-234.7-184.5c31.5-37.5 54-89.6 54-141.7 0-7.2-.6-14.5-1.9-20.4-51.5 1.8-112.2 34.3-148.9 76.3-26.4 29.4-54 81.5-54 134.4 0 7.9.7 15.8 1.3 18.3 2.2.3 5.8.7 9.5.7 46.2 0 104.4-30.9 140-67.6z" />
            </svg>
            {t(lang, "nav.download")}
          </motion.a>
        </div>

        {/* --- Mobile Hamburger --- */}
        <motion.button
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 123,
          }}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="block h-0.5 w-5 rounded-full bg-[#151515]"
            animate={
              mobileOpen
                ? { rotate: 45, y: 4 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.25, ease: EASE_ONRAMPER }}
          />
          <motion.span
            className="block h-0.5 w-5 rounded-full bg-[#151515]"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block h-0.5 w-5 rounded-full bg-[#151515]"
            animate={
              mobileOpen
                ? { rotate: -45, y: -4 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.25, ease: EASE_ONRAMPER }}
          />
        </motion.button>
      </div>

      {/* --- Mobile Menu Full-Screen Overlay --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ backgroundColor: "#ffffff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_ONRAMPER }}
          >
            {/* Spacer for header height */}
            <div style={{ height: 80 }} />

            {/* Nav links */}
            <nav
              className="flex flex-1 flex-col justify-center"
              style={{ paddingInlineStart: 32, paddingInlineEnd: 32 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.4,
                    ease: EASE_ONRAMPER,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-heading"
                    style={{
                      color: "#151515",
                      fontSize: 42,
                      fontWeight: 500,
                      letterSpacing: "-0.42px",
                      lineHeight: "110%",
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottom: "1px solid rgba(21,21,21,0.08)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Language options in mobile */}
              {allLangs
                .filter((l) => l !== lang)
                .map((l, idx) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: 0.1 + (navLinks.length + idx) * 0.08,
                      duration: 0.4,
                      ease: EASE_ONRAMPER,
                    }}
                  >
                    <Link
                      href={getLangHref(l)}
                      onClick={() => setMobileOpen(false)}
                      className="block font-heading"
                      style={{
                        color: "#151515",
                        fontSize: 42,
                        fontWeight: 500,
                        letterSpacing: "-0.42px",
                        lineHeight: "110%",
                        paddingTop: 16,
                        paddingBottom: 16,
                        opacity: 0.5,
                        textDecoration: "none",
                      }}
                    >
                      {langNames[l]}
                    </Link>
                  </motion.div>
                ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                delay: 0.1 + (navLinks.length + allLangs.length) * 0.08,
                duration: 0.4,
                ease: EASE_ONRAMPER,
              }}
              style={{
                paddingInlineStart: 32,
                paddingInlineEnd: 32,
                paddingBottom: 40,
              }}
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "18px 30px",
                  fontSize: 20,
                }}
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 814 1000"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.3-105.9-209-105.9-329.1 0-193.9 126-296.7 250-296.7 65.9 0 120.9 43.4 162.3 43.4 39.4 0 100.9-46 175.4-46 28.3 0 130.1 2.6 197.3 99.8zm-234.7-184.5c31.5-37.5 54-89.6 54-141.7 0-7.2-.6-14.5-1.9-20.4-51.5 1.8-112.2 34.3-148.9 76.3-26.4 29.4-54 81.5-54 134.4 0 7.9.7 15.8 1.3 18.3 2.2.3 5.8.7 9.5.7 46.2 0 104.4-30.9 140-67.6z" />
                </svg>
                {t(lang, "nav.download")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
