"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MagicCard({
  children,
  className,
  gradientFrom = "#3053EC",
  gradientTo = "#d7e866",
}: {
  children: ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-[#4c4c4f]/50 bg-[linear-gradient(32deg,#26262a_19.66%,rgba(38,38,43,0)_80.94%),#38383c] p-8 transition-all duration-300 hover:border-[#4c4c4f]",
        className
      )}
    >
      {/* Spotlight gradient that follows mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${gradientFrom}15, ${gradientTo}08, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
