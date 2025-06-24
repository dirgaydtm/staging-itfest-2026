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
import { useTeamStagesStatus } from "../hooks/useTeamStagesStatus";
import { AlertCircle, Loader2 } from "lucide-react";
// import { useSubmissions, useSubmissionStage } from "@/feature/_user/dashboard/hooks/useSubmission";

interface ModalState {
    isOpen: boolean;
    type: 'pass' | 'reject' | 'error' | null;
    errorMessage?: string;
}

const TeamListContainer = () => {
    const params = useParams();
    const team_id = params.team_id as string;
    const { teamInformationData, loading, error, refetch } = useTeamInformation(team_id);
    const { stagesData, stagesLoading, stagesError, stagesRefetch } = useTeamStages(team_id);
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        type: null,
    });
    const { updateStatus, loading: updateLoading } = useTeamStagesStatus(team_id);

    const handlePass = () => {
        if (stagesData?.current_stageID == 0 || !stagesData?.current_stageID) {
            setModalState({
                isOpen: true,
                type: 'error',
                errorMessage: "No current stage found. The team might not finished Payment Stage yet."
            });
            return;
        }
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
            const currentStageId = stagesData?.current_stageID;

            if (currentStageId == 0 || !currentStageId) {
                setModalState({
                    isOpen: true,
                    type: 'error',
                    errorMessage: "No current stage found. The team might not finished Payment Stage yet."
                });
                return;
            }

            if (modalState.type === 'reject') {
                await updateStatus(currentStageId, 'tidak lolos');
            } else if (modalState.type === 'pass') {
                await updateStatus(currentStageId, 'lolos');
            }

            // Refresh the data
            await Promise.all([
                refetch(),
                stagesRefetch()
            ]);
        } catch (err) {
            console.error(`Error during ${modalState.type} action:`, err);
            setModalState({
                isOpen: true,
                type: 'error',
                errorMessage: err instanceof Error ? err.message : "An unknown error occurred"
            });
        } finally {
            handleCloseModal();
        }
    };

    if (loading || stagesLoading) {
        return <div>Loading...</div>;
    }

    if (error || stagesError) {
        return <div>Error: {error || stagesError}</div>;
    }

    if (!teamInformationData || !stagesData) {
        return <div>No team information or stages data found.</div>;
    }

    const handleCheckStageDetails = (stageIndex: number) => {
        const selectedStage = stagesData?.stages[stageIndex];
        if (!selectedStage?.link_submission) {
            console.error('No submission link available for this stage');
            return;
        }

        window.open(selectedStage.link_submission, '_blank', 'noopener,noreferrer');
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
                        <StagesCard teamInfo={teamInformationData} stageData={stagesData} />
                    </div>

                    <div className="w-full lg:w-1/2">
                        {stagesData && <JudgingCard stageData={stagesData} onPass={handlePass} onReject={handleReject} />}
                    </div>
                </div>

                <SubmissionStages stagesData={stagesData} onCheckStageDetails={handleCheckStageDetails} />
            </div>

            <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
                <div className="text-center text-white p-4">
                    {modalState.type === 'error' ? (
                        <>
                            <div className="flex justify-center mb-4">
                                <AlertCircle className="w-12 h-12 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Error Occurred</h2>
                            <p className="text-gray-300 mb-8">
                                {modalState.errorMessage || 'An unexpected error occurred'}
                            </p>
                            <div className="flex justify-center gap-4 ">
                                <Button
                                    type="button"
                                    size="small"
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </Button>
                            </div>

                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-4">
                                {modalState.type === 'pass' ? (
                                    'Confirm Stage Progression'
                                ) : (
                                    'Confirm Stage Rejection'
                                )}
                            </h2>
                            <p className="text-gray-300 mb-8">
                                Are you sure you want to
                                <span className="font-bold mx-1">
                                    {modalState.type === 'pass' ? 'PASS' : 'REJECT'}
                                </span>
                                this team{modalState.type === 'pass' ? ' to the next stage' : ''}?
                                This action cannot be undone.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    type="button"
                                    size="small"
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                    disabled={updateLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    size="small"
                                    onClick={handleConfirmAction}
                                    disabled={updateLoading}
                                    className={
                                        modalState.type === 'pass'
                                            ? 'bg-green-600 hover:bg-green-500 disabled:bg-green-800'
                                            : 'bg-red-600 hover:bg-red-500 disabled:bg-red-800'
                                    }
                                >
                                    {updateLoading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <>Yes, {modalState.type === 'pass' ? 'Pass' : 'Reject'}</>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </section>
    );
};

export default TeamListContainer;