"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Star from "@/assets/img/userDashboard/Star.webp";
import { dashboardBackground } from "@/feature/userDashboard/layout/themes";
import RegistrationBackground from "./RegistrationBackground";

interface SplitPanelLayoutProps {
  children: React.ReactNode;
}

const starBreathing: Variants = {
  animate: {
    filter: [
      "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
      "drop-shadow(0 0 25px rgba(255, 255, 255, 0.85))",
      "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
    ],
    scale: [1, 1.04, 1],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const SplitPanelLayout: React.FC<SplitPanelLayoutProps> = ({ children }) => {
  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 md:pt-28 lg:pt-32 pb-10 ${dashboardBackground}`}
    >
      <RegistrationBackground />

      <div className="relative mycontainer">
        <div className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto px-2 md:px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Panel form (kiri) */}
          <div className="rounded-2xl lg:rounded-l-2xl lg:rounded-r-none p-6 md:p-8 lg:p-10 min-h-[45vh] md:min-h-[50vh] flex flex-col border-2 border-white/10 bg-light-active-green/5 backdrop-blur-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)] lg:shadow-[-4px_0_24px_-4px_rgba(0,0,0,0.4),_0_8px_24px_-4px_rgba(0,0,0,0.3)]">
            {children}
          </div>

          <div className="hidden lg:flex lg:rounded-r-2xl lg:rounded-l-none p-8 lg:p-10 flex-col items-center justify-center gap-6 lg:gap-8 border-2 border-white/10 bg-light-active-green/5 backdrop-blur-xl shadow-[4px_0_24px_-4px_rgba(0,0,0,0.4),_0_8px_24px_-4px_rgba(0,0,0,0.3)]">
            <motion.div
              variants={starBreathing}
              animate="animate"
              className="flex items-center justify-center"
            >
              <Image
                src={Star}
                alt="IT FEST Star"
                priority
                draggable={false}
                className="w-32 md:w-40 lg:w-48 xl:w-56 h-auto"
              />
            </motion.div>

            <div className="text-center space-y-2">
              <h2 className="text-lg lg:text-xl xl:text-2xl font-bold font-leaguespartan text-white tracking-wide drop-shadow-md">
                Welcome to IT FEST!
              </h2>
              <p className="text-xs lg:text-sm xl:text-base font-leaguespartan leading-relaxed text-slate-200">
                Compete, Collaborate, and Win <br /> Together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitPanelLayout;