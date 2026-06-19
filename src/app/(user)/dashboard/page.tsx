"use client";

import {
  DashboardLayout,
  DashboardThemeProvider,
} from "@/feature/userDashboard/layout";
import InformationContainer from "@/feature/userDashboard/information/InformationContainer";
import { SubmissionView } from "@/feature/userDashboard/submission/SubmissionView";
import { TeamProfileResponse } from "@/feature/userDashboard/types/teamProfile";

const mockTeamData: TeamProfileResponse = {
  leader_name: "Alya Putri",
  student_number: "202310045",
  competition_category: "BP",
  deadline: "2026-07-15T23:59:59+07:00",
  team_name: "Nebula Innovators",
  members: [
    { full_name: "Raka Satria", student_number: "202310046" },
    { full_name: "Dina Maharani", student_number: "202310047" },
    { full_name: "Fauzan Rizky", student_number: "202310048" },
  ],
};

const DashboardPage = () => {
  return (
    <DashboardThemeProvider initialCompetition="bp">
      <DashboardLayout
        infoContent={<InformationContainer />}
        submitContent={<SubmissionView teamData={mockTeamData} submissionsData={null} />}
      />
    </DashboardThemeProvider>
  );
};

export default DashboardPage;