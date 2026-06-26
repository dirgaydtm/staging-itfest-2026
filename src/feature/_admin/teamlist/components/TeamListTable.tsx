"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/shared/components/ui/table";
import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";
import { TeamDetailsData } from "@/api/services/admin";
import Link from "next/link";
import { X, SlidersHorizontal, Edit2 } from "lucide-react";

interface TeamListTableProps {
  teamData: TeamDetailsData[] | null;
  currentCompetitionFilter: string;
  currentStageFilter: string;
  onCompetitionFilterChange: (filter: string) => void;
  onStageFilterChange: (filter: string) => void;
  userRoleId?: number;
  loading?: boolean;
}

const getDisplayValue = (value: string | null | undefined): string => {
  if (!value || value.trim() === "") return "No Data";
  return value;
};

const FilterButton = ({
  label,
  isActive,
  onClick,
  isMainCategory = false,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isMainCategory?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border
      ${
        isActive
          ? "bg-gradient-to-r from-[#243642] to-[#3D5D71] border-transparent text-white shadow-md shadow-black/20 scale-102"
          : isMainCategory
          ? "bg-white/10 border-white/10 text-white hover:bg-white/20"
          : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:text-white"
      }
    `}
  >
    {label}
  </button>
);

const TeamListTable = ({
  teamData,
  currentCompetitionFilter,
  currentStageFilter,
  onCompetitionFilterChange,
  onStageFilterChange,
  userRoleId,
  loading = false,
}: TeamListTableProps) => {

  // Show loading spinner only when loading is true
  if (loading) {
    return (
      <div className="h-48 w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white"></div>
      </div>
    );
  }

  const visibleTeams =
    teamData?.filter(
      (team) =>
        team.competition_name && team.competition_name !== "Not Registered"
    ) || [];

  // Show empty state when no data or empty array
  if (!teamData || visibleTeams.length === 0) {
    return (
      <div className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-center text-white/60 text-sm">
        No teams registered yet.
      </div>
    );
  }

  const baseTeams = visibleTeams;

  const competitionNames = [
    ...new Set(baseTeams.map((team) => team.competition_name as string)),
  ];

  const getStagesForCompetition = (competitionName: string) => {
    return [
      ...new Set(
        baseTeams
          .filter(
            (team) =>
              team.competition_name === competitionName && team.current_stage
          )
          .map((team) => team.current_stage as string)
      ),
    ];
  };

  const filteredTeams = (() => {
    if (!currentCompetitionFilter) {
      return baseTeams;
    }

    const teamsToFilter = baseTeams.filter(
      (team) => team.competition_name === currentCompetitionFilter
    );

    if (!currentStageFilter) {
      return teamsToFilter;
    }

    return teamsToFilter.filter(
      (team) => team.current_stage === currentStageFilter
    );
  })();

  const filteredTotal = filteredTeams.length;

  const handleClearFilters = () => {
    onCompetitionFilterChange("");
    onStageFilterChange("");
  };

  return (
    <div className="w-full space-y-6 text-white">
      {/* PANEL FILTER (Style Glassmorphism Container) - Hide for role_id 3,4,5 since they only see one competition */}
      {userRoleId !== 3 && userRoleId !== 4 && userRoleId !== 5 && competitionNames.length > 1 && (
        <div className="p-5 bg-[#B0BFC7]/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
              <SlidersHorizontal size={16} className="text-white/60" />
              <span>Filter Teams By Category</span>
            </div>
            {window && (currentCompetitionFilter || currentStageFilter) && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 font-semibold transition-colors cursor-pointer"
              >
                <X size={14} /> Clear All
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {competitionNames.map((name) => (
              <div
                key={name}
                className="flex items-start md:items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-xl flex-col md:flex-row"
              >
                <p className="w-28 text-white/80 font-bold text-xs uppercase tracking-wider flex-shrink-0 pl-1">
                  {name}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    label={`ALL DATA`}
                    isMainCategory
                    isActive={
                      currentCompetitionFilter === name && !currentStageFilter
                    }
                    onClick={() => {
                      onCompetitionFilterChange(name);
                      onStageFilterChange("");
                    }}
                  />
                  {getStagesForCompetition(name).map((stage) => (
                    <FilterButton
                      key={stage}
                      label={stage}
                      isActive={
                        currentCompetitionFilter === name &&
                        currentStageFilter === stage
                      }
                      onClick={() => {
                        onCompetitionFilterChange(name);
                        onStageFilterChange(stage);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TABEL UTAMA DATA TIM */}
      <div className="rounded-2xl border border-white/10 bg-[#B0BFC7]/5 overflow-hidden backdrop-blur-md shadow-xl">
        <Table className="font-leaguespartan w-full text-white">
          <TableHeader>
            <TableRow className="bg-[#B0BFC7]/15 border-b border-white/10 hover:bg-[#B0BFC7]/15">
              <TableHead className="text-white font-bold text-xs tracking-wide py-4">Team Name</TableHead>
              <TableHead className="text-white font-bold text-xs tracking-wide py-4">Leader Name</TableHead>
              <TableHead className="text-white font-bold text-xs tracking-wide py-4">University</TableHead>
              <TableHead className="text-white font-bold text-xs tracking-wide py-4">Payment Status</TableHead>
              <TableHead className="text-white font-bold text-xs tracking-wide py-4">Competition</TableHead>
              <TableHead className="text-white font-bold text-xs tracking-wide py-4">Current Stage</TableHead>
              <TableHead className="text-white font-bold text-xs tracking-wide py-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow className="border-b border-white/5 hover:bg-white/5 transition-colors" key={team.team_id}>
                <TableCell className="font-semibold text-sm py-3.5">
                  {getDisplayValue(team.team_name)}
                </TableCell>
                <TableCell className="text-white/80 text-sm py-3.5">
                  {getDisplayValue(team.leader_name)}
                </TableCell>
                <TableCell className="text-white/70 text-sm py-3.5">{getDisplayValue(team.university)}</TableCell>
                <TableCell className="py-3.5">
                  <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border tracking-wide uppercase ${getPaymentStatusStyle(team.payment_status)}`}>
                    {getDisplayValue(team.payment_status)}
                  </span>
                </TableCell>
                <TableCell className="text-white/70 text-sm py-3.5">{getDisplayValue(team.competition_name)}</TableCell>
                <TableCell className="py-3.5">
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-xs font-medium text-white/90">
                    {getDisplayValue(team.current_stage)}
                  </span>
                </TableCell>
                <TableCell className="text-center py-3.5">
                  <Link
                    href={`team-list/${team.team_id}`}
                    className="inline-flex items-center gap-1.5 px-3 h-8 text-[11px] font-bold text-white bg-gradient-to-r from-[#243642] to-[#3D5D71] border border-transparent rounded-xl hover:scale-102 transition-all shadow-md shadow-black/10"
                  >
                    <Edit2 size={10} />
                    <span>Edit</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-white/5 border-t border-white/10">
            <TableRow className="hover:bg-transparent">
              <TableCell className="font-bold text-sm text-white/60 py-4" colSpan={6}>
                Total Filtered Teams
              </TableCell>
              <TableCell className="font-bold text-sm text-right pr-6 py-4 text-white">
                {filteredTotal}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default TeamListTable;