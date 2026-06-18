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
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 pt-28 md:pt-32 lg:pt-36 pb-10 ${dashboardBackground}`}
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

      <div className="relative w-full max-w-md flex flex-col gap-5">
        {children}
      </div>
    </section>
  );
};

export default CenteredFormLayout;