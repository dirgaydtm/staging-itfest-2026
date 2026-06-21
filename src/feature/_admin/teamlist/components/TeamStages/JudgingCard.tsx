'use client';

import React from 'react';
import { Button } from '@/shared/components/ui/Button';
import { TeamStagesData } from '@/api/services/admin';
import { CheckCircle, XCircle } from 'lucide-react';

interface JudgingCardProps {
    stageData: TeamStagesData | null;
    stagesLoading?: boolean;
    onPass: () => void;
    onReject: () => void;
}

const DiamondIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="#B0BFC7" strokeWidth="2" strokeLinejoin="round" />
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

    return (
        // Menggunakan pakem figma asli: bg-[#B0BFC7]/10 dengan border tipis transparan dan h-full
        <div className="p-6 sm:p-8 bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl text-white h-full flex flex-col gap-6">
            
            {/* Header Bagian Kelolosan */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Section</span>
                    <h2 className="text-lg font-bold tracking-wide">Stage Determination</h2>
                </div>
            </div>

            {/* Grid Layout Pembagian Area Info Stage & Tombol Kendali */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-2">

                {/* Sisi Kiri (md:col-span-6): Informasi Detail Tahapan */}
                <div className="md:col-span-6 flex flex-col gap-5 text-left">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">
                            Current Stage
                        </span>
                        <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl">
                            <DiamondIcon />
                            <span className="text-sm font-semibold tracking-wide text-white">
                                {stageData.current_stage ? stageData.current_stage : "(tidak ada)"}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">
                            Target Phase
                        </span>
                        <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl">
                            <DiamondIcon />
                            <span className="text-sm font-semibold tracking-wide text-white">
                                {stageData.next_stage ? stageData.next_stage : "(tidak ada)"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sisi Kanan (md:col-span-6): Panel Tombol Eksekusi Kelolosan */}
                <div className="md:col-span-6 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8 w-full">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-1 md:hidden">
                        Actions
                    </span>

                    {/* Tombol Meloloskan Tim */}
                    <Button
                        type="button"
                        onClick={onPass}
                        disabled={areActionsDisabled}
                        className="w-full h-10 text-xs font-bold rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <CheckCircle size={14} />
                        <span className="truncate">
                            {stagesLoading ? 'Processing...' : `Pass to ${stageData.next_stage || 'Next'}`}
                        </span>
                    </Button>

                    {/* Tombol Tidak Meloloskan Tim */}
                    <Button
                        type="button"
                        onClick={onReject}
                        disabled={areActionsDisabled}
                        className="w-full h-10 text-xs font-bold rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <XCircle size={14} />
                        <span className="truncate">
                            {stagesLoading ? 'Processing...' : `Reject ${stageData.next_stage || 'Next'}`}
                        </span>
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default JudgingCard;