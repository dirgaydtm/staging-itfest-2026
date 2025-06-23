"use client";

import React, { useState } from "react";
import { useTeamProfile } from "../hooks/useTeamProfile";
import SideButtons from "../components/information/SideButton";
import Deadline from "../components/information/Deadline";
import Announcement from "../components/information/Announcement";
import TeamProfile from "../components/information/TeamProfile";
import Guidebook from "../components/information/Guidebook";
import SubmissionHeader from "../components/submission/SubmissionHeader";
import SubmissionStages from "../components/submission/SubmissionStages";
import SubmissionMessage from "../components/submission/SubmissionMessage";
import { useSubmissions } from "../hooks/useSubmission";

const DashboardContainer = () => {
  const {
    data: teamData,
    loading: teamLoading,
    error: teamError,
  } = useTeamProfile();
  const {
    data: submissionsData,
    loading: submissionsLoading,
    error: submissionsError,
  } = useSubmissions();

  const [active, setActive] = useState<"info" | "submit">("info");
  const isNotRegistered = teamData?.competition_category === "Not Registered";

  if (teamLoading || (active === "submit" && submissionsLoading)) {
    return (
      <div className="relative mycontainer  pt-40">
        <div className="text-center py-16 text-lg font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (teamError || (active === "submit" && submissionsError)) {
    return (
      <div className="relative mycontainer pt-40">
        <div className="text-center py-16 text-lg font-semibold text-red-400">
          Error loading data. Please try again later.
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="relative mycontainer pt-40">
        <div className="text-center py-16 text-lg font-semibold">
          No data found.
        </div>
      </div>
    );
  }

  let currentStatus = "Loading submission data...";
  if (submissionsData) {
    if (submissionsData.current_stage === "") {
      currentStatus = submissionsData.payment_status;
    } else {
      currentStatus = `${submissionsData.stages.map(
        (item) => item.status_submission
      )}`;
    }
  }

  return (
    <div className="mycontainer relative lg:h-screen h-fit pt-40 pb-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-start items-center ">
        <section className="w-full lg:w-2xs xl:w-full max-w-11/12">
          <SideButtons
            active={active}
            onChange={setActive}
            disabledSubmit={isNotRegistered}
          />
        </section>

        <main className="flex flex-col gap-6 ">
          {active === "info" ? (
            <>
              <div className="flex flex-col md:flex-row gap-6">
                <section className="w-full md:w-1/2">
                  <Deadline deadline={teamData.deadline} />
                </section>

                <section className="w-full md:w-1/2">
                  <Guidebook
                    competitionCategory={teamData.competition_category}
                  />
                </section>
              </div>

              {!isNotRegistered && (
                <div className="flex flex-col lg:flex-row gap-6">
                  <section className="w-full lg:w-2/3">
                    <TeamProfile profile={teamData} />
                  </section>

                  <section className="w-full lg:w-1/3">
                    <Announcement />
                  </section>
                </div>
              )}
            </>
          ) : (
            <>
              <section className="xl:w-full lg:max-w-11/12">
                <SubmissionHeader
                  competitionCategory={teamData.competition_category}
                  status={currentStatus}
                />
              </section>

              <section className="xl:w-full lg:max-w-11/12">
                {submissionsData && (
                  <SubmissionStages submissionsData={submissionsData} />
                )}
              </section>
              <section className="xl:w-full lg:max-w-11/12">
                <SubmissionMessage leaderName={teamData.leader_name} />
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;
