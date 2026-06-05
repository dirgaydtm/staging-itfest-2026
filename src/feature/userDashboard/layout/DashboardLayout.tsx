"use client";

import { ReactNode, useState } from "react";
import DashboardSideButtons, { DashboardTab } from "./DashboardSideButtons";
import { useDashboardTheme } from "./DashboardThemeContext";

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
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: theme.background }}
    >
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
