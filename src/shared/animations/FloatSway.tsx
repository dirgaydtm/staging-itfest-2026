"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatSwayProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

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
