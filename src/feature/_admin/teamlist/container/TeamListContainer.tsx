"use client";

import React, { useState } from "react";
import TeamListTable from "../components/TeamListTable";
import TeamListHeader from "../components/TeamListHeader";
import { useTeamDetails } from "../hooks/useTeamDetailsData";
import { useAuth } from "@/shared/hooks/useAuth";

const TeamListContainer = () => {
  const { teamData, loading, error } = useTeamDetails();
  const { user } = useAuth();

  const [competitionFilter, setCompetitionFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");

  const handleCompetitionFilterChange = (filter: string) => {
    setCompetitionFilter(filter);
    setStageFilter("");
  };

  // Get role-based label for header
  const getRoleLabel = () => {
    if (!user?.role_id) return "";
    switch (user.role_id) {
      case 3:
        return "UI/UX";
      case 4:
        return "Business Plan";
      case 5:
        return "Digital Media Learning";
      default:
        return "";
    }
  };

  const roleLabel = getRoleLabel();

  // State Loading yang diselaraskan dengan estetika admin dashboard
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center py-24">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/20 border-t-white mx-auto"></div>
          <p className="text-white/60 font-leaguespartan text-sm tracking-wide">
            Loading teams data...
          </p>
        </div>
      </div>
    );
  }

  // State Error dengan style alert transparan kemerahan
  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center text-red-400 font-medium text-sm mt-10">
         Error: {error}
      </div>
    );
  }

  return (
    // Menggunakan w-full, penyesuaian gap vertikal (space-y-8), dan memastikan teks putih kontras
    <section className="px-4 font-leaguespartan sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full w-full text-white">
      
      {/* Wrapper Header dengan jarak vertikal yang tegas */}
      <div className="mb-8 w-full">
        <TeamListHeader />
        {roleLabel && (
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-blue-300 text-sm font-medium text-center">
              📋 Viewing <span className="font-bold">{roleLabel}</span> teams only
            </p>
          </div>
        )}
      </div>

      {/* Tabel Utama & Filter Bar */}
      <div className="w-full transition-all duration-300">
        <TeamListTable
          teamData={teamData}
          currentCompetitionFilter={competitionFilter}
          currentStageFilter={stageFilter}
          onCompetitionFilterChange={handleCompetitionFilterChange}
          onStageFilterChange={setStageFilter}
          userRoleId={user?.role_id}
          loading={loading}
        />
      </div>

    </section>
  );
};

export default TeamListContainer;