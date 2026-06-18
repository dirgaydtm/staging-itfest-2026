"use client";

import { ReactNode, useState } from "react";
import DashboardSideButtons, {
  DashboardTab,
} from "./DashboardSideButtons";
import { useDashboardTheme } from "./DashboardThemeContext";
import { dashboardBackground } from "./themes";
import Image from "next/image";
import BintangLeft from "@/assets/img/auth/bintangLeft.png";
import BintangRight from "@/assets/img/auth/bintangRight.png";
import UnionRight from "@/assets/img/userDashboard/information/UnionRight.png";
import UnionLeft from "@/assets/img/userDashboard/information/UnionLeft.png";
import BackgroundSparkles from "@/shared/components/layout/BackgroundSparkles";

type Props = {
  infoContent: ReactNode;
  submitContent: ReactNode;
  defaultTab?: DashboardTab;
};

const DashboardLayout = ({
  infoContent,
  submitContent,
  defaultTab = "info",
}: Props) => {
  const { theme, isRegistered } = useDashboardTheme();
  const [active, setActive] = useState<DashboardTab>(defaultTab);

  const visibleTab: DashboardTab =
    active === "submit" && !isRegistered ? "info" : active;

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden ${dashboardBackground}`}
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
      <Image 
        src={UnionLeft} 
        alt="Union Kiri" 
        className="absolute left-0 top-24"
      />
      <Image 
        src={UnionRight} 
        alt="Union Kanan" 
        className="absolute right-0 bottom-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
        style={{ background: theme.glowLeft }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2"
        style={{ background: theme.glowRight }}
      />

      <BackgroundSparkles />

      <div className="mycontainer relative pt-32 pb-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start items-center">
          <aside className="lg:w-64 w-full">
            <DashboardSideButtons active={visibleTab} onChange={setActive} />
          </aside>

          <main className="flex-1 w-full">
            {visibleTab === "info" ? infoContent : submitContent}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;