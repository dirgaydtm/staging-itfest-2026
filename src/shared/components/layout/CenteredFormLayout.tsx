"use client";

import React from "react";
import { dashboardBackground } from "@/feature/userDashboard/layout/themes";
import RegistrationBackground from "./RegistrationBackground";

interface CenteredFormLayoutProps {
  children: React.ReactNode;
}

const CenteredFormLayout: React.FC<CenteredFormLayoutProps> = ({ children }) => {
  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 pt-28 md:pt-32 lg:pt-36 pb-10 ${dashboardBackground}`}
    >
      <RegistrationBackground />

      <div className="relative w-full max-w-md rounded-2xl p-6 md:p-8 border-2 border-white/10 bg-light-active-green/5 backdrop-blur-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)] flex flex-col gap-5">
        {children}
      </div>
    </section>
  );
};

export default CenteredFormLayout;