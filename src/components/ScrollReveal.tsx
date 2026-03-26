import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

function getOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: 24 };
    case "down":
      return { x: 0, y: -24 };
    case "left":
      return { x: 24, y: 0 };
    case "right":
      return { x: -24, y: 0 };
  }
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getOffset(direction);

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
