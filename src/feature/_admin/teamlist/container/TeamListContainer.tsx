"use client";

import React, { useState } from "react";
import TeamListTable from "../components/TeamListTable";
import TeamListHeader from "../components/TeamListHeader";
import { useParticipant } from "../../dashboard/hooks/useParticipantData";
import { useTeamDetails } from "../hooks/useTeamDetailsData";
import { Button } from "@/shared/components/ui/Button";

const TeamListContainer = () => {
  const { totalAll } = useParticipant();
  const { teamData, loading, error, refetch } = useTeamDetails();
  const [currentFilter, setCurrentFilter] = useState("");

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="px-4 font-changa sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full">
      <div className="mb-8">
        <TeamListHeader />
      </div>

      <TeamListTable totalAll={totalAll} teamData={teamData} currentFilter={currentFilter} onFilterChange={handleFilterChange} />
    </section>
  );
};

export default TeamListContainer;