"use client";

import { motion } from "framer-motion";
import { t, type Lang } from "@/i18n/utils";

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

/* =============================================
   Animation variants — Onramper cubic-bezier
   ============================================= */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.86, 0, 0.07, 1] as [number, number, number, number],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.86, 0, 0.07, 1] as [number, number, number, number],
    },
  },
};

/* =============================================
   Arrow Link Icon (Onramper circle + diagonal arrow)
   ============================================= */

function ArrowLinkIcon({ color = "#3053EC" }: { color?: string }) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="13.5" cy="13.5" r="13.5" fill={color} />
      <path
        d="M10 17L17 10M17 10H11M17 10V16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =============================================
   Card Icon Circles (small colored circle with SVG)
   ============================================= */

function DocumentIcon() {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ width: 36, height: 36, backgroundColor: "#3053EC" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4.5 2.25H11.25L13.5 4.5V15.75H4.5V2.25Z"
          stroke="white"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7 7.5H11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 10H11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 12.5H9.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function EstimateIcon() {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ width: 36, height: 36, backgroundColor: "#7C3AED" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M10.5 2.25L4.5 8.25V15.75H13.5V2.25H10.5Z"
          stroke="white"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 13L8 11.5L10 13.5L13 10.5"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ExpenseIcon() {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ width: 36, height: 36, backgroundColor: "#33e7a1" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="2.5" height="8" rx="1" fill="white" fillOpacity="0.9" />
        <rect x="7" y="4" width="2.5" height="10" rx="1" fill="white" fillOpacity="0.9" />
        <rect x="11" y="2.5" width="2.5" height="11.5" rx="1" fill="white" fillOpacity="0.9" />
        <path d="M2.5 14.5H15.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function AIIcon() {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ width: 36, height: 36, backgroundColor: "#4F46E5" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 2L10.2 5.8L14 7L10.2 8.2L9 12L7.8 8.2L4 7L7.8 5.8L9 2Z"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="white"
          fillOpacity="0.15"
        />
        <path
          d="M13.5 10.5L14.1 12.4L16 13L14.1 13.6L13.5 15.5L12.9 13.6L11 13L12.9 12.4L13.5 10.5Z"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="white"
          fillOpacity="0.15"
        />
      </svg>
    </div>
  );
}

/* =============================================
   Premium SVG Illustrations (400x250 viewBox)
   ============================================= */

