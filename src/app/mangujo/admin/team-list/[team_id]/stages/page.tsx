import TeamStagesContainer from "@/feature/_admin/teamlist/container/TeamStagesContainer";
import { DashboardThemeProvider } from "@/feature/userDashboard/layout";
import React from "react";

const page = () => {
  return <DashboardThemeProvider>
    <TeamStagesContainer />
  </DashboardThemeProvider>;
};

export default page;
