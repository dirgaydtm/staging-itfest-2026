"use client";

import React from "react";
import Image from "next/image";
import Star from "@/assets/img/userDashboard/Star.webp";
import { dashboardBackground } from "@/feature/userDashboard/layout/themes";
import RegistrationBackground from "./RegistrationBackground";
import { motion } from "framer-motion";

interface SplitPanelLayoutProps {
  children: React.ReactNode;
}

const SplitPanelLayout: React.FC<SplitPanelLayoutProps> = ({ children }) => {
  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-24 md:pt-28 lg:pt-32 pb-10 ${dashboardBackground}`}
    >
      <RegistrationBackground />

      <div className="relative mycontainer">
        <div className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto px-2 md:px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Panel form — entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl lg:rounded-l-2xl lg:rounded-r-none p-6 md:p-8 lg:p-10 min-h-[45vh] md:min-h-[50vh] flex flex-col border-[0.5px] border-light-blue bg-light-active-green/15 backdrop-blur-md"
          >
            {children}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            className="hidden lg:flex lg:rounded-r-2xl lg:rounded-l-none p-8 lg:p-10 flex-col items-center justify-center gap-6 lg:gap-8 border-[0.5px] border-light-blue bg-light-active-green/15 backdrop-blur-md"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SplitPanelLayout;