/** Card 1 -- Invoices: stack of invoice cards fanning out */
function InvoicesIllustration() {
  return (
    <svg viewBox="0 0 400 250" fill="none" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="inv-grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3053EC" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#3053EC" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="inv-grad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3053EC" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3053EC" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Card 5 -- furthest back */}
      <g transform="translate(230, 20) rotate(10)">
        <rect width="110" height="155" rx="8" fill="url(#inv-grad1)" stroke="#3053EC" strokeWidth="1.5" strokeOpacity="0.12" />
        <rect x="16" y="18" width="30" height="4" rx="2" fill="#3053EC" fillOpacity="0.1" />
        <rect x="16" y="28" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.06" />
        <rect x="16" y="36" width="60" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.06" />
      </g>

      {/* Card 4 */}
      <g transform="translate(195, 14) rotate(5)">
        <rect width="110" height="155" rx="8" fill="url(#inv-grad1)" stroke="#3053EC" strokeWidth="1.5" strokeOpacity="0.16" />
        <rect x="16" y="18" width="34" height="4" rx="2" fill="#3053EC" fillOpacity="0.14" />
        <rect x="16" y="28" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.08" />
        <rect x="16" y="36" width="68" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.08" />
        <rect x="16" y="44" width="52" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.06" />
        <circle cx="88" cy="20" r="8" stroke="#3053EC" strokeWidth="1" strokeOpacity="0.12" />
      </g>

      {/* Card 3 */}
      <g transform="translate(155, 12) rotate(0)">
        <rect width="110" height="155" rx="8" fill="url(#inv-grad1)" stroke="#3053EC" strokeWidth="1.5" strokeOpacity="0.22" />
        <rect x="16" y="18" width="38" height="4" rx="2" fill="#3053EC" fillOpacity="0.18" />
        <rect x="16" y="28" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.1" />
        <rect x="16" y="36" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.1" />
        <rect x="16" y="44" width="58" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.08" />
        {/* Signature line */}
        <path d="M16 125C24 119 34 128 44 122S64 115 78 122" stroke="#3053EC" strokeWidth="1" strokeOpacity="0.15" strokeLinecap="round" />
        <line x1="16" y1="132" x2="78" y2="132" stroke="#3053EC" strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="2 2" />
      </g>

      {/* Card 2 */}
      <g transform="translate(105, 22) rotate(-5)">
        <rect width="110" height="155" rx="8" fill="url(#inv-grad2)" stroke="#3053EC" strokeWidth="1.5" strokeOpacity="0.28" />
        <rect x="16" y="18" width="42" height="4" rx="2" fill="#3053EC" fillOpacity="0.22" />
        <rect x="16" y="28" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.12" />
        <rect x="16" y="36" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.12" />
        <rect x="16" y="44" width="64" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.1" />
        {/* Badge */}
        <rect x="62" y="14" width="32" height="10" rx="5" fill="#3053EC" fillOpacity="0.08" stroke="#3053EC" strokeWidth="0.8" strokeOpacity="0.2" />
      </g>

      {/* Card 1 -- front invoice (hero) */}
      <g transform="translate(50, 35) rotate(-10)">
        <rect width="110" height="155" rx="8" fill="white" stroke="#3053EC" strokeWidth="1.5" strokeOpacity="0.35" />
        {/* Logo dot */}
        <circle cx="24" cy="24" r="5" fill="#3053EC" fillOpacity="0.15" />
        {/* Title */}
        <rect x="34" y="20" width="48" height="5" rx="2.5" fill="#3053EC" fillOpacity="0.3" />
        {/* Info lines */}
        <rect x="16" y="36" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.15" />
        <rect x="16" y="44" width="78" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.15" />
        <rect x="16" y="52" width="54" height="3" rx="1.5" fill="#3053EC" fillOpacity="0.12" />
        {/* Table header */}
        <line x1="16" y1="68" x2="94" y2="68" stroke="#3053EC" strokeWidth="1" strokeOpacity="0.2" />
        {/* Table rows */}
        <rect x="16" y="74" width="78" height="2.5" rx="1.25" fill="#3053EC" fillOpacity="0.08" />
        <rect x="16" y="82" width="78" height="2.5" rx="1.25" fill="#3053EC" fillOpacity="0.08" />
        <rect x="16" y="90" width="78" height="2.5" rx="1.25" fill="#3053EC" fillOpacity="0.08" />
        <rect x="16" y="98" width="78" height="2.5" rx="1.25" fill="#3053EC" fillOpacity="0.08" />
        {/* Table footer line */}
        <line x1="16" y1="108" x2="94" y2="108" stroke="#3053EC" strokeWidth="1" strokeOpacity="0.2" />
        {/* Total */}
        <rect x="56" y="115" width="38" height="5" rx="2.5" fill="#3053EC" fillOpacity="0.25" />
        {/* Blue accent bar */}
        <rect x="0" y="0" width="110" height="6" rx="8" fill="#3053EC" fillOpacity="0.06" />
        <rect x="0" y="3" width="110" height="3" fill="white" />
      </g>
    </svg>
  );
}

