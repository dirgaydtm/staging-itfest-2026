"use client";
import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

interface HoverSpringProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hoverScale?: number;
  tapScale?: number;
}

/**
 * `<HoverSpring>` — wraps children with a spring-stiffness scale animation on hover and tap.
 *
 * @example
 * <HoverSpring>
 *   <button>Click me</button>
 * </HoverSpring>
 */
export default function HoverSpring({
  children,
  className,
  style,
  hoverScale = 1.15,
  tapScale = 0.95,
}: HoverSpringProps) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}
