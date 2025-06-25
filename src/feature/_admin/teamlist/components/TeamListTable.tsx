import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table"

import { getPaymentStatusStyle } from "@/shared/utils/paymentStyles";
import { TeamDetailsData } from "@/api/services/admin";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";


interface TeamListTableProps {
    totalAll: number;
    teamData: TeamDetailsData[] | null;
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

const getDisplayValue = (value: string | null | undefined): string => {
    if (!value || value.trim() === '') return 'No Data';
    return value;
};

const isValidTeam = (team: TeamDetailsData): boolean => {
    return Boolean(
        team.team_name?.trim() &&
        team.leader_name?.trim() &&
        team.university?.trim()
    );
};

const TeamListTable = ({ totalAll, teamData, currentFilter, onFilterChange }: TeamListTableProps) => {
    if (!teamData) {
        return <div>Loading...</div>;
    }

    if (teamData.length === 0) {
        return <div>No teams found.</div>;
    }

    const validTeams = teamData.filter(isValidTeam)
        .filter(team => !currentFilter || team.current_stage === currentFilter);

    const filters = ["Payment", "BMC", "Proposal", "Final"];

    return (
        <>
            <div className="flex justify-between gap-2 mb-4">
                <p className="text-lg text-white justify-center">
                    Filter by Current Stage:
                </p>
                <div className="flex justify-between gap-2 mb-4">
                    <Button
                        onClick={() => onFilterChange("")}
                        className={`${!currentFilter ? 'bg-blue-600' : 'bg-gray-600'}`}
                        size="small"
                    >
                        All
                    </Button>
                    {filters.map(filter => (
                        <Button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`${currentFilter === filter ? 'bg-blue-600' : 'bg-gray-600'}`}
                            size="small"
                        >
                            {filter}
                        </Button>
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
                            <TableCell>
                                {getDisplayValue(team.university)}
                            </TableCell>
                            <TableCell>
                                <span className={getPaymentStatusStyle(team.payment_status)}>
                                    {getDisplayValue(team.payment_status)}
                                </span>
                            </TableCell>
                            <TableCell>
                                {getDisplayValue(team.competition_name)}
                            </TableCell>
                            <TableCell>
                                {getDisplayValue(team.current_stage)}
                            </TableCell>
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
                        <TableCell className="font-bold" colSpan={6}>Total Team</TableCell>
                        <TableCell className="font-bold text-right">{totalAll}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
};

export default TeamListTable;