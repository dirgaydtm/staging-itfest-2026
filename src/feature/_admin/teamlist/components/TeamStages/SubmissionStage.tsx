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
      <div key={index} className="flex justify-around items-center flex-col lg:flex-row">
        <div className="flex flex-col items-center text-center gap-2 min-w-[70px] p-2 mt-2">
          {/* Diamond indicator */}
          <div
            className={cn(
              "cursor-pointer rotate-45 transition-all duration-300",
              isCurrent || isPast
                ? "bg-white glow-white"
                : "bg-purple-200",
              stage.status_submission === "lolos" && isLast
                ? "bg-yellow-400 glow-yellow"
                : "",
              stage.status_submission === "tidak lolos"
                ? "bg-red-400 glow-red"
                : "",
              stage.status_submission ? "bg-white" : "",
              isDesktop ? "w-12 h-12" : "w-16 h-16"
            )}
          />

          <p className="text-md md:text-lg mt-4">{stage.stage_name}</p>
          <p className="text-sm text-gray-300">{formatDate(stage.stage_deadline)}</p>

          <Button
            type="button"
            size="small"
            disabled={!stage.link_submission || stage.link_submission.trim() === "" }
            onClick={() => onCheckStageDetails(index)}
            className={`mt-1 text-md ${isCurrent
              ? "bg-blue-300 hover:bg-blue-800 text-white"
              : "bg-gray-700 text-gray-500"
              }`}
          >
            {isCurrent
              ? stage.link_submission
                ? "Check"
                : "No Submission"
              : stage.status_submission === "lolos"
                ? "Completed"
                : isPast
                  ? "Completed"
                  : "Waiting..."
            }
          </Button>
        </div>

        {/* Add connector if not last stage */}
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
    <section className="bg-blue-500 rounded-4xl border-2 border-purple-300 overflow-x-auto font-changa py-10">
      <header className="text-white text-3xl font-bold text-center mb-16">
        Stages
      </header>

      <main className="w-full">
        <div className="flex flex-col lg:hidden items-center space-y-8">
          {allStages.map((stage, index) => renderStage(stage, index, false))}
        </div>

        <div className="hidden lg:flex items-center justify-center">
          {allStages.map((stage, index) => renderStage(stage, index, true))}
        </div>
      </main>
    </section>
  );
};

export default SubmissionStages;