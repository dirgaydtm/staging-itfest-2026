import { TeamStagesData } from "@/api/services/admin";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatDate";
import React from "react";


interface SubmissionStagesProps {
  stagesData: TeamStagesData | null;
  onCheckStageDetails: (stageIndex: number) => void;
  currentStageIndex: number | undefined;
  status: string;
}

const SubmissionStages = ({ currentStageIndex, onCheckStageDetails, stagesData }: SubmissionStagesProps) => {
  if (!stagesData) return null;

  return (
    <div className="flex flex-col justify-between items-center px-4 py-6 overflow-x-auto bg-blue-500 rounded-4xl text-white border-2 border-purple-300 text-center">
      <div>
        <h2 className="text-xl font-bold mb-2">Stages</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center w-full overflow-x-auto">
        {stagesData.stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isCompleted = currentStageIndex;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2 min-w-[70px] p-2 mt-6"
            >
              {/* Diamond indicator */}
              <div
                className={`w-6 h-6 md:w-10 md:h-10 rotate-45 ${isActive
                  ? "bg-blue-200"
                  : isCompleted
                    ? "bg-green-400"
                    : "bg-white/30"
                  }`}
              />

              {/* Stage Name */}
              <p className="text-md md:text-lg">{stage.stage_name}</p>

              {/* Date (dummy dulu) */}
              <p className="text-sm text-gray-300">{formatDate(stage.stage_deadline)}</p>

              <Button
                type="button"
                size="small"
                disabled={!isActive || !stage.link_submission || stage.link_submission.trim() === ""}
                onClick={() => onCheckStageDetails(index)}
                className={`mt-1 text-md ${isActive
                  ? "bg-blue-300 hover:bg-blue-800 text-white"
                  : "bg-gray-700 text-gray-500"
                  }`}
              >
                {isActive ?
                  stage.link_submission ? "Check" : "No Submission"
                  : isCompleted ? "Completed" : "Waiting..."
                }
              </Button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default SubmissionStages;
