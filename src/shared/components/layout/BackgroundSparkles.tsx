"use client";

import React from "react";
import Image from "next/image";
import Sparkle from "@/assets/img/shared/sparkle.webp";

type Pos = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number;
  opacity: number;
};

const leftSparkles: Pos[] = [
  { top: "14%", left: "3%", size: 26, opacity: 0.7 },
  { top: "32%", left: "8%", size: 18, opacity: 0.5 },
  { top: "55%", left: "2%", size: 22, opacity: 0.6 },
  { top: "78%", left: "6%", size: 16, opacity: 0.5 },
  { bottom: "12%", left: "10%", size: 14, opacity: 0.45 },
];

const rightSparkles: Pos[] = [
  { top: "16%", right: "4%", size: 24, opacity: 0.65 },
  { top: "38%", right: "2%", size: 18, opacity: 0.5 },
  { top: "62%", right: "8%", size: 22, opacity: 0.6 },
  { top: "82%", right: "3%", size: 16, opacity: 0.5 },
  { bottom: "15%", right: "10%", size: 20, opacity: 0.55 },
];

const BackgroundSparkles: React.FC = () => {
  const renderOne = (s: Pos, key: string) => (
    <Image
      key={key}
      src={Sparkle}
      alt=""
      aria-hidden
      className="pointer-events-none absolute select-none"
      width={s.size}
      height={s.size}
      style={{
        top: s.top,
        left: s.left,
        right: s.right,
        bottom: s.bottom,
        opacity: s.opacity,
        width: s.size,
        height: s.size,
      }}
    />
  );

  return (
    <>
      {leftSparkles.map((s, i) => renderOne(s, `l-${i}`))}
      {rightSparkles.map((s, i) => renderOne(s, `r-${i}`))}
    </>
  );
};

export default BackgroundSparkles;