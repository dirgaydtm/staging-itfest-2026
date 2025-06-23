// src/features/submissions/components/SubmissionStages.tsx

import { useMemo } from "react";
import { StageItem } from "./StageItem";
import { StageConnector } from "./StageConnector";
import { IStage, SubmissionsResponse } from "../../types/submission";


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

  const isPast =
    current_stageID === 0
      ? false
      : index < allStages.findIndex((s) => s.stage_name === current_stage);

  const isLast = index === allStages.length - 1;

  return { isCurrent, isPast, isLast };
};

const SubmissionStages = ({ submissionsData }: SubmissionStagesProps) => {
  const data = submissionsData;

  const allStages = useMemo(() => {
    if (!data) return [];
    
    const { stages, payment_status } = data;
    const nextStageDeadline = stages[0]?.stage_deadline ?? null;

    return [
      {
        stage_name: "Payment",
        stage_deadline: nextStageDeadline,
        link_submission: "",
        status_submission: payment_status,
      },
      ...stages,
    ];
  }, [data]);

  if (!data) return null;

  const { current_stage, current_stageID } = data;

  const renderStage = (stage: IStage, index: number, isDesktop: boolean) => {
    const { isCurrent, isPast, isLast } = getStageStatus(
      stage,
      index,
      allStages,
      current_stage,
      current_stageID
    );

    return (
      <div key={index} className="flex items-center flex-col lg:flex-row">
        <StageItem stage={stage} isCurrent={isCurrent} isPast={isPast} isDesktop={isDesktop} />
        {!isLast && (
          <StageConnector isPast={isCurrent || isPast} orientation={isDesktop ? "horizontal" : "vertical"} />
        )}
      </div>
    );
  };
  
  return (
    <section className="bg-blue-500 rounded-4xl border-2 border-purple-300 p-6">
      <header className="text-white text-xl font-semibold text-center mb-8">
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