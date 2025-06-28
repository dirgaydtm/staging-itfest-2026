"use client";

import React, { useState } from "react";
import TeamListTable from "../components/TeamListTable";
import TeamListHeader from "../components/TeamListHeader";
import { useTeamDetails } from "../hooks/useTeamDetailsData";

const TeamListContainer = () => {
  const { teamData, loading, error } = useTeamDetails();

  const [competitionFilter, setCompetitionFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");

  const handleCompetitionFilterChange = (filter: string) => {
    setCompetitionFilter(filter);
    setStageFilter("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="px-4 font-changa sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full">
      <div className="mb-8">
        <TeamListHeader />
      </div>

      <TeamListTable
        teamData={teamData}
        currentCompetitionFilter={competitionFilter}
        currentStageFilter={stageFilter}
        onCompetitionFilterChange={handleCompetitionFilterChange}
        onStageFilterChange={setStageFilter}
      />
    </section>
  );
};

export default TeamListContainer;
