"use client";

import {
  DashboardLayout,
  DashboardThemeProvider,
} from "@/feature/userDashboard/layout";
import InformationContainer from "@/feature/userDashboard/information/InformationContainer";

const DashboardPage = () => {
  return (
    <DashboardThemeProvider>
      <DashboardLayout
        infoContent={<InformationContainer />}
        submitContent={
          <div className="font-leaguespartan text-light-blue text-center py-20">
            Submit Your Work — dikerjakan oleh teman.
          </div>
        }
      />
    </DashboardThemeProvider>
  );
};

export default DashboardPage;