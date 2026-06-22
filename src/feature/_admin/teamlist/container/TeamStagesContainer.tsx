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
        if (stagesData?.current_stageID == 0 || !stagesData?.current_stageID) {
            setModalState({
                isOpen: true,
                type: 'error',
                errorMessage: "No current stage found. The team might not finished Payment Stage yet."
            });
            return;
        }
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

    // State Loading yang disinkronkan dengan desain transparan dashboard
    if (loading || stagesLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center py-24">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-white/40 animate-spin mx-auto" />
                    <p className="text-white/60 font-leaguespartan text-sm tracking-wide">
                        Loading stages details...
                    </p>
                </div>
            </div>
        );
    }

    // State Error dengan wrapper alert box transparan kemerahan
    if (error || stagesError) {
        return (
            <div className="w-full max-w-xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center text-red-400 font-medium text-sm mt-10">
                Error: {error || stagesError}
            </div>
        );
    }

    if (!teamInformationData || !stagesData) {
        return <div className="text-center text-white/60 p-8">No team information or stages data found.</div>;
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
        <section className="px-4 sm:px-8 mycontainer md:px-12 lg:px-20 py-24 md:py-12 lg:py-20 h-full w-full font-leaguespartan  text-white">
            <div className="">
                <Link
                    href={`/mangujo/admin/team-list/${team_id}`}
                    className="inline-block mb-6 text-white/80 font-bold hover:text-white transition-colors"
                >
                    ← Back to Team Information
                </Link>
            </div>
            
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-8 tracking-wide">Team Stages</h1>

                {/* Main Content Row: Pembagian simetris kiri-kanan */}
                <div className="flex flex-col lg:flex-row gap-8 w-full mb-10">
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <StagesCard teamInfo={teamInformationData} stageData={stagesData} />
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col">
                        {stagesData && <JudgingCard stageData={stagesData} onPass={handlePass} onReject={handleReject} />}
                    </div>
                </div>

                {/* Kelompok List Submission di Bagian Bawah */}
                <div className="w-full transition-all duration-300">
                    <SubmissionStages stagesData={stagesData} onCheckStageDetails={handleCheckStageDetails} />
                </div>
            </div>

            {/* Modal Manajemen Tahapan Kelolosan (Sesuai pakem modal kustom sebelumnya) */}
            <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
                <div className="w-full max-w-[420px] bg-[#1A2831] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
                    
                    {/* Bagian Kepala Modal (Header Badge) */}
                    <div className={`w-full py-2 rounded-xl text-center text-white font-bold text-sm tracking-wide border ${
                        modalState.type === 'error'
                            ? "bg-red-500/10 border-red-500/20"
                            : modalState.type === 'pass'
                            ? "bg-green-500/20 border-green-500/30"
                            : "bg-red-500/20 border-red-500/30"
                    }`}>
                        {modalState.type === 'error' ? 'System Alert' : modalState.type === 'pass' ? 'Stage Promotion' : 'Stage Drop'}
                    </div>

                    {/* Konten Utama Dialog Modal */}
                    {modalState.type === 'error' ? (
                        <>
                            <div className="text-center flex flex-col items-center gap-3">
                                <AlertCircle className="w-10 h-10 text-red-500/80 animate-pulse" />
                                <h4 className="font-bold text-base text-white">Action Prohibited</h4>
                                <p className="text-xs text-white/60 leading-relaxed px-2">
                                    {modalState.errorMessage || 'An unexpected error occurred'}
                                </p>
                            </div>
                            
                            <div className="w-full pt-2">
                                <button
                                    type="button"
                                    className="w-full h-10 border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                                    onClick={handleCloseModal}
                                >
                                    Close Dialog
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-center flex flex-col gap-2">
                                <h4 className="font-bold text-lg text-white">
                                    {modalState.type === 'pass' ? 'Advance Team Status?' : 'Drop Team Status?'}
                                </h4>
                                <p className="text-xs text-white/60 leading-relaxed px-1">
                                    Are you sure you want to
                                    <span className={`font-bold mx-1 ${modalState.type === 'pass' ? 'text-green-400' : 'text-red-400'}`}>
                                        {modalState.type === 'pass' ? 'PASS' : 'REJECT'}
                                    </span>
                                    this team{modalState.type === 'pass' ? ' to the next competition stage' : ' from this phase'}? This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex justify-between gap-4 pt-1">
                                <button
                                    type="button"
                                    className="w-1/2 h-10 border border-white/40 bg-transparent text-white text-xs font-bold rounded-xl transition-all hover:bg-white/10 cursor-pointer disabled:opacity-40"
                                    onClick={handleCloseModal}
                                    disabled={updateLoading}
                                >
                                    Cancel
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={handleConfirmAction}
                                    disabled={updateLoading}
                                    className={`w-1/2 h-10 text-white text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                        modalState.type === 'pass'
                                            ? 'bg-green-600/30 border-green-500/40 hover:bg-green-600/50 disabled:bg-green-800/30'
                                            : 'bg-red-600/30 border-red-500/40 hover:bg-red-600/50 disabled:bg-red-800/30'
                                    }`}
                                >
                                    {updateLoading ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>Yes, {modalState.type === 'pass' ? 'Pass' : 'Reject'}</>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </section>
    );
};

export default TeamListContainer;