/** Card 2 -- Estimates: contract document with pen and signature */
function EstimatesIllustration() {
  return (
    <svg viewBox="0 0 400 250" fill="none" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="est-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Main contract document */}
      <g transform="translate(100, 10)">
        <rect width="200" height="230" rx="10" fill="white" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.25" />
        {/* Purple accent stripe at top */}
        <rect width="200" height="8" rx="10" fill="#7C3AED" fillOpacity="0.08" />
        <rect y="5" width="200" height="3" fill="white" />

        {/* "CONTRACT" header */}
        <rect x="24" y="22" width="70" height="6" rx="3" fill="#7C3AED" fillOpacity="0.25" />
        {/* Horizontal rule */}
        <line x1="24" y1="38" x2="176" y2="38" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.15" />

        {/* Paragraph block 1 */}
        <rect x="24" y="48" width="152" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.15" />
        <rect x="24" y="56" width="152" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.15" />
        <rect x="24" y="64" width="120" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.12" />

        {/* Section heading */}
        <rect x="24" y="80" width="60" height="4" rx="2" fill="#7C3AED" fillOpacity="0.18" />

        {/* Paragraph block 2 */}
        <rect x="24" y="92" width="152" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.15" />
        <rect x="24" y="100" width="152" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.15" />
        <rect x="24" y="108" width="140" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.12" />
        <rect x="24" y="116" width="152" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.12" />

        {/* Checkbox items */}
        <rect x="24" y="132" width="10" height="10" rx="2" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.2" fill="#7C3AED" fillOpacity="0.04" />
        <path d="M26 137L28.5 139.5L32 135" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="40" y="135" width="80" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.12" />

        <rect x="24" y="150" width="10" height="10" rx="2" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.2" fill="#7C3AED" fillOpacity="0.04" />
        <path d="M26 155L28.5 157.5L32 153" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="40" y="153" width="96" height="3" rx="1.5" fill="#6a6a84" fillOpacity="0.12" />

        {/* Signature section */}
        <line x1="24" y1="178" x2="176" y2="178" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.12" />

        {/* Signature 1 */}
        <path d="M30 198C38 190 48 200 58 193S74 186 84 195" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
        <line x1="24" y1="205" x2="90" y2="205" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
        <rect x="24" y="210" width="40" height="2.5" rx="1.25" fill="#6a6a84" fillOpacity="0.1" />

        {/* Signature 2 */}
        <path d="M120 196C128 190 136 199 146 193S158 188 166 196" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
        <line x1="110" y1="205" x2="176" y2="205" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
        <rect x="110" y="210" width="40" height="2.5" rx="1.25" fill="#6a6a84" fillOpacity="0.1" />
      </g>

      {/* Floating pen element */}
      <g transform="translate(320, 30) rotate(25)">
        <rect x="-4" y="0" width="8" height="60" rx="3" fill="#7C3AED" fillOpacity="0.1" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.25" />
        <polygon points="0,60 -4,60 -3,70 3,70 4,60" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.2" />
        <rect x="-4" y="0" width="8" height="12" rx="3" fill="#7C3AED" fillOpacity="0.06" />
      </g>

      {/* Decorative dots */}
      <circle cx="65" cy="40" r="3" fill="#7C3AED" fillOpacity="0.08" />
      <circle cx="75" cy="55" r="2" fill="#7C3AED" fillOpacity="0.06" />
      <circle cx="340" cy="200" r="4" fill="#7C3AED" fillOpacity="0.08" />
      <circle cx="355" cy="180" r="2" fill="#7C3AED" fillOpacity="0.05" />
    </svg>
  );
}

/** Card 3 -- Expenses: premium bar chart with trend line */
function ExpensesIllustration() {
  const bars = [
    { x: 45, h: 55, opacity: 0.14 },
    { x: 85, h: 72, opacity: 0.17 },
    { x: 125, h: 48, opacity: 0.14 },
    { x: 165, h: 88, opacity: 0.2 },
    { x: 205, h: 76, opacity: 0.18 },
    { x: 245, h: 105, opacity: 0.22 },
    { x: 285, h: 120, opacity: 0.26 },
    { x: 325, h: 98, opacity: 0.2 },
  ];
  const baseY = 210;

  return (
    <svg viewBox="0 0 400 250" fill="none" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="exp-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#33e7a1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#33e7a1" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="exp-trend-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#33e7a1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#33e7a1" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[50, 90, 130, 170, 210].map((y) => (
        <line key={y} x1="30" y1={y} x2="370" y2={y} stroke="#6a6a84" strokeWidth="0.5" strokeOpacity={y === 210 ? 0.2 : 0.1} />
      ))}

      {/* Y-axis labels */}
      <text x="24" y="54" fontSize="9" fill="#6a6a84" fillOpacity="0.45" textAnchor="end" fontFamily="Inter, system-ui">$4k</text>
      <text x="24" y="94" fontSize="9" fill="#6a6a84" fillOpacity="0.45" textAnchor="end" fontFamily="Inter, system-ui">$3k</text>
      <text x="24" y="134" fontSize="9" fill="#6a6a84" fillOpacity="0.45" textAnchor="end" fontFamily="Inter, system-ui">$2k</text>
      <text x="24" y="174" fontSize="9" fill="#6a6a84" fillOpacity="0.45" textAnchor="end" fontFamily="Inter, system-ui">$1k</text>
      <text x="24" y="214" fontSize="9" fill="#6a6a84" fillOpacity="0.45" textAnchor="end" fontFamily="Inter, system-ui">$0</text>

      {/* Bars */}
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={baseY - bar.h}
          width="26"
          height={bar.h}
          rx="5"
          fill="#3053EC"
          fillOpacity={bar.opacity}
        />
      ))}

      {/* Trend area fill */}
      <path
        d="M58 180C85 170 110 178 138 162S180 135 218 142S265 110 298 92L338 108L338 210H58Z"
        fill="url(#exp-trend-fill)"
      />

      {/* Profit trend line (green) */}
      <path
        d="M58 180C85 170 110 178 138 162S180 135 218 142S265 110 298 92L338 108"
        stroke="#33e7a1"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Data points on trend */}
      <circle cx="58" cy="180" r="4" fill="white" stroke="#33e7a1" strokeWidth="2" />
      <circle cx="138" cy="162" r="4" fill="white" stroke="#33e7a1" strokeWidth="2" />
      <circle cx="218" cy="142" r="4" fill="white" stroke="#33e7a1" strokeWidth="2" />
      <circle cx="298" cy="92" r="4" fill="white" stroke="#33e7a1" strokeWidth="2" />
      <circle cx="338" cy="108" r="4" fill="white" stroke="#33e7a1" strokeWidth="2" />

      {/* Tooltip on highest point */}
      <g transform="translate(298, 68)">
        <rect x="-24" y="-14" width="48" height="18" rx="6" fill="#151515" fillOpacity="0.85" />
        <text x="0" y="-2" fontSize="9" fill="white" textAnchor="middle" fontWeight="600" fontFamily="Inter, system-ui">$3.2k</text>
      </g>
    </svg>
  );
}

