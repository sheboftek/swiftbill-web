"use client";

import { cn } from "@/lib/utils";

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black 20%, transparent 80%)",
      }}
    />
  );
}
