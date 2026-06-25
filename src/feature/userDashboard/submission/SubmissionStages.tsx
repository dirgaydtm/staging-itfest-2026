import { useMemo } from "react";
import { StageItem } from "./StageItem";
import { StageConnector } from "./StageConnector";
import { IStage, SubmissionsResponse } from "../types/submission";

interface SubmissionStagesProps {
  submissionsData: SubmissionsResponse | undefined;
}

const getStageStatus = (
  stage: IStage,
  index: number,
  allStages: IStage[],
  current_stage: string,
  current_stageID: number
) => {
  const isCurrent =
    current_stageID === 0
      ? stage.stage_name === "Payment"
      : stage.stage_name === current_stage;

  const currentIndex = allStages.findIndex(
    (s) => s.stage_name === current_stage
  );

  const isPast = index < currentIndex;

  const isLast = index === allStages.length - 1;

  return { isCurrent, isPast, isLast };
};

const SubmissionStages = ({ submissionsData }: SubmissionStagesProps) => {
  const data = submissionsData;

  const allStages = useMemo(() => {
    if (!data) return [];

    const { stages } = data;

    return [...stages];
  }, [data]);

  if (!data) return null;

  const { current_stage, current_stageID } = data;
  const now = new Date();

  // Function to check if a specific stage is overdue
  const isStageOverdue = (stage: IStage, isCurrent: boolean) => {
    if (!stage.stage_deadline) return false;

    const deadline = new Date(stage.stage_deadline);
    const isOverdue = deadline < now;

    // Only mark as overdue if:
    // 1. It's the current stage
    // 2. The deadline has passed
    // 3. The stage hasn't been completed successfully
    const completedStatuses = [
      "lolos",
      "diproses",
      "terverifikasi",
      "selesai",
      "tidak lolos",
      "ditolak",
    ];

    const isNotCompleted = !completedStatuses.includes(
      stage.status_submission?.toLowerCase() || ""
    );

    return isCurrent && isOverdue && isNotCompleted;
  };

  const renderStage = (stage: IStage, index: number, isDesktop: boolean) => {
    const { isCurrent, isPast, isLast } = getStageStatus(
      stage,
      index,
      allStages,
      current_stage,
      current_stageID
    );

    const stageIsOverdue = isStageOverdue(stage, isCurrent);

    return (
      <div key={index} className="flex items-center flex-col lg:flex-row">
        <StageItem
          stage={stage}
          isCurrent={isCurrent}
          isPast={isPast}
          isDesktop={isDesktop}
          isLast={isLast}
          isDeadlineOver={stageIsOverdue}
          stageIndex={index}
        />
        {!isLast && (
          <StageConnector
            isPast={isPast}
            orientation={isDesktop ? "horizontal" : "vertical"}
            isCurrent={isCurrent}
            isDeadlineOver={stageIsOverdue}
          />
        )}
      </div>
    );
  };

  return (
    <section className="bg-white/[0.06] rounded-4xl border border-white/20 font-leaguespartan py-10 px-6 md:px-10">
      {/* Header - Fixed, tidak ikut scroll */}
      <header className="text-white text-3xl font-bold text-center mb-8">
        Stages
      </header>

      {/* Content - Scrollable */}
      <main className="w-full">
        {/* Mobile View - Vertical */}
        <div className="flex flex-col lg:hidden items-center space-y-8">
          {allStages.map((stage, index) => renderStage(stage, index, false))}
        </div>

        {/* Desktop View - Horizontal dengan scroll */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center justify-start min-w-max px-4">
              {allStages.map((stage, index) => renderStage(stage, index, true))}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SubmissionStages;
