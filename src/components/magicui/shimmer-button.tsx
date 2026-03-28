"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#d7e866",
  background = "#3053EC",
  ...props
}: {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  background?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(48,83,236,0.3)]",
        className
      )}
      style={{ background }}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(120deg, transparent 30%, ${shimmerColor}30 50%, transparent 70%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
