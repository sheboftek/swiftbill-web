import { motion } from "motion/react";

interface TemplateItem {
  name: string;
  tag: string;
}

interface TemplateTranslations {
  label: string;
  title: string;
  subtitle: string;
  cta: string;
  items: Record<string, TemplateItem>;
}

interface TemplateGalleryProps {
  lang: string;
  translations: TemplateTranslations;
}

type LineDef = { top: string; width: string; bg: string; height?: string };

type TemplateStyleDef = {
  background: string;
  headerHeight: string;
  headerBg: string;
  hasSidebar?: boolean;
  sidebarBg?: string;
  lines: LineDef[];
};

const templateStyles: Record<string, TemplateStyleDef> = {
  classic: {
    background: "#FFFFFF",
    headerHeight: "28%",
    headerBg: "linear-gradient(135deg, #3053EC, #4A6CF7)",
    lines: [
      { top: "38%", width: "60%", bg: "#E2E8F0" },
      { top: "48%", width: "80%", bg: "#E2E8F0" },
      { top: "58%", width: "70%", bg: "#E2E8F0" },
      { top: "72%", width: "45%", bg: "#3053EC", height: "3px" },
      { top: "80%", width: "90%", bg: "#F1F5F9" },
    ],
  },
  minimal: {
    background: "#FFFFFF",
    headerHeight: "0%",
    headerBg: "transparent",
    lines: [
      { top: "10%", width: "40%", bg: "#1A1A1A", height: "2px" },
      { top: "18%", width: "55%", bg: "#E5E7EB" },
      { top: "26%", width: "90%", bg: "#F3F4F6", height: "1px" },
      { top: "36%", width: "75%", bg: "#E5E7EB" },
      { top: "46%", width: "90%", bg: "#F3F4F6", height: "1px" },
      { top: "56%", width: "65%", bg: "#E5E7EB" },
      { top: "70%", width: "90%", bg: "#F3F4F6", height: "1px" },
      { top: "82%", width: "30%", bg: "#D1D5DB" },
    ],
  },
  modern: {
    background: "#FFFFFF",
    headerHeight: "30%",
    headerBg: "linear-gradient(135deg, #4A6CF7, #7C3AED)",
    lines: [
      { top: "40%", width: "50%", bg: "#DDD6FE" },
      { top: "50%", width: "85%", bg: "#EDE9FE" },
      { top: "60%", width: "70%", bg: "#EDE9FE" },
      { top: "75%", width: "40%", bg: "#7C3AED", height: "3px" },
      { top: "84%", width: "60%", bg: "#F5F3FF" },
    ],
  },
  bold: {
    background: "#FFFFFF",
    headerHeight: "32%",
    headerBg: "#1A1A2E",
    lines: [
      { top: "42%", width: "55%", bg: "#334155" },
      { top: "52%", width: "80%", bg: "#E2E8F0" },
      { top: "62%", width: "65%", bg: "#E2E8F0" },
      { top: "76%", width: "90%", bg: "#F8FAFC" },
      { top: "84%", width: "35%", bg: "#1A1A2E", height: "3px" },
    ],
  },
  elegant: {
    background: "#FFFBF5",
    headerHeight: "0%",
    headerBg: "transparent",
    lines: [
      { top: "8%", width: "90%", bg: "#D4A853", height: "2px" },
      { top: "16%", width: "45%", bg: "#92734A" },
      { top: "26%", width: "70%", bg: "#E8DFD0" },
      { top: "36%", width: "60%", bg: "#E8DFD0" },
      { top: "50%", width: "80%", bg: "#F0E9DD" },
      { top: "60%", width: "50%", bg: "#E8DFD0" },
      { top: "76%", width: "90%", bg: "#D4A853", height: "2px" },
      { top: "84%", width: "30%", bg: "#92734A" },
    ],
  },
  corporate: {
    background: "#FFFFFF",
    headerHeight: "0%",
    headerBg: "transparent",
    hasSidebar: true,
    sidebarBg: "#1E3A5F",
    lines: [
      { top: "10%", width: "60%", bg: "#E2E8F0" },
      { top: "20%", width: "75%", bg: "#E2E8F0" },
      { top: "34%", width: "85%", bg: "#F1F5F9" },
      { top: "48%", width: "70%", bg: "#E2E8F0" },
      { top: "60%", width: "85%", bg: "#F1F5F9" },
      { top: "76%", width: "50%", bg: "#1E3A5F", height: "3px" },
    ],
  },
  freelancer: {
    background: "#FFFFFF",
    headerHeight: "26%",
    headerBg: "linear-gradient(135deg, #0D9488, #14B8A6)",
    lines: [
      { top: "36%", width: "50%", bg: "#CCFBF1" },
      { top: "46%", width: "80%", bg: "#F0FDFA" },
      { top: "56%", width: "65%", bg: "#F0FDFA" },
      { top: "70%", width: "45%", bg: "#0D9488", height: "3px" },
      { top: "80%", width: "70%", bg: "#F0FDFA" },
    ],
  },
  commercial: {
    background: "#F9FAFB",
    headerHeight: "0%",
    headerBg: "transparent",
    lines: [
      { top: "6%", width: "90%", bg: "#D1D5DB", height: "1px" },
      { top: "14%", width: "40%", bg: "#6B7280" },
      { top: "24%", width: "90%", bg: "#E5E7EB" },
      { top: "34%", width: "90%", bg: "#E5E7EB" },
      { top: "44%", width: "90%", bg: "#D1D5DB", height: "1px" },
      { top: "54%", width: "70%", bg: "#E5E7EB" },
      { top: "64%", width: "90%", bg: "#E5E7EB" },
      { top: "78%", width: "90%", bg: "#D1D5DB", height: "1px" },
      { top: "86%", width: "35%", bg: "#6B7280" },
    ],
  },
  executive: {
    background: "#FFFFFF",
    headerHeight: "30%",
    headerBg: "#0F0F0F",
    lines: [
      { top: "40%", width: "50%", bg: "#D4A853" },
      { top: "50%", width: "80%", bg: "#F5F0E8" },
      { top: "60%", width: "65%", bg: "#F5F0E8" },
      { top: "74%", width: "40%", bg: "#D4A853", height: "3px" },
      { top: "84%", width: "55%", bg: "#F5F0E8" },
    ],
  },
  navy: {
    background: "#FFFFFF",
    headerHeight: "30%",
    headerBg: "linear-gradient(135deg, #1E3A5F, #1E3A8A)",
    lines: [
      { top: "40%", width: "55%", bg: "#DBEAFE" },
      { top: "50%", width: "80%", bg: "#EFF6FF" },
      { top: "60%", width: "70%", bg: "#EFF6FF" },
      { top: "74%", width: "45%", bg: "#1E3A5F", height: "3px" },
      { top: "84%", width: "65%", bg: "#EFF6FF" },
    ],
  },
  fresh: {
    background: "#FFFFFF",
    headerHeight: "26%",
    headerBg: "linear-gradient(135deg, #16A34A, #22C55E)",
    lines: [
      { top: "36%", width: "50%", bg: "#DCFCE7" },
      { top: "46%", width: "80%", bg: "#F0FDF4" },
      { top: "56%", width: "65%", bg: "#F0FDF4" },
      { top: "70%", width: "40%", bg: "#16A34A", height: "3px" },
      { top: "80%", width: "70%", bg: "#F0FDF4" },
    ],
  },
  refined: {
    background: "#FAFAFA",
    headerHeight: "0%",
    headerBg: "transparent",
    lines: [
      { top: "8%", width: "90%", bg: "#D4D4D8", height: "1px" },
      { top: "16%", width: "45%", bg: "#71717A" },
      { top: "26%", width: "75%", bg: "#E4E4E7" },
      { top: "36%", width: "60%", bg: "#E4E4E7" },
      { top: "50%", width: "90%", bg: "#D4D4D8", height: "1px" },
      { top: "60%", width: "70%", bg: "#E4E4E7" },
      { top: "74%", width: "90%", bg: "#D4D4D8", height: "1px" },
      { top: "84%", width: "30%", bg: "#71717A" },
    ],
  },
  contractor: {
    background: "#FFFFFF",
    headerHeight: "28%",
    headerBg: "linear-gradient(135deg, #EA580C, #F59E0B)",
    lines: [
      { top: "38%", width: "55%", bg: "#FED7AA" },
      { top: "48%", width: "80%", bg: "#FFF7ED" },
      { top: "58%", width: "65%", bg: "#FFF7ED" },
      { top: "72%", width: "45%", bg: "#EA580C", height: "3px" },
      { top: "82%", width: "60%", bg: "#FFF7ED" },
    ],
  },
  studio: {
    background: "#FFFFFF",
    headerHeight: "28%",
    headerBg: "linear-gradient(135deg, #7C3AED, #A855F7)",
    lines: [
      { top: "38%", width: "50%", bg: "#EDE9FE" },
      { top: "48%", width: "80%", bg: "#F5F3FF" },
      { top: "58%", width: "70%", bg: "#F5F3FF" },
      { top: "72%", width: "40%", bg: "#7C3AED", height: "3px" },
      { top: "82%", width: "55%", bg: "#F5F3FF" },
    ],
  },
  hourly: {
    background: "#FFFFFF",
    headerHeight: "0%",
    headerBg: "transparent",
    hasSidebar: true,
    sidebarBg: "linear-gradient(180deg, #3053EC, #4A6CF7)",
    lines: [
      { top: "8%", width: "40%", bg: "#3053EC" },
      { top: "18%", width: "90%", bg: "#EFF6FF", height: "6px" },
      { top: "28%", width: "90%", bg: "#DBEAFE", height: "4px" },
      { top: "36%", width: "90%", bg: "#EFF6FF", height: "6px" },
      { top: "46%", width: "90%", bg: "#DBEAFE", height: "4px" },
      { top: "54%", width: "90%", bg: "#EFF6FF", height: "6px" },
      { top: "64%", width: "90%", bg: "#DBEAFE", height: "4px" },
      { top: "76%", width: "50%", bg: "#3053EC", height: "3px" },
      { top: "84%", width: "35%", bg: "#93C5FD" },
    ],
  },
};

