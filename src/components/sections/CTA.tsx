"use client";

import { motion } from "framer-motion";
import { type Lang, t } from "@/i18n/utils";

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

/* ------------------------------------------------------------------ */
/*  Onramper easing                                                    */
/* ------------------------------------------------------------------ */

const onramperEase = [0.86, 0, 0.07, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  CTA section — animated gradient, Onramper "Plug. Play. Prosper."   */
/* ------------------------------------------------------------------ */

export default function CTA({ lang }: { lang: Lang }) {
  return (
    <section
      className="cta-gradient-bg"
      style={{
        paddingBlockStart: 120,
        paddingBlockEnd: 120,
        background:
          "linear-gradient(135deg, #3053EC 0%, #2040C0 50%, #3053EC 100%)",
        backgroundSize: "200% 200%",
        animation: "ctaGradient 10s ease infinite",
      }}
    >
      <motion.div
        className="mx-auto max-w-[780px] px-5 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: onramperEase }}
      >
        {/* Headline */}
        <h2 className="font-heading text-white">{t(lang, "cta.title")}</h2>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[130%] tracking-[-0.16px] text-white/70">
          {t(lang, "cta.subtitle")}
        </p>

        {/* CTA button */}
        <motion.a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2.5 rounded-[70px] bg-white px-[30px] py-[18px] text-[20px] font-medium text-[#151515]"
          style={{
            transition: "opacity 0.35s cubic-bezier(0.86, 0, 0.07, 1)",
          }}
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Apple icon */}
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.56C5.55 8.09 7.13 7.17 8.82 7.15C10.1 7.13 11.32 8.01 12.11 8.01C12.89 8.01 14.37 6.95 15.92 7.11C16.57 7.14 18.39 7.38 19.56 9.07C19.47 9.13 17.29 10.39 17.31 13.03C17.34 16.18 20.05 17.21 20.08 17.22C20.05 17.29 19.62 18.83 18.71 19.5ZM13.05 3.16C13.75 2.32 14.21 1.16 14.08 0C13.08 0.04 11.88 0.65 11.15 1.49C10.49 2.24 9.93 3.42 10.09 4.55C11.2 4.64 12.35 4 13.05 3.16Z" />
          </svg>
          {t(lang, "cta.button")}
        </motion.a>

        {/* Note */}
        <p className="mt-4 text-sm text-white/40">{t(lang, "cta.note")}</p>
      </motion.div>
    </section>
  );
}
