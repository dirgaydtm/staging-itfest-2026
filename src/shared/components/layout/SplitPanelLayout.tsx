"use client";

import React from "react";
import Image from "next/image";
import Star from "@/assets/img/userDashboard/Star.webp";
import Sparkle from "@/assets/img/shared/sparkle.webp";

interface SplitPanelLayoutProps {
  children: React.ReactNode;
}

const sparkles: Array<{
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number;
  opacity: number;
}> = [
  { top: "8%", left: "4%", size: 28, opacity: 0.7 },
  { top: "22%", left: "10%", size: 18, opacity: 0.5 },
  { top: "55%", left: "2%", size: 22, opacity: 0.6 },
  { top: "78%", left: "8%", size: 16, opacity: 0.5 },
  { top: "12%", right: "5%", size: 24, opacity: 0.6 },
  { top: "40%", right: "3%", size: 18, opacity: 0.5 },
  { top: "70%", right: "9%", size: 26, opacity: 0.7 },
  { bottom: "18%", right: "4%", size: 20, opacity: 0.55 },
  { bottom: "30%", left: "12%", size: 14, opacity: 0.45 },
];

const SplitPanelLayout: React.FC<SplitPanelLayoutProps> = ({ children }) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20 md:pt-24 pb-10 bg-[radial-gradient(ellipse_at_top,_var(--color-normal-green)_0%,_var(--color-dark-green)_45%,_var(--color-darker-green)_100%)]">
      {/* Curved bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,_var(--color-normal-blue)/45_0%,_var(--color-normal-blue)/15_35%,_transparent_70%)]"
      />

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <Image
          key={i}
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
      ))}

      {/* Content */}
      <div className="relative mycontainer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* Left panel */}
          <div className="rounded-2xl p-6 md:p-8 lg:p-10 min-h-[60vh] flex flex-col border-[0.5px] border-light-blue bg-light-active-green/10 backdrop-blur-md">
            {children}
          </div>

          {/* Right panel — hidden on mobile */}
          <div className="hidden md:flex rounded-2xl p-10 flex-col items-center justify-center gap-8 border-[0.5px] border-light-blue bg-light-active-green/10 backdrop-blur-md">
            <Image
              src={Star}
              alt="ITFEST Star"
              priority
              className="w-40 md:w-48 lg:w-56 xl:w-64 h-auto"
            />
            <div className="text-center space-y-2">
              <h2 className="font-changa font-bold text-2xl lg:text-3xl text-light-green">
                Welcome to ITFEST!
              </h2>
              <p className="font-changa text-base lg:text-lg text-light-green">
                Compete, Collaborate, and Win Together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitPanelLayout;