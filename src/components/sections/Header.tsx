"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { type Lang, t, getLocalizedPath } from "@/i18n/utils";

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

/* Onramper easing */
const EASE_ONRAMPER: [number, number, number, number] = [0.86, 0, 0.07, 1];

/** Extract country slug from pathname (e.g., /en/saudi → "saudi", /en → null) */
function getCountryFromPath(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] = lang, segments[1] = country or page
  if (segments.length >= 2) {
    const second = segments[1];
    if (second === "uae" || second === "saudi") return second;
  }
  return null;
}

export function Header({ lang }: { lang: Lang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
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

  const altLang = lang === "en" ? "ar" : "en";
  const altLabel = lang === "en" ? "AR" : "EN";
  const altLangHref = currentCountry
    ? `/${altLang}/${currentCountry}/`
    : getLocalizedPath(altLang);

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
        {/* ─── Logo Pill ─── */}
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

        {/* ─── Desktop Nav Pill ─── */}
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

        {/* ─── Desktop Right Actions ─── */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language toggle — secondary button style */}
          <Link
            href={altLangHref}
            className="button secondary"
            style={{
              padding: "10px 20px",
              fontSize: 16,
            }}
          >
            {altLabel}
          </Link>

          {/* Download — primary button (Onramper "Get Started" equivalent) */}
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

        {/* ─── Mobile Hamburger ─── */}
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

      {/* ─── Mobile Menu Full-Screen Overlay ─── */}
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

              {/* Language link in mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  delay: 0.1 + navLinks.length * 0.08,
                  duration: 0.4,
                  ease: EASE_ONRAMPER,
                }}
              >
                <Link
                  href={altLangHref}
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
                  {altLang === "ar" ? "العربية" : "English"}
                </Link>
              </motion.div>
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                delay: 0.1 + (navLinks.length + 1) * 0.08,
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
