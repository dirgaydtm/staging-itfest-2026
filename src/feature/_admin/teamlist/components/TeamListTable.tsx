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

interface TeamListTableProps {
  teamData: TeamDetailsData[] | null;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const getDisplayValue = (value: string | null | undefined): string => {
  if (!value || value.trim() === "") return "No Data";
  return value;
};

const isValidTeam = (team: TeamDetailsData): boolean => {
  return Boolean(
    team.team_name?.trim() &&
      team.leader_name?.trim() &&
      team.university?.trim()
  );
};

const TeamListTable = ({
  teamData,
  currentFilter,
  onFilterChange,
}: TeamListTableProps) => {
  if (!teamData) {
    return <div>Loading...</div>;
  }

  if (teamData.length === 0) {
    return <div>No teams found.</div>;
  }

  const validTeams = teamData
    .filter(isValidTeam)
    .filter((team) => !currentFilter || team.current_stage === currentFilter)
    .sort((a, b) => {
      if (currentFilter) {
        if (a.competition_name === "UI/UX" && b.competition_name === "BP")
          return -1;
        if (a.competition_name === "BP" && b.competition_name === "UI/UX")
          return 1;
      }
      return 0;
    });

  const filteredTotal = validTeams.length;

  const filters = ["Payment", "BMC", "Proposal", "Final"];

  return (
    <>
      <div className="my-8 p-1 bg-blue-500 rounded-xl backdrop-blur-sm border-2 border-purple-300">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => onFilterChange("")}
            className={`
              relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 group
              ${
                !currentFilter
                  ? "bg-purple-300 text-white shadow-lg shadow-blue-600/20"
                  : "bg-transparent text-gray-300 hover:bg-gray-700/50"
              }
              border border-transparent
              ${
                !currentFilter
                  ? "border-blue-500/50"
                  : "hover:border-gray-600/50"
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  !currentFilter
                    ? "bg-white text-white shadow-lg shadow-blue-600/20"
                    : "bg-gray-500 group-hover:bg-gray-400"
                }`}
              ></div>
              All
            </span>
            <div
              className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
          </button>

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`
                relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 group
                ${
                  currentFilter === filter
                    ? "g-purple-300 text-white shadow-lg shadow-blue-600/20"
                    : "bg-transparent text-gray-300 hover:bg-gray-700/50"
                }
                border border-transparent
                ${
                  currentFilter === filter
                    ? "bg-purple-300"
                    : "hover:border-gray-600/50"
                }
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentFilter === filter
                      ? "bg-white"
                      : "bg-gray-500 group-hover:bg-gray-400"
                  }`}
                ></div>
                {filter}
              </span>
              <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </button>
          ))}
        </div>
      </div>
      <Table className="font-changa">
        <TableHeader>
          <TableRow className="table-custom">
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
          {validTeams.map((team) => (
            <TableRow key={team.team_id}>
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
              {currentFilter ? "Total Filtered Team" : "Total Team"}
            </TableCell>
            <TableCell className="font-bold text-right">
              {filteredTotal}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TeamListTable;
