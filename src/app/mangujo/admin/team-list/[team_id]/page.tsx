import TeamInformationContainer from "@/feature/_admin/teamlist/container/TeamInformationContainer";
import { DashboardThemeProvider } from "@/feature/userDashboard/layout";
import React from "react";

const page = () => {
  return <DashboardThemeProvider>
    <TeamInformationContainer />
  </DashboardThemeProvider>;
};

export default page;
