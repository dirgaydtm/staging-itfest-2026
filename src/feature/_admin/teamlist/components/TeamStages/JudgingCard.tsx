'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/Button';
import { TeamStagesData } from '@/api/services/admin';
import { getCurrentStagesStyle } from '@/shared/utils/currentStagesStyle';

interface JudgingCardProps {
    stageData: TeamStagesData | null;
    stagesLoading?: boolean;
    onPass: () => void;
    onReject: () => void;
}

const DiamondIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round" />
    </svg>
);

const JudgingCard = ({
    stageData,
    stagesLoading = false,
    onPass,
    onReject
}: JudgingCardProps) => {

    if (!stageData) {
        return null;
    }

    const areActionsDisabled = stageData.current_stage === '0' || stagesLoading;
    // Tidak bisa jika current_stage adalah '0' (Pembayaran) atau sedang loading

    return (
        <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 text-center">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">Pass/Not Pass</h2>
                {/* <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getCurrentStagesStyle(stageData.current_stage)}`}>
                    {stageData.current_stage}
                </span> */}
            </div>

            {/* Konten Utama */}
            <div className="flex flex-col md:flex-row items-center gap-6">

                {/* Kolom Kiri: Info Stage */}
                <div className="flex-1 space-y-4 text-left">
                    <div>
                        <p className="text-md text-gray-300">Current Stage</p>
                        <div className="flex items-center gap-3 mt-1">
                            <DiamondIcon />
                            <span className="text-xl font-semibold">{stageData.current_stage ? stageData.current_stage : "(tidak ada)"}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-md text-gray-300">Next Stage</p>
                        <div className="flex items-center gap-3 mt-1">
                            <DiamondIcon />
                            <span className="text-xl font-semibold">{stageData.next_stage ? stageData.next_stage : "(tidak ada)"}</span>
                        </div>
                    </div>
                </div>

                {/* Garis Pemisah */}
                <div className="border-l border-gray-600 h-4 md:h-24 rotate-90 md:rotate-0"></div>

                {/* Kolom Kanan: Tombol Aksi */}
                <div className="flex flex-col gap-4 w-56">
                    <Button
                        type="button"
                        onClick={onPass}
                        disabled={areActionsDisabled}
                        className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {stagesLoading ? 'Processing...' : `Pass to ${stageData.next_stage}`}
                    </Button>
                    <Button
                        type="button"
                        onClick={onReject}
                        disabled={areActionsDisabled}
                        className="bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {stagesLoading ? 'Processing...' : `Reject ${stageData.next_stage}`}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JudgingCard;
