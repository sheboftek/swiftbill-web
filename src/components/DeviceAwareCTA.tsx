import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface DeviceAwareCTAProps {
  headline?: string;
  subtitle?: string;
  note?: string;
}

const APP_STORE_URL = "https://apps.apple.com/app/id6760855924";

function detectiOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /iPhone|iPad|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && "ontouchend" in document)
  );
}

function AppStoreBadge({ className }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Download on the App Store"
    >
      <svg
        viewBox="0 0 120 40"
        className="h-[48px] w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="40" rx="6" fill="#000" />
        {/* Apple logo */}
        <g fill="#fff" transform="translate(8, 7) scale(0.55)">
          <path d="M22.1 17.3c0-3.3 2.7-4.9 2.8-5-1.5-2.2-3.9-2.5-4.7-2.6-2-.2-3.9 1.2-4.9 1.2-1 0-2.6-1.2-4.2-1.1-2.2 0-4.2 1.3-5.3 3.2-2.3 3.9-.6 9.8 1.6 13 1.1 1.6 2.4 3.3 4 3.2 1.6-.1 2.2-1 4.2-1s2.5 1 4.2 1c1.7 0 2.9-1.6 4-3.2 1.2-1.8 1.7-3.6 1.8-3.7-.1 0-3.4-1.3-3.5-5.1zM18.9 7.4c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.9-3.8 1.9-.8.9-1.5 2.5-1.3 4 1.4.1 2.9-.7 3.8-1.8z" />
        </g>
        {/* "Download on the" text */}
        <text
          x="42"
          y="14"
          fill="#fff"
          fontFamily="Inter, -apple-system, system-ui, sans-serif"
          fontSize="5.2"
          fontWeight="400"
          letterSpacing="0.02em"
        >
          Download on the
        </text>
        {/* "App Store" text */}
        <text
          x="42"
          y="30"
          fill="#fff"
          fontFamily="Inter, -apple-system, system-ui, sans-serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="-0.01em"
        >
          App Store
        </text>
      </svg>
    </a>
  );
}

function QRCodePlaceholder() {
  const size = 21;
  const cellSize = 4;

  const finderPattern = (row: number, col: number): boolean => {
    // Top-left finder (0-6, 0-6)
    if (row <= 6 && col <= 6) {
      if (row === 0 || row === 6 || col === 0 || col === 6) return true;
      if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return true;
      return false;
    }
    // Top-right finder (0-6, 14-20)
    if (row <= 6 && col >= 14) {
      const c = col - 14;
      if (row === 0 || row === 6 || c === 0 || c === 6) return true;
      if (row >= 2 && row <= 4 && c >= 2 && c <= 4) return true;
      return false;
    }
    // Bottom-left finder (14-20, 0-6)
    if (row >= 14 && col <= 6) {
      const r = row - 14;
      if (r === 0 || r === 6 || col === 0 || col === 6) return true;
      if (r >= 2 && r <= 4 && col >= 2 && col <= 4) return true;
      return false;
    }
    return false;
  };

  const isTimingPattern = (row: number, col: number): boolean => {
    if (row === 6 && col > 7 && col < 13) return col % 2 === 0;
    if (col === 6 && row > 7 && row < 13) return row % 2 === 0;
    return false;
  };

  const isDataModule = (row: number, col: number): boolean => {
    const seed = (row * 31 + col * 17 + 42) % 100;
    return seed < 45;
  };

  const modules: boolean[][] = [];
  for (let r = 0; r < size; r++) {
    modules[r] = [];
    for (let c = 0; c < size; c++) {
      modules[r][c] =
        finderPattern(r, c) || isTimingPattern(r, c) || isDataModule(r, c);
    }
  }

  const totalSize = size * cellSize;

  return (
    <div
      className="inline-block rounded-lg bg-white p-2"
      style={{ lineHeight: 0 }}
    >
      <svg
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={totalSize} height={totalSize} fill="#FFFFFF" />
        {modules.map((row, r) =>
          row.map(
            (filled, c) =>
              filled && (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill="#000000"
                />
              ),
          ),
        )}
      </svg>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-white/20" />
        <div className="h-5 w-48 animate-pulse rounded-lg bg-white/15" />
        <div className="h-12 w-40 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}

export default function DeviceAwareCTA({
  headline = "Ready to get paid faster?",
  subtitle = "Free to start. No credit card required.",
  note,
}: DeviceAwareCTAProps) {
  const [isiOS, setIsiOS] = useState<boolean | null>(null);

  useEffect(() => {
    setIsiOS(detectiOS());
  }, []);

  if (isiOS === null) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-12 sm:px-10 sm:py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        {/* Headline */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {headline}
          </h2>
          <p className="text-lg text-blue-100">{subtitle}</p>
        </div>

        {isiOS ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 120,
              damping: 16,
            }}
          >
            <AppStoreBadge className="transition-transform duration-200 hover:scale-105" />
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 120,
              damping: 16,
            }}
          >
            <AppStoreBadge className="transition-transform duration-200 hover:scale-105" />

            <div className="flex flex-col items-center gap-3">
              <QRCodePlaceholder />
              <p className="text-sm font-medium text-blue-200">
                Scan to download
              </p>
            </div>
          </motion.div>
        )}

        {/* Note */}
        {note && <p className="text-sm text-blue-200/80">{note}</p>}
      </div>
    </motion.div>
  );
}
