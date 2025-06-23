"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useTeamInformation } from "../hooks/useTeamInformationData";
import StagesCard from "../components/TeamStages/StagesCard";
import JudgingCard from "../components/TeamStages/JudgingCard";
import { useTeamStages } from "../hooks/useTeamStages";
import SubmissionStages from "@/feature/_admin/teamlist/components/TeamStages/SubmissionStage";
import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
// import { useSubmissions, useSubmissionStage } from "@/feature/_user/dashboard/hooks/useSubmission";

interface ModalState {
    isOpen: boolean;
    type: 'pass' | 'reject' | null;
}

const TeamListContainer = () => {
    const params = useParams();
    const team_id = params.team_id as string;
    const { teamInformationData, loading, error } = useTeamInformation(team_id);
    const { stagesData, stagesLoading, stagesError } = useTeamStages(team_id);
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        type: null,
    });

    const handlePass = () => {
        setModalState({ isOpen: true, type: 'pass' });
    };

    const handleReject = () => {
        setModalState({ isOpen: true, type: 'reject' });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, type: null });
    };

    const handleConfirmAction = async () => {
        try {
            if (modalState.type === 'reject') {

            } else if (modalState.type === 'pass') {

            } else if (modalState.type === 'reset') {

            } else {

            }
            // await refetch();
        } catch (err) {
            console.error(`Error during ${modalState.type} action:`, err);
        } finally {
            handleCloseModal();
        }
    };
    // const {
    //     data: submissionsData,
    //     loading: submissionsLoading,
    //     error: submissionsError,
    // } = useSubmissions();

    // const {
    //     data: stageData,
    //     loading: stageLoading,
    //     error: stageError,
    // } = useSubmissionStage();

    if (loading || stagesLoading) {
        return <div>Loading...</div>;
    }

    if (error || stagesError) {
        return <div>Error: {error || stagesError}</div>;
    }

    if (!teamInformationData || !stagesData) {
        return <div>No team information or stages data found.</div>;
    }

    const handleCheckStageDetails = () => {
        console.log("Check Stage Details clicked"); //test dulu
        // ini harusnya ngebuka window baru dengan link ke Proposal/Yang Dikirimin Tim

        // if (teamInformationData?.payment_transaction) {
        //     window.open(teamInformationData.payment_transaction, '_blank');
        // }
    };

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

                <div className="flex flex-col lg:flex-row gap-6 w-full mb-8">
                    <div className="w-full lg:w-1/2">
                        <StagesCard teamInfo={teamInformationData} />
                    </div>

                    <div className="w-full lg:w-1/2">
                        {stagesData && <JudgingCard stageData={stagesData} status={stagesData.stages[0].status_submission} onPass={handlePass} onReject={handleReject} />}
                    </div>
                </div>

                <SubmissionStages status={"payment"} currentStageIndex={0} onCheckStageDetails={handleCheckStageDetails} />
            </div>

            <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
                <div className="text-center text-white p-4">
                    <h2 className="text-2xl font-bold mb-4">
                        {modalState.type === 'pass'
                            ? 'Confirm Stage Progression'
                            : 'Confirm Stage Rejection'}
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Are you sure you want to {modalState.type === 'pass' ? 'PASS ' : 'REJECT '} 
                        this team to the next stage? This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            type="button"
                            size="small"
                            variant="secondary"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            size="small"
                            onClick={handleConfirmAction}
                            className={modalState.type === 'pass'
                                ? 'bg-green-600 hover:bg-green-500'
                                : 'bg-red-600 hover:bg-red-500'
                            }
                        >
                            Yes, {modalState.type === 'pass' ? 'Pass' : 'Reject'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default TeamListContainer;