"use client";

import { useTeamProfile } from "@/feature/userDashboard/hooks/useTeamProfile";
import { useSubmissions } from "@/feature/userDashboard/hooks/useSubmission";
import { mapCategoryToKey } from "@/feature/userDashboard/layout/themes";
import {
  DashboardLayout,
  DashboardThemeProvider,
} from "@/feature/userDashboard/layout";
import InformationContainer from "@/feature/userDashboard/information/InformationContainer";
import { SubmissionView } from "@/feature/userDashboard/submission/SubmissionView";

const DashboardPage = () => {
  const { data: teamData, loading: profileLoading } = useTeamProfile();
  const { data: submissionsData } = useSubmissions();

  if (profileLoading) {
    return (
      <div className="bg-darker-blue h-screen w-full flex items-center justify-center">
        <p className="text-light-blue font-leaguespartan text-xl">Loading...</p>
      </div>
    );
  }

  const competitionKey = teamData
    ? mapCategoryToKey(teamData.competition_category)
    : null;

  return (
    <DashboardThemeProvider initialCompetition={competitionKey}>
      <DashboardLayout
        infoContent={<InformationContainer teamData={teamData} />}
        submitContent={
          teamData ? (
            <SubmissionView
              teamData={teamData}
              submissionsData={submissionsData}
            />
          ) : (
            <div className="font-leaguespartan text-light-blue text-center py-20">
              Submit Your Work
            </div>
          )
        }
      />
    </DashboardThemeProvider>
  );
};

export default DashboardPage;