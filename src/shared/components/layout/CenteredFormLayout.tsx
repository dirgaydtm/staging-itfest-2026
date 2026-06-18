"use client";

import React from "react";
import {
  dashboardBackground,
  dashboardThemes,
} from "@/feature/userDashboard/layout/themes";
import BackgroundSparkles from "./BackgroundSparkles";

interface CenteredFormLayoutProps {
  children: React.ReactNode;
}

const theme = dashboardThemes.uiux;

const CenteredFormLayout: React.FC<CenteredFormLayoutProps> = ({ children }) => {
  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden pt-24 md:pt-28 lg:pt-32 pb-10 ${dashboardBackground}`}
    >
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
        <div className="w-full max-w-md mx-auto px-2 md:px-4">
          <div className="rounded-2xl p-6 md:p-8 lg:p-10 border-[0.5px] border-light-blue bg-light-active-green/15 backdrop-blur-md flex flex-col gap-6">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CenteredFormLayout;