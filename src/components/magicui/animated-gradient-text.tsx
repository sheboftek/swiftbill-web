"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-[#3053EC] via-[#7C3AED] to-[#3053EC] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-shift_4s_ease_infinite]",
        className
      )}
    >
      {children}
    </span>
  );
}
