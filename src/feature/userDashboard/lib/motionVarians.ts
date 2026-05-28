import { Variants, easeInOut, easeOut } from "framer-motion";

export const stackUpStagger: Variants = {
  hidden: (i: number = 0) => ({
    opacity: 0,
    y: 40,
    rotate: -2,
    scale: 0.96,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: easeOut,
    },
  }),
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: easeOut,
    },
  }),
};

export const slideInSkewLego: Variants = {
  hidden: (i: number = 0) => ({
    opacity: 0,
    x: 60,
    skewX: 6,
    scale: 0.95,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: easeInOut,
    },
  }),
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    skewX: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: easeInOut,
    },
  }),
};

export const floatDownSoft: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};
