"use client";

import { ReactNode, useState } from "react";
import DashboardSideButtons, { DashboardTab } from "./DashboardSideButtons";
import { useDashboardTheme } from "./DashboardThemeContext";
import { dashboardBackground } from "./themes";

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
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 h-[400px] w-[400px] md:h-[600px] md:w-[600px] lg:h-[800px] lg:w-[800px] rounded-full opacity-60 blur-[120px]"
        style={{ background: theme.glowLeft }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-0 h-[400px] w-[400px] md:h-[600px] md:w-[600px] lg:h-[800px] lg:w-[800px] rounded-full opacity-60 blur-[120px]"
        style={{ background: theme.glowRight }}
      />

      <div className="mycontainer relative pt-24 md:pt-28 lg:pt-32 pb-10">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:items-start items-stretch">
          <aside className="w-full lg:w-64 lg:shrink-0">
            <DashboardSideButtons active={visibleTab} onChange={setActive} />
          </aside>

          <main className="flex-1 w-full min-w-0">
            {visibleTab === "info" ? infoContent : submitContent}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
