"use client";

import { TeamStage, TeamStagesData } from "@/api/services/admin";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatDate";
import { useMemo } from "react";
import { StageConnector } from "./StageConnector";
import { cn } from "@/shared/utils/cn";

interface SubmissionStagesProps {
  stagesData: TeamStagesData | null;
  onCheckStageDetails: (stageIndex: number) => void;
}

const getStageStatus = (
  stageName: TeamStage,
  index: number,
  allStages: TeamStage[],
  currentStage: string,
  currentStageId: number
) => {
  const isCurrent =
    currentStageId === 0
      ? stageName.stage_name === "Payment"
      : stageName.stage_name === currentStage;

  const currentIndex = allStages.findIndex(
    (s) => s.stage_name === currentStage
  );

  const isPast = currentStageId !== 0 && index < currentIndex;
  const isLast = index === allStages.length - 1;

  return { isCurrent, isPast, isLast };
};

const SubmissionStages = ({ onCheckStageDetails, stagesData }: SubmissionStagesProps) => {
  const allStages = useMemo(() => {
    if (!stagesData) return [];
    return [...stagesData.stages];
  }, [stagesData]);

  if (!stagesData) return null;

  const renderStage = (stage: TeamStage, index: number, isDesktop: boolean) => {
    const { isCurrent, isPast, isLast } = getStageStatus(
      stage,
      index,
      allStages,
      stagesData.current_stage,
      stagesData.current_stageID
    );

    return (
      <div key={index} className="flex justify-around items-center flex-col lg:flex-row w-full lg:w-auto">
        <div className="flex flex-col items-center text-center gap-2 min-w-[120px] p-3">
          
          {/* Diamond indicator - Diubah warnanya agar masuk ke palet gelap/kaca */}
          <div
            className={cn(
              "rotate-45 transition-all duration-300 rounded-sm border",
              isCurrent
                ? "bg-white border-white shadow-lg shadow-white/20 scale-105"
                : "bg-[#243642] border-white/20",
              isPast ? "bg-[#3D5D71] border-transparent" : "",
              stage.status_submission === "lolos" && isLast
                ? "bg-green-500 border-transparent shadow-lg shadow-green-500/20"
                : "",
              stage.status_submission === "tidak lolos"
                ? "bg-red-500 border-transparent shadow-lg shadow-red-500/20"
                : "",
              isDesktop ? "w-8 h-8" : "w-10 h-10"
            )}
          />

          {/* Meta Informasi Tahapan */}
          <p className={cn(
            "text-sm font-bold mt-5 tracking-wide",
            isCurrent ? "text-white" : "text-white/60"
          )}>
            {stage.stage_name}
          </p>
          <p className="text-[11px] text-white/40 font-medium mb-2">
            {formatDate(stage.stage_deadline)}
          </p>

          {/* Tombol Cek Berkas/Aksi Tahapan */}
          <Button
            type="button"
            size="small"
            disabled={!stage.link_submission || stage.link_submission.trim() === ""}
            onClick={() => onCheckStageDetails(index)}
            className={cn(
              "h-8 text-[11px] font-bold rounded-xl px-4 transition-all w-full min-w-[100px] flex items-center justify-center disabled:cursor-not-allowed",
              isCurrent
                ? stage.link_submission
                  ? "bg-gradient-to-r from-[#243642] to-[#3D5D71] border-transparent text-white hover:scale-102"
                  : "bg-white/5 border border-white/10 text-white/40 disabled:opacity-40"
                : "bg-white/5 border border-white/5 text-white/60 disabled:opacity-30"
            )}
          >
            {isCurrent
              ? stage.link_submission
                ? "Check Link"
                : "No Submission"
              : stage.status_submission === "lolos"
                ? "Completed"
                : isPast
                  ? "Completed"
                  : "Waiting..."
            }
          </Button>
        </div>

        {/* Garis Penghubung Alur (StageConnector) */}
        {!isLast && (
          <StageConnector
            isPast={isCurrent || isPast}
            orientation={isDesktop ? "horizontal" : "vertical"}
            status={stage.status_submission}
          />
        )}
      </div>
    );
  };

  return (
    // Menggunakan pakem figma asli: bg-[#B0BFC7]/10 dengan border tipis transparan
    <section className="bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl font-changa py-8 px-6 w-full">
      <header className="text-white text-xl font-bold border-b border-white/5 pb-4 mb-10 tracking-wide pl-2">
        Competition Stages Journey
      </header>

      <main className="w-full overflow-x-auto">
        {/* Tampilan Seluler (Mobile Viewport Layout) */}
        <div className="flex flex-col lg:hidden items-center space-y-4 min-w-max">
          {allStages.map((stage, index) => renderStage(stage, index, false))}
        </div>

        {/* Tampilan Desktop (Desktop Viewport Layout) */}
        <div className="hidden lg:flex items-center justify-start gap-1 min-w-max px-4">
          {allStages.map((stage, index) => renderStage(stage, index, true))}
        </div>
      </main>
    </section>
  );
};

export default SubmissionStages;