/** Card 4 -- AI & Templates: grid of template thumbnails with sparkle overlay */
function AITemplatesIllustration() {
  const templateColors = [
    { fill: "#3053EC", accent: "#3053EC" },
    { fill: "#7C3AED", accent: "#7C3AED" },
    { fill: "#10b981", accent: "#10b981" },
    { fill: "#f59e0b", accent: "#f59e0b" },
    { fill: "#ef4444", accent: "#ef4444" },
    { fill: "#6366f1", accent: "#6366f1" },
  ];

  return (
    <svg viewBox="0 0 400 250" fill="none" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ai-glow" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Template grid -- 3x2 */}
      {templateColors.map((color, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 30 + col * 120;
        const y = 10 + row * 120;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Page */}
            <rect
              width="100"
              height="108"
              rx="6"
              fill="white"
              stroke={color.accent}
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
            {/* Color header stripe */}
            <rect width="100" height="18" rx="6" fill={color.fill} fillOpacity="0.1" />
            <rect y="12" width="100" height="6" fill={color.fill} fillOpacity="0.1" />
            <rect y="15" width="100" height="3" fill="white" />
            {/* Title bar in header */}
            <rect x="10" y="6" width="30" height="4" rx="2" fill={color.fill} fillOpacity="0.35" />
            {/* Logo circle */}
            <circle cx="82" cy="8" r="5" fill={color.fill} fillOpacity="0.12" />
            {/* Content lines */}
            <rect x="10" y="26" width="80" height="2.5" rx="1.25" fill="#6a6a84" fillOpacity="0.13" />
            <rect x="10" y="34" width="80" height="2.5" rx="1.25" fill="#6a6a84" fillOpacity="0.13" />
            <rect x="10" y="42" width="56" height="2.5" rx="1.25" fill="#6a6a84" fillOpacity="0.1" />
            {/* Table divider */}
            <line x1="10" y1="54" x2="90" y2="54" stroke="#6a6a84" strokeWidth="0.6" strokeOpacity="0.12" />
            {/* Table rows */}
            <rect x="10" y="60" width="80" height="2" rx="1" fill="#6a6a84" fillOpacity="0.08" />
            <rect x="10" y="68" width="80" height="2" rx="1" fill="#6a6a84" fillOpacity="0.08" />
            <rect x="10" y="76" width="80" height="2" rx="1" fill="#6a6a84" fillOpacity="0.08" />
            {/* Total */}
            <rect x="56" y="90" width="34" height="4" rx="2" fill={color.fill} fillOpacity="0.2" />
          </g>
        );
      })}

      {/* AI sparkle overlay (centered) */}
      <g transform="translate(200, 125)" opacity="0.6">
        {/* Glow circle */}
        <circle r="35" fill="url(#ai-glow)" />
        {/* Main sparkle */}
        <line x1="0" y1="-18" x2="0" y2="18" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
        <line x1="-18" y1="0" x2="18" y2="0" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
        <line x1="-12" y1="-12" x2="12" y2="12" stroke="#4F46E5" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.3" />
        <line x1="12" y1="-12" x2="-12" y2="12" stroke="#4F46E5" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.3" />
        {/* Smaller sparkles */}
        <circle cx="28" cy="-25" r="2" fill="#4F46E5" fillOpacity="0.25" />
        <circle cx="-30" cy="20" r="1.5" fill="#4F46E5" fillOpacity="0.2" />
        <g transform="translate(25, -22)">
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#4F46E5" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.3" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#4F46E5" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.3" />
        </g>
      </g>
    </svg>
  );
}

