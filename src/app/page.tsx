"use client";

import {
  DashboardLayout,
  DashboardThemeProvider,
} from "@/feature/userDashboard/layout";

export default function Home() {
  return (
    <DashboardThemeProvider>
      {/* coba juga: initialCompetition="bp" atau "dml" atau "uiux" */}
      <DashboardLayout
        infoContent={
          <div className="text-white p-8 bg-white/5 rounded-2xl">
            Konten Information (dummy)
          </div>
        }
        submitContent={
          <div className="text-white p-8 bg-white/5 rounded-2xl">
            Konten Submit (dummy)
          </div>
        }
      />
    </DashboardThemeProvider>
  );
}