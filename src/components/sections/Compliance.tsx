"use client";

import { motion } from "framer-motion";
import { type Lang, t } from "@/i18n/utils";
import type { Country } from "@/i18n/countries";

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

/* ------------------------------------------------------------------ */
/*  Onramper easing                                                    */
/* ------------------------------------------------------------------ */
const EASE: [number, number, number, number] = [0.86, 0, 0.07, 1];

/* ------------------------------------------------------------------ */
/*  Green checkmark circle (teal bg, white check)                      */
/* ------------------------------------------------------------------ */
function CheckCircle() {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#33e7a1]"
      aria-hidden="true"
    >
      <svg
        className="h-3.5 w-3.5 text-white"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 7.5L5.5 10.5L11.5 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Compliance feature card                                            */
/* ------------------------------------------------------------------ */
function ComplianceCard({
  flag,
  badge,
  title,
  features,
  index,
  prominent = false,
}: {
  flag: string;
  badge: string;
  title: string;
  features: string[];
  index: number;
  prominent?: boolean;
}) {
  return (
    <motion.div
      className={`rounded-[16px] bg-[#efeef3] ps-[36px] pe-[36px] ${prominent ? "p-[40px] ring-2 ring-[#3053EC]/20" : "p-[30px]"}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: EASE,
      }}
    >
      {/* Flag + badge row */}
      <div className="flex items-center gap-3">
        <span className={prominent ? "text-5xl" : "text-4xl"} role="img" aria-label={title}>
          {flag}
        </span>
        <span className="rounded-full bg-[#3053EC]/10 px-3 py-1 text-sm font-medium text-[#3053EC]">
          {badge}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mt-4 font-heading font-medium text-[#151515]"
        style={{
          fontSize: prominent ? "clamp(36px, 4.5vw, 48px)" : "clamp(32px, 4vw, 42px)",
          letterSpacing: "-0.42px",
          lineHeight: "110%",
        }}
      >
        {title}
      </h3>

      {/* Feature list */}
      <ul className="mt-4 flex flex-col gap-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle />
            <span className={`font-medium text-[#151515] ${prominent ? "text-[20px]" : "text-[18px]"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Apple icon SVG                                                     */
/* ------------------------------------------------------------------ */
function AppleIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.56C5.55 8.09 7.13 7.17 8.82 7.15C10.1 7.13 11.32 8.01 12.11 8.01C12.89 8.01 14.37 6.95 15.92 7.11C16.57 7.14 18.39 7.38 19.56 9.07C19.47 9.13 17.29 10.39 17.31 13.03C17.34 16.18 20.05 17.21 20.08 17.22C20.05 17.29 19.62 18.83 18.71 19.5ZM13.05 3.16C13.75 2.32 14.21 1.16 14.08 0C13.08 0.04 11.88 0.65 11.15 1.49C10.49 2.24 9.93 3.42 10.09 4.55C11.2 4.64 12.35 4 13.05 3.16Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Compliance section                                            */
/* ------------------------------------------------------------------ */
export default function Compliance({ lang, country }: { lang: Lang; country?: Country }) {
  const zatcaFeatures = [0, 1, 2, 3].map((i) =>
    t(lang, `compliance.zatca.features.${i}`)
  );

  const uaeFeatures = [0, 1, 2, 3].map((i) =>
    t(lang, `compliance.uae.features.${i}`)
  );

  // Determine which card is prominent based on country
  const zatcaProminent = country === "sa";
  const uaeProminent = country === "ae";

  // Order cards: prominent card first when country is set
  const zatcaCard = (
    <ComplianceCard
      flag={"\ud83c\uddf8\ud83c\udde6"}
      badge={t(lang, "compliance.zatca.subtitle")}
      title={t(lang, "compliance.zatca.title")}
      features={zatcaFeatures}
      index={country === "ae" ? 1 : 0}
      prominent={zatcaProminent}
    />
  );

  const uaeCard = (
    <ComplianceCard
      flag={"\ud83c\udde6\ud83c\uddea"}
      badge={t(lang, "compliance.uae.subtitle")}
      title={t(lang, "compliance.uae.title")}
      features={uaeFeatures}
      index={country === "ae" ? 0 : 1}
      prominent={uaeProminent}
    />
  );

  // Show the relevant country card first
  const firstCard = country === "ae" ? uaeCard : zatcaCard;
  const secondCard = country === "ae" ? zatcaCard : uaeCard;

  // Left column description changes based on country
  const leftTitle = country === "ae"
    ? t(lang, "compliance.uae.title")
    : t(lang, "compliance.zatca.title");
  const leftDescription = country === "ae"
    ? t(lang, "compliance.uae.description")
    : t(lang, "compliance.zatca.description");

  return (
    <section id="compliance" style={{ paddingBlockStart: 120, paddingBlockEnd: 120, background: "white" }}>
      <div className="mx-auto max-w-[1340px] px-5">
        {/* ---- Two-column layout ---- */}
        <div className="flex flex-col gap-[40px] lg:flex-row lg:items-start lg:justify-between lg:gap-[63px]">
          {/* Left column — text content (50%) */}
          <div className="lg:w-[50%]">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-heading font-medium text-[#151515]"
            >
              {leftTitle}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mt-[25px] text-[#6a6a84]"
              style={{
                fontSize: "24px",
                letterSpacing: "-0.24px",
                lineHeight: "133%",
              }}
            >
              {leftDescription}
            </motion.p>

            {/* CTA below text — left-aligned */}
            <motion.div
              className="mt-[40px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button primary inline-flex items-center gap-2.5"
              >
                <AppleIcon />
                {t(lang, "compliance.cta")}
              </a>
            </motion.div>
          </div>

          {/* Right column — stacked compliance cards (50%) */}
          <div className="flex flex-col gap-[20px] lg:w-1/2">
            {firstCard}
            {secondCard}
          </div>
        </div>
      </div>
    </section>
  );
}
