"use client";

import React from "react";
import Image from "next/image";
import BintangLeft from "@/assets/img/auth/bintangLeft.png";
import BintangRight from "@/assets/img/auth/bintangRight.png";
import Star from "@/assets/img/userDashboard/Star.webp";
import {
  dashboardBackground,
  dashboardThemes,
} from "@/feature/userDashboard/layout/themes";
import BackgroundSparkles from "./BackgroundSparkles";

interface SplitPanelLayoutProps {
  children: React.ReactNode;
}

const theme = dashboardThemes.uiux;

const SplitPanelLayout: React.FC<SplitPanelLayoutProps> = ({ children }) => {
  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden pt-24 md:pt-28 lg:pt-32 pb-10 ${dashboardBackground}`}
    >
      <Image 
        src={BintangLeft} 
        alt="Hiasan Kiri" 
        className="absolute left-0"
      />
      <Image 
        src={BintangRight} 
        alt="Hiasan Kanan" 
        className="absolute right-0"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1800px] h-[400px] md:h-[700px] rounded-[100%] border-t-[8px] border-sky-200/40 bg-gradient-to-b from-sky-400/10 to-transparent blur-md pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-1/2"
        style={{ background: theme.glowLeft }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 translate-x-1/2"
        style={{ background: theme.glowRight }}
      />

      <BackgroundSparkles />

      <div className="relative mycontainer">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Panel kiri */}
          <div className="rounded-2xl md:rounded-l-2xl md:rounded-r-none p-6 md:p-8 lg:p-10 min-h-[45vh] md:min-h-[50vh] flex flex-col border-[0.5px] border-light-blue bg-light-active-green/15 backdrop-blur-md">
            {children}
          </div>

          {/* Panel kanan */}
          <div className="hidden md:flex md:rounded-r-2xl md:rounded-l-none p-8 lg:p-10 flex-col items-center justify-center gap-6 lg:gap-8 border-[0.5px] border-light-blue bg-light-active-green/15 backdrop-blur-md">
            <Image
              src={Star}
              alt="ITFEST Star"
              priority
              className="w-32 md:w-40 lg:w-48 xl:w-56 h-auto"
            />
            <div className="text-center space-y-2">
              <h2 className="font-leaguespartan font-bold text-2xl lg:text-3xl text-light-green">
                Welcome to ITFEST!
              </h2>
              <p className="font-leaguespartan text-base lg:text-lg text-light-green">
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
