"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useTeamInformation } from "../hooks/useTeamInformationData";
import StagesCard from "../components/TeamStages/StagesCard";
import JudgingCard from "../components/TeamStages/JudgingCard";
import { useTeamStages } from "../hooks/useTeamStages";

const TeamListContainer = () => {
    const params = useParams();
    const team_id = params.team_id as string;
    const { teamInformationData, loading, error } = useTeamInformation(team_id);
    const { stagesData, stagesLoading, stagesError } = useTeamStages(team_id);

    if (loading || stagesLoading) {
        return <div>Loading...</div>;
    }

    if (error || stagesError) {
        return <div>Error: {error || stagesError}</div>;
    }

    if (!teamInformationData || !stagesData) {
        return <div>No team information or stages data found.</div>;
    }

    return (
        <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full font-changa">
            <div className="">
                <Link
                    href={`/mangujo/admin/team-list/${team_id}`}
                    className="inline-block mb-4 text-white font-bold hover:text-slate-400 transition-colors transition-100"
                >
                    ← Back to Team Information
                </Link>
            </div>
            <div className=" text-white">
                <h1 className="text-3xl font-bold mb-6">Team Stages</h1>

                {/* Main Grid Layout */}
                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    <div className="w-full lg:w-1/2">
                        <StagesCard teamInfo={teamInformationData} />
                    </div>

                    <div className="w-full lg:w-1/2">
                        {stagesData && <JudgingCard stageData={stagesData} status={stagesData.stages[0].status_submission} onPass={function (): void { }} onReject={function (): void { }} />}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TeamListContainer;