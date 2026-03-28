"use client";

import { motion } from "framer-motion";
import { t, type Lang } from "@/i18n/utils";

/* ------------------------------------------------------------------ */
/*  Onramper easing                                                    */
/* ------------------------------------------------------------------ */
const EASE: [number, number, number, number] = [0.86, 0, 0.07, 1];

/* ------------------------------------------------------------------ */
/*  Template data                                                      */
/* ------------------------------------------------------------------ */

interface TemplateItem {
  id: string;
  i18nKey: string;
  color: string;
  gradient?: string;
  isDark: boolean;
  isPro: boolean;
}

const templates: TemplateItem[] = [
  { id: "classic", i18nKey: "templates.items.classic", color: "#3053EC", isDark: false, isPro: false },
  { id: "minimal", i18nKey: "templates.items.minimal", color: "#f5f5f5", isDark: false, isPro: true },
  { id: "modern", i18nKey: "templates.items.modern", color: "#3053EC", gradient: "linear-gradient(135deg, #3053EC 0%, #7C3AED 100%)", isDark: false, isPro: true },
  { id: "bold", i18nKey: "templates.items.bold", color: "#2a2a2e", isDark: true, isPro: true },
  { id: "elegant", i18nKey: "templates.items.elegant", color: "#d4c5a0", isDark: false, isPro: true },
  { id: "corporate", i18nKey: "templates.items.corporate", color: "#1e3a5f", isDark: true, isPro: true },
  { id: "freelancer", i18nKey: "templates.items.freelancer", color: "#0d9488", isDark: false, isPro: true },
  { id: "commercial", i18nKey: "templates.items.commercial", color: "#4c4c4f", isDark: true, isPro: true },
  { id: "executive", i18nKey: "templates.items.executive", color: "#1a1a1e", isDark: true, isPro: true },
  { id: "navy", i18nKey: "templates.items.navy", color: "#1e3a8a", isDark: true, isPro: true },
  { id: "fresh", i18nKey: "templates.items.fresh", color: "#16a34a", isDark: false, isPro: true },
  { id: "refined", i18nKey: "templates.items.refined", color: "#e5e5e5", isDark: false, isPro: true },
  { id: "contractor", i18nKey: "templates.items.contractor", color: "#ea580c", isDark: false, isPro: true },
  { id: "studio", i18nKey: "templates.items.studio", color: "#7c3aed", isDark: false, isPro: true },
  { id: "hourly", i18nKey: "templates.items.hourly", color: "#0ea5e9", isDark: false, isPro: true },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface TemplatesProps {
  lang: Lang;
  translations?: Record<string, { name: string; tag: string }>;
  categories?: Record<string, string>;
}

export default function Templates({ lang, translations }: TemplatesProps) {
  return (
    <section id="templates" className="bg-[#efeef3] py-[80px]">
      <div className="mx-auto max-w-[1340px] px-5">
        {/* ---- Header (centered) ---- */}
        <div className="text-center">
          {/* Title — h3: 70px, 500 weight, -1.4px tracking, 100% line-height */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-heading font-medium text-[#151515]"
            style={{
              fontSize: "clamp(50px, 5.5vw, 70px)",
              letterSpacing: "-1.4px",
              lineHeight: "100%",
            }}
          >
            {t(lang, "templates.subtitle")}
          </motion.h2>

          {/* Subtitle — 24px, body-copy color */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mx-auto mt-5 max-w-[570px] text-center text-[#6a6a84]"
            style={{
              fontSize: "24px",
              letterSpacing: "-0.24px",
              lineHeight: "133%",
            }}
          >
            {t(lang, "templates.cta")}
          </motion.p>
        </div>

        {/* ---- Grid: 5 cols desktop, 3 tablet, 2 mobile ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-[60px] grid grid-cols-2 gap-[20px] sm:grid-cols-3 md:grid-cols-5"
        >
          {templates.map((template) => {
            const tagText =
              translations?.[template.id]?.tag ??
              (template.isPro ? "Pro" : "Free");
            const isPro = tagText === "Pro";

            return (
              <motion.div
                key={template.id}
                variants={cardVariants}
                className="group"
              >
                {/* Template card */}
                <div
                  className="relative overflow-hidden rounded-[16px] bg-white"
                  style={{
                    transition: `transform 0.35s cubic-bezier(0.86, 0, 0.07, 1), box-shadow 0.35s cubic-bezier(0.86, 0, 0.07, 1)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 75px rgba(19,40,42,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Top colored stripe — h-2 */}
                  <div
                    className="h-2 w-full"
                    style={{
                      background: template.gradient || template.color,
                    }}
                  />

                  {/* Document preview area */}
                  <div className="relative h-[160px] w-full p-4">
                    {/* Mini document lines */}
                    <div className="flex flex-col gap-2">
                      <div className="h-2 w-3/4 rounded-full bg-[#151515]/[0.08]" />
                      <div className="h-2 w-full rounded-full bg-[#151515]/[0.08]" />
                      <div className="h-2 w-5/6 rounded-full bg-[#151515]/[0.08]" />
                      <div className="mt-1 h-2 w-2/3 rounded-full bg-[#151515]/[0.08]" />
                    </div>

                    {/* Badge -- top end */}
                    <div className="absolute top-3 end-3">
                      {isPro ? (
                        <span className="rounded-full bg-[#3053EC] px-2.5 py-1 text-xs font-bold text-white">
                          {tagText}
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#33e7a1] px-2.5 py-1 text-xs font-bold text-[#151515]">
                          {tagText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Template name */}
                <p className="mt-2 text-center text-[16px] font-medium text-[#151515]">
                  {translations?.[template.id]?.name ??
                    t(lang, `${template.i18nKey}.name`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---- CTA below grid — secondary button ---- */}
        <motion.div
          className="mt-[60px] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          <span
            className="inline-flex items-center gap-2 text-[18px] font-medium text-[#151515] transition-opacity duration-300 hover:opacity-70 cursor-pointer"
          >
            {t(lang, "templates.label")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
