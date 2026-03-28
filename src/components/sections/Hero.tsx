"use client";

import { motion } from "framer-motion";
import { type Lang, t } from "@/i18n/utils";
import type { Country } from "@/i18n/countries";
import { NumberTicker } from "@/components/magicui/number-ticker";

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

/* ─── Onramper easing: cubic-bezier(0.86, 0, 0.07, 1) ─── */
const onramperEase: [number, number, number, number] = [0.86, 0, 0.07, 1];

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: onramperEase,
    },
  },
};

/* ─── Trust bar items ─── */
const trustItemsGeneric = [
  "Freelancers",
  "Designers",
  "Contractors",
  "Consultants",
  "Small Businesses",
];

const trustItemsSaudi = [
  "Saudi Freelancers",
  "Riyadh",
  "Jeddah",
  "ZATCA",
  "Contractors",
];

const trustItemsUAE = [
  "Dubai Freelancers",
  "Abu Dhabi",
  "Emirates",
  "FTA",
  "Consultants",
];

function getTrustItems(country?: Country): string[] {
  if (country === "sa") return trustItemsSaudi;
  if (country === "ae") return trustItemsUAE;
  return trustItemsGeneric;
}

/* ─── Invoice mockup line-item data ─── */
const lineItems = [
  { service: "Brand Identity Design", detail: "20 hrs \u00d7 $85", amount: "$1,700" },
  { service: "Website Development", detail: "40 hrs \u00d7 $95", amount: "$3,800" },
  { service: "Consulting", detail: "5 hrs \u00d7 $120", amount: "$600" },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Hero
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function Hero({ lang, country }: { lang: Lang; country?: Country }) {
  const trustItems = getTrustItems(country);
  return (
    <>
      <section className="bg-[#efeef3]">
        {/* Outer container — Onramper: max-width 1340px, 20px side padding */}
        <div
          className="hero-wrapper mx-auto flex min-h-[80vh] flex-col items-center px-5 pt-[100px] lg:flex-row lg:items-stretch lg:justify-center lg:gap-[80px]"
          style={{ maxWidth: 1340 }}
        >
          {/* ── Left column: text ─────────────────────── */}
          <motion.div
            className="w-full flex-none lg:w-1/2 lg:max-w-[580px]"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge pill */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center rounded-full border border-[#3053EC]/20 bg-[#3053EC]/5 px-4 py-1.5 text-xs font-medium text-[#3053EC]">
                {t(lang, "hero.badge", country)}
              </span>
            </motion.div>

            {/* Headline — uses h3 sizing from globals.css (70px / 500 / -1.4px / 100%) */}
            <motion.h3
              variants={fadeUp}
              className="mt-8 font-heading text-[#151515]"
            >
              {t(lang, "hero.title", country)}{" "}
              <span className="text-[#3053EC]">
                {t(lang, "hero.titleHighlight", country)}
              </span>
            </motion.h3>

            {/* Subtitle — Onramper: mt-20px, 16px, #6a6a84, -0.16px, 130% */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[480px] text-[16px] leading-[130%] tracking-[-0.16px] text-[#6a6a84]"
            >
              {t(lang, "hero.subtitle", country)}
            </motion.p>

            {/* CTAs — mt-40px, gap-16px */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              {/* Primary CTA — Onramper: #151515 bg, rounded-[70px], 20px, 500wt */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button primary inline-flex items-center gap-2"
              >
                {/* Apple icon */}
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.7 12.57 5.7C13.36 5.7 14.85 4.62 16.4 4.8C17.04 4.83 18.83 5.05 19.97 6.7C19.87 6.76 17.64 8.07 17.67 10.8C17.7 14.1 20.52 15.19 20.55 15.2C20.52 15.27 20.08 16.78 18.97 18.33L18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                {t(lang, "hero.cta")}
              </a>

              {/* Secondary CTA */}
              <a
                href="#features"
                className="button secondary"
              >
                {t(lang, "hero.ctaSecondary")}
              </a>
            </motion.div>

            {/* Stats row — mt-60px */}
            <motion.div
              variants={fadeUp}
              className="mt-[60px] flex items-center gap-8 sm:gap-10"
            >
              {/* Templates */}
              <div>
                <h5 className="text-[#151515]">
                  <NumberTicker
                    value={15}
                    suffix="+"
                    className="tabular-nums"
                  />
                </h5>
                <div className="mt-1 text-[16px] text-[#808099]">
                  Templates
                </div>
              </div>

              <div className="h-8 w-px bg-[#e5e5e7]" aria-hidden="true" />

              {/* Currencies */}
              <div>
                <h5 className="text-[#151515]">
                  <NumberTicker
                    value={22}
                    className="tabular-nums"
                  />
                </h5>
                <div className="mt-1 text-[16px] text-[#808099]">
                  Currencies
                </div>
              </div>

              <div className="h-8 w-px bg-[#e5e5e7]" aria-hidden="true" />

              {/* Rating */}
              <div>
                <h5 className="text-[#151515]">
                  <NumberTicker
                    value={4}
                    suffix=".9+"
                    className="tabular-nums"
                  />
                </h5>
                <div className="mt-1 text-[16px] text-[#808099]">
                  App Store
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column: invoice mockup ──────────── */}
          <motion.div
            className="relative hidden w-full lg:block lg:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: onramperEase }}
          >
            {/* Gradient blob behind the card */}
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <div
                className="mx-auto rounded-full"
                style={{
                  width: 300,
                  height: 300,
                  background: "linear-gradient(135deg, #3053EC 0%, #6affc5 100%)",
                  filter: "blur(80px)",
                  opacity: 0.3,
                }}
              />
            </div>

            {/* Invoice card */}
            <div
              className="relative mx-auto max-w-[440px] rounded-2xl bg-white p-8"
              style={{
                boxShadow: "0 8px 75px rgba(19, 40, 42, 0.12)",
                borderRadius: 16,
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* SwiftBill logo icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3053EC]">
                    <svg
                      className="h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#151515]">
                      SwiftBill
                    </div>
                    <div className="text-[12px] text-[#808099]">
                      INV-0042
                    </div>
                  </div>
                </div>
                {/* Paid badge */}
                <span className="inline-flex items-center rounded-full bg-[#33e7a1]/15 px-3 py-1 text-[12px] font-semibold text-[#0d9f6e]">
                  Paid
                </span>
              </div>

              {/* Client info */}
              <div className="mt-5 rounded-lg bg-[#f8f8fa] px-4 py-3">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#808099]">
                  Bill to
                </div>
                <div className="mt-0.5 text-[14px] font-medium text-[#151515]">
                  Acme Design Studio
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-[#efeef3]" />

              {/* Line items */}
              <div className="space-y-4">
                {lineItems.map((item) => (
                  <div
                    key={item.service}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[14px] font-medium text-[#151515]">
                        {item.service}
                      </div>
                      <div className="text-[12px] text-[#808099]">
                        {item.detail}
                      </div>
                    </div>
                    <div className="text-[14px] font-semibold text-[#151515]">
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-[#efeef3]" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="text-[14px] font-medium text-[#808099]">
                  Total
                </div>
                <div className="text-[22px] font-bold text-[#151515]">
                  $6,100.00
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust / Logo bar ─────────────────────────── */}
      <div className="overflow-hidden bg-[#efeef3] py-[30px]">
        <div className="trust-scroll-wrapper">
          <div className="trust-scroll flex gap-[50px]">
            {/* Duplicate list twice for seamless infinite scroll */}
            {[...trustItems, ...trustItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex-none whitespace-nowrap text-[20px] font-medium text-[#808099] opacity-70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Inline keyframe style for the infinite scroll */}
        <style>{`
          .trust-scroll-wrapper {
            display: flex;
            width: max-content;
          }
          .trust-scroll {
            animation: trust-marquee 20s linear infinite;
          }
          @keyframes trust-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .trust-scroll {
              animation: none;
            }
          }
          @media (max-width: 991px) {
            .hero-wrapper {
              flex-direction: column;
              margin-top: 100px;
              padding-top: 0 !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
