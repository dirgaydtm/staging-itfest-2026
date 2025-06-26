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
  const firstOverdueIndex = allStages.findIndex(
    (s) => s.stage_deadline && new Date(s.stage_deadline) < now
  );

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
        <StageItem
          stage={stage}
          isCurrent={isCurrent}
          isPast={isPast}
          isDesktop={isDesktop}
          isLast={isLast}
          isDeadlineOver={
            firstOverdueIndex !== -1 && index >= firstOverdueIndex
          }
        />
        {!isLast && (
          <StageConnector
            isPast={isPast}
            orientation={isDesktop ? "horizontal" : "vertical"}
            isCurrent={isCurrent}
            isDeadlineOver={
              firstOverdueIndex !== -1 && index >= firstOverdueIndex
            }
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