const templateOrder = [
  "classic",
  "minimal",
  "modern",
  "bold",
  "elegant",
  "corporate",
  "freelancer",
  "commercial",
  "executive",
  "navy",
  "fresh",
  "refined",
  "contractor",
  "studio",
  "hourly",
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18,
    },
  },
};

function TemplatePreview({ templateKey }: { templateKey: string }) {
  const style = templateStyles[templateKey];
  if (!style) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{
        aspectRatio: "8.5 / 11",
        background: style.background,
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Sidebar for corporate/hourly */}
      {style.hasSidebar && (
        <div
          className="absolute inset-block-0"
          style={{
            insetInlineStart: 0,
            width: "22%",
            background: style.sidebarBg,
          }}
        />
      )}

      {/* Header bar */}
      {style.headerHeight !== "0%" && (
        <div
          className="absolute inset-inline-0"
          style={{
            top: 0,
            height: style.headerHeight,
            background: style.headerBg,
          }}
        >
          {/* Simulated header text lines */}
          <div
            className="absolute"
            style={{
              insetInlineStart: "8%",
              top: "30%",
              width: "50%",
              height: "4px",
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "2px",
            }}
          />
          <div
            className="absolute"
            style={{
              insetInlineStart: "8%",
              top: "55%",
              width: "35%",
              height: "3px",
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: "2px",
            }}
          />
        </div>
      )}

      {/* Content lines */}
      {style.lines.map((line, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: line.top,
            insetInlineStart: style.hasSidebar ? "28%" : "6%",
            width: line.width,
            height: line.height ?? "4px",
            background: line.bg,
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
}

export default function TemplateGallery({
  lang,
  translations,
}: TemplateGalleryProps) {
  const isRTL = lang === "ar";

  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3"
      dir={isRTL ? "rtl" : "ltr"}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {templateOrder.map((key) => {
        const item = translations.items[key];
        if (!item) return null;

        const isFree = item.tag === "Free";

        return (
          <motion.div
            key={key}
            className="group cursor-pointer"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-200 group-hover:shadow-lg"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              {/* Template preview */}
              <div className="p-3 pb-0">
                <TemplatePreview templateKey={key} />
              </div>

              {/* Template info */}
              <div className="flex items-center justify-between p-3">
                <span className="text-sm font-medium text-gray-900">
                  {item.name}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isFree
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
