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

      <div className="relative w-full max-w-md rounded-2xl p-6 md:p-8 border-[0.5px] border-light-blue bg-light-active-green/15 backdrop-blur-md flex flex-col gap-5">
        {children}
      </div>
    </section>
  );
};

export default CenteredFormLayout;