/* =============================================
   Feature card configuration
   ============================================= */

interface FeatureCardConfig {
  i18nKey: string;
  icon: React.ReactNode;
  arrowColor: string;
  illustration: React.ReactNode;
}

const featureCards: FeatureCardConfig[] = [
  {
    i18nKey: "features.items.documents",
    icon: <DocumentIcon />,
    arrowColor: "#3053EC",
    illustration: <InvoicesIllustration />,
  },
  {
    i18nKey: "features.items.estimates",
    icon: <EstimateIcon />,
    arrowColor: "#7C3AED",
    illustration: <EstimatesIllustration />,
  },
  {
    i18nKey: "features.items.expenses",
    icon: <ExpenseIcon />,
    arrowColor: "#33e7a1",
    illustration: <ExpensesIllustration />,
  },
  {
    i18nKey: "features.items.ai",
    icon: <AIIcon />,
    arrowColor: "#4F46E5",
    illustration: <AITemplatesIllustration />,
  },
];

/* =============================================
   Features Section Component
   ============================================= */

export default function Features({ lang }: { lang: Lang }) {
  return (
    <section
      id="features"
      className="bg-white"
      style={{ paddingBlockStart: 180, paddingBlockEnd: 180 }}
    >
      <div style={{ maxWidth: 1340, marginInline: "auto", paddingInline: 20 }}>
        {/* ── Section Header (centered, Onramper products__grid style) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
          style={{ margin: "0 auto 60px", maxWidth: 780, textAlign: "center" }}
        >
          <h3
            className="font-heading"
            style={{
              color: "#151515",
              marginBlockEnd: 40,
            }}
          >
            {t(lang, "features.title")}{" "}
            <span style={{ color: "#3053EC" }}>
              {t(lang, "features.titleHighlight")}
            </span>
          </h3>

          <p
            style={{
              maxWidth: 570,
              margin: "auto",
              color: "#6a6a84",
              fontSize: 24,
              letterSpacing: "-0.24px",
              lineHeight: "133%",
            }}
          >
            {t(lang, "features.subtitle")}
          </p>
        </motion.div>

        {/* ── Products Grid (2x2, Onramper style) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="features-grid"
        >
          {featureCards.map((card) => (
            <motion.div key={card.i18nKey} variants={cardVariants}>
              <div className="features-card">
                {/* Card header row: icon + title ... arrow */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBlockEnd: 15,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {card.icon}
                    <span className="features-card-title font-heading">
                      {t(lang, `${card.i18nKey}.title`)}
                    </span>
                  </div>
                  <ArrowLinkIcon color={card.arrowColor} />
                </div>

                {/* Description */}
                <p className="features-card-desc font-heading">
                  {t(lang, `${card.i18nKey}.description`)}
                </p>

                {/* Illustration -- fills remaining space, bleeds to edges */}
                <div className="features-card-illustration">
                  {card.illustration}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Centered CTA below grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBlockStart: 60, display: "flex", justifyContent: "center" }}
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button primary"
          >
            {t(lang, "features.cta")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ── Scoped styles with proper class selectors ── */}
      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 34px;
        }

        .features-card {
          background-color: #efeef3;
          border-radius: 16px;
          padding: 30px 36px;
          position: relative;
          overflow: hidden;
          min-height: 496px;
          display: flex;
          flex-direction: column;
        }

        .features-card-title {
          color: #151515;
          letter-spacing: -1.45px;
          font-size: 50px;
          line-height: 100%;
          font-weight: 500;
        }

        .features-card-desc {
          color: #151515;
          letter-spacing: -0.3px;
          max-width: 450px;
          font-size: 30px;
          line-height: 120%;
          font-weight: 400;
          margin: 0;
          margin-block-end: 25px;
        }

        .features-card-illustration {
          margin-block-start: auto;
          padding-block-start: 24px;
          margin-inline: -36px;
          margin-block-end: -30px;
        }

        @media (max-width: 991px) {
          #features {
            padding-block-start: 80px !important;
            padding-block-end: 80px !important;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .features-card-title {
            font-size: 36px;
            letter-spacing: -0.5px;
          }

          .features-card-desc {
            font-size: 22px;
          }

          .features-card {
            height: auto;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
