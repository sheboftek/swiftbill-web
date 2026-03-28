"use client";

import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "#3053EC",
  colorTo = "#d7e866",
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={{
        overflow: "hidden",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "1px",
        borderRadius: "inherit",
      }}
    >
      <div
        className="absolute inset-[-200%] animate-[border-beam-spin_var(--duration)_linear_infinite]"
        style={{
          "--duration": `${duration}s`,
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 10%, ${colorTo} 20%, transparent 30%)`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties}
      />
    </div>
  );
}
