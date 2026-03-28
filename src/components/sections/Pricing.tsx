"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t, type Lang } from "@/i18n/utils";

/* ------------------------------------------------------------------ */
/*  Check icon                                                         */
/* ------------------------------------------------------------------ */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 11.5L9.5 15L16 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Onramper easing & animation                                        */
/* ------------------------------------------------------------------ */

const onramperEase = [0.86, 0, 0.07, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: onramperEase,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

export default function Pricing({ lang }: { lang: Lang }) {
  const [isYearly, setIsYearly] = useState(false);

  const proPrice = isYearly
    ? t(lang, "pricing.pro.priceYearly")
    : t(lang, "pricing.pro.priceMonthly");

  const proPeriod = isYearly
    ? t(lang, "pricing.pro.periodYearly")
    : t(lang, "pricing.pro.periodMonthly");

  const proTrial = isYearly
    ? t(lang, "pricing.pro.trialYearly")
    : t(lang, "pricing.pro.trialMonthly");

  /* Parse feature arrays from JSON -- keys are indexed */
  const freeFeatures: string[] = [
    t(lang, "pricing.free.features.0"),
    t(lang, "pricing.free.features.1"),
    t(lang, "pricing.free.features.2"),
    t(lang, "pricing.free.features.3"),
    t(lang, "pricing.free.features.4"),
  ].filter((f) => !f.startsWith("pricing."));

  const proFeatures: string[] = [
    t(lang, "pricing.pro.features.0"),
    t(lang, "pricing.pro.features.1"),
    t(lang, "pricing.pro.features.2"),
    t(lang, "pricing.pro.features.3"),
    t(lang, "pricing.pro.features.4"),
    t(lang, "pricing.pro.features.5"),
    t(lang, "pricing.pro.features.6"),
    t(lang, "pricing.pro.features.7"),
    t(lang, "pricing.pro.features.8"),
  ].filter((f) => !f.startsWith("pricing."));

  return (
    <section id="pricing" style={{ paddingBlockStart: 120, paddingBlockEnd: 120, background: "white" }}>
      <div className="mx-auto max-w-[1340px] px-5">
        {/* ---- Header ---- */}
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: onramperEase }}
            className="font-heading text-[#151515]"
          >
            {t(lang, "pricing.title")}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: onramperEase }}
            className="mx-auto mt-5 max-w-[570px] text-[24px] leading-[133%] tracking-[-0.24px] text-[#6a6a84]"
          >
            {t(lang, "pricing.subtitle")}
          </motion.p>

          {/* ---- Toggle ---- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: onramperEase }}
            className="mt-[40px] inline-flex items-center rounded-full bg-[#efeef3] p-1"
            role="radiogroup"
            aria-label="Billing period"
          >
            <button
              role="radio"
              aria-checked={!isYearly}
              onClick={() => setIsYearly(false)}
              className="relative rounded-full px-6 py-3 text-[18px] font-medium"
              style={{
                transition: "color 0.35s cubic-bezier(0.86, 0, 0.07, 1)",
              }}
            >
              {!isYearly && (
                <motion.span
                  layoutId="pricing-indicator"
                  className="absolute inset-0 rounded-full bg-[#151515]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  !isYearly ? "text-white" : "text-[#6a6a84]"
                }`}
              >
                {t(lang, "pricing.monthly")}
              </span>
            </button>

            <button
              role="radio"
              aria-checked={isYearly}
              onClick={() => setIsYearly(true)}
              className="relative rounded-full px-6 py-3 text-[18px] font-medium"
              style={{
                transition: "color 0.35s cubic-bezier(0.86, 0, 0.07, 1)",
              }}
            >
              {isYearly && (
                <motion.span
                  layoutId="pricing-indicator"
                  className="absolute inset-0 rounded-full bg-[#151515]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 ${
                  isYearly ? "text-white" : "text-[#6a6a84]"
                }`}
              >
                {t(lang, "pricing.yearly")}
                <span className="rounded-full bg-[#33e7a1] px-2 py-0.5 text-xs font-bold text-[#151515]">
                  {t(lang, "pricing.yearlyDiscount")}
                </span>
              </span>
            </button>
          </motion.div>
        </div>

        {/* ---- Cards ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-[60px] grid grid-cols-1 gap-[34px] md:grid-cols-2"
        >
          {/* --- Free plan --- */}
          <motion.div variants={cardVariants} className="flex">
            <div className="flex flex-1 flex-col rounded-[16px] border border-[#e5e5e7] bg-white p-[36px]">
              {/* Plan name */}
              <h5 className="font-heading text-[#151515]">
                {t(lang, "pricing.free.name")}
              </h5>

              {/* Description */}
              <p className="mt-2 text-[16px] leading-[130%] tracking-[-0.16px] text-[#6a6a84]">
                {t(lang, "pricing.free.description")}
              </p>

              {/* Price */}
              <div className="mt-6">
                <span
                  className="font-heading text-[#151515]"
                  style={{
                    fontSize: "64px",
                    fontWeight: 700,
                    letterSpacing: "-1.28px",
                    lineHeight: "100%",
                  }}
                >
                  {t(lang, "pricing.free.price")}
                </span>
                <span className="ms-3 text-[16px] text-[#808099]">
                  {t(lang, "pricing.free.period")}
                </span>
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-[#e5e5e7]" />

              {/* Features */}
              <ul className="flex flex-col gap-4" role="list">
                {freeFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 shrink-0 text-[#33e7a1]" />
                    <span className="text-[18px] leading-[140%] text-[#151515]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA — secondary button */}
              <a
                href="https://apps.apple.com/app/id6760855924"
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary mt-auto w-full justify-center pt-8"
              >
                {t(lang, "pricing.free.cta")}
              </a>
            </div>
          </motion.div>

          {/* --- Pro plan --- */}
          <motion.div variants={cardVariants} className="flex">
            <div className="relative flex flex-1 flex-col rounded-[16px] bg-[#151515] p-[36px]">
              {/* Most Popular badge */}
              <span className="absolute end-4 top-4 rounded-full bg-[#3053EC] px-3 py-1 text-xs font-bold text-white">
                Most Popular
              </span>

              {/* Plan name */}
              <h5 className="font-heading text-white">
                {t(lang, "pricing.pro.name")}
              </h5>

              {/* Description */}
              <p className="mt-2 text-[16px] leading-[130%] tracking-[-0.16px] text-white/60">
                {t(lang, "pricing.pro.description")}
              </p>

              {/* Price */}
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={proPrice}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: onramperEase }}
                    className="inline-block font-heading text-white"
                    style={{
                      fontSize: "64px",
                      fontWeight: 700,
                      letterSpacing: "-1.28px",
                      lineHeight: "100%",
                    }}
                  >
                    {proPrice}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={proPeriod}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ms-3 text-[16px] text-white/60"
                  >
                    {proPeriod}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Trial text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={proTrial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 text-[16px] text-white/60"
                >
                  {proTrial}
                </motion.p>
              </AnimatePresence>

              {/* Divider */}
              <div className="my-8 h-px bg-white/10" />

              {/* Features */}
              <ul className="flex flex-col gap-4" role="list">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 shrink-0 text-white" />
                    <span className="text-[18px] leading-[140%] text-white/90">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA — white button */}
              <a
                href="https://apps.apple.com/app/id6760855924"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center rounded-[70px] bg-white px-[30px] py-[18px] pt-8 text-[20px] font-medium text-[#151515]"
                style={{
                  transition:
                    "opacity 0.35s cubic-bezier(0.86, 0, 0.07, 1)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
              >
                {t(lang, "pricing.pro.cta")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
