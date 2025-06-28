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
} from "@/components/ui/table";
import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";
import { TeamDetailsData } from "@/api/services/admin";
import Link from "next/link";
import { X } from "lucide-react";

interface TeamListTableProps {
  teamData: TeamDetailsData[] | null;
  currentCompetitionFilter: string;
  currentStageFilter: string;
  onCompetitionFilterChange: (filter: string) => void;
  onStageFilterChange: (filter: string) => void;
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
      relative px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ease-in-out flex items-center justify-center
      ${
        isActive
          ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
          : isMainCategory
          ? "bg-slate-700/80 text-slate-200 hover:bg-slate-700"
          : "bg-slate-800/60 text-slate-300 hover:bg-slate-700/80"
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
}: TeamListTableProps) => {
  if (!teamData) {
    return <div>Loading...</div>;
  }

  const registeredTeams = teamData.filter(
    (team) =>
      team.competition_name && team.competition_name !== "Not Registered"
  );
  const notRegisteredTeams = teamData.filter(
    (team) =>
      !team.competition_name || team.competition_name === "Not Registered"
  );

  const competitionNames = [
    ...new Set(registeredTeams.map((team) => team.competition_name as string)),
  ];

  const getStagesForCompetition = (competitionName: string) => {
    return [
      ...new Set(
        registeredTeams
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
      return teamData;
    }

    let teamsToFilter;
    if (currentCompetitionFilter === "NOT_REGISTERED") {
      teamsToFilter = notRegisteredTeams;
    } else {
      teamsToFilter = registeredTeams.filter(
        (team) => team.competition_name === currentCompetitionFilter
      );
    }

    if (!currentStageFilter) {
      return teamsToFilter;
    }

    if (currentStageFilter === "NO_STAGE") {
      return teamsToFilter.filter((team) => !team.current_stage);
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
    <>
      <div className="p-4 bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-700/50 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Filters</h3>
          {(currentCompetitionFilter || currentStageFilter) && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 text-xs text-yellow-400  hover:text-white transition-colors"
            >
              <X size={14} /> Clear All
            </button>
          )}
        </div>

        {competitionNames.map((name) => (
          <div
            key={name}
            className="flex items-start md:items-center gap-4 p-3 bg-slate-800/30 rounded-lg flex-col md:flex-row"
          >
            <p className="w-24 text-slate-200 font-bold text-sm flex-shrink-0">
              {name}
            </p>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label={`ALL ${name} Data`}
                isMainCategory
                isActive={
                  currentCompetitionFilter === name && !currentStageFilter
                }
                onClick={() => onCompetitionFilterChange(name)}
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

        <div className="flex items-start md:items-center gap-4 p-3 bg-slate-800/30 rounded-lg flex-col md:flex-row">
          <p className="w-24 text-slate-400 font-bold text-sm flex-shrink-0">
            Lainnya
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              label="Not Registered"
              isMainCategory
              isActive={
                currentCompetitionFilter === "NOT_REGISTERED" &&
                !currentStageFilter
              }
              onClick={() => onCompetitionFilterChange("NOT_REGISTERED")}
            />
            <FilterButton
              label="Tidak Memiliki Stage"
              isActive={
                currentCompetitionFilter === "NOT_REGISTERED" &&
                currentStageFilter === "NO_STAGE"
              }
              onClick={() => {
                onCompetitionFilterChange("NOT_REGISTERED");
                onStageFilterChange("NO_STAGE");
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Table className="font-changa bg-blue-500 rounded-xl">
          <TableHeader className="">
            <TableRow className=" bg-purple-400">
              <TableHead>Team Name</TableHead>
              <TableHead>Leader Name</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Competition</TableHead>
              <TableHead>Current Stage</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow className="border-white/30" key={team.team_id}>
                <TableCell className="font-medium">
                  {getDisplayValue(team.team_name)}
                </TableCell>
                <TableCell className="font-medium">
                  {getDisplayValue(team.leader_name)}
                </TableCell>
                <TableCell>{getDisplayValue(team.university)}</TableCell>
                <TableCell>
                  <span className={getPaymentStatusStyle(team.payment_status)}>
                    {getDisplayValue(team.payment_status)}
                  </span>
                </TableCell>
                <TableCell>{getDisplayValue(team.competition_name)}</TableCell>
                <TableCell>{getDisplayValue(team.current_stage)}</TableCell>
                <TableCell>
                  <Link
                    href={`team-list/${team.team_id}`}
                    className="px-4 py-0 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold" colSpan={6}>
                Total Filtered Team
              </TableCell>
              <TableCell className="font-bold text-right">
                {filteredTotal}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default TeamListTable;
