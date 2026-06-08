"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  /** Stagger delay index — each unit adds 0.12s */
  delay?: number;
  className?: string;
  /** Fraction of element visible before triggering (0–1) */
  amount?: number;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d * 0.12 },
  }),
};

/**
 * `<FadeUp>` — wraps children in a fade-in + slide-up enter animation
 * triggered when the element enters the viewport.
 *
 * @example
 * <FadeUp delay={1} className="mt-4">
 *   <p>Hello</p>
 * </FadeUp>
 */
export default function FadeUp({
  children,
  delay = 0,
  className,
  amount = 0.3,
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
