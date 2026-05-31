"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatSwayProps {
  children: ReactNode;
  className?: string;
  /** Animation duration in seconds (default: 5) */
  duration?: number;
}

/**
 * `<FloatSway>` — wraps children in a continuous floating + swaying idle animation.
 * Moves on y, x, and applies a subtle rotation to feel organic and alive.
 *
 * @example
 * <FloatSway>
 *   <Image src={logo} alt="logo" />
 * </FloatSway>
 */
export default function FloatSway({
  children,
  className,
  duration = 5,
}: FloatSwayProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -14, -6, -16, 0],
        x: [0, 5, -4, 6, 0],
        rotate: [0, 1.8, -1.2, 1.5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
