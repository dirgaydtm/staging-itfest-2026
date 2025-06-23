import React from "react";

const stages = ["Payment", "Proposal", "Semi Final", "Final"];

interface SubmissionStagesProps {
  currentStageIndex: number | undefined;
  status: string;
}

const SubmissionStages = ({ currentStageIndex }: SubmissionStagesProps) => {
  return (
    <div className="flex flex-col justify-between items-center px-4 py-6 overflow-x-auto bg-blue-500 rounded-4xl text-white border-2 border-purple-300 text-center">
      <div>
        <h2 className="text-xl font-bold mb-2">Stages</h2>
      </div>

      <div className="flex justify-around items-center w-full overflow-x-auto">
        {stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isCompleted = currentStageIndex;

          return (
            <div
              key={stage}
              className="flex flex-col items-center text-center gap-2 min-w-[70px] mt-10"
            >
              {/* Diamond indicator */}
              <div
                className={`w-6 h-6 md:w-10 md:h-10 rotate-45 ${isActive
                    ? "bg-blue-400"
                    : isCompleted
                      ? "bg-green-400"
                      : "bg-white/30"
                  }`}
              />

              {/* Stage Name */}
              <p className="text-xs md:text-sm">{stage}</p>

              {/* Date (dummy dulu) */}
              <p className="text-xs text-gray-300">28 June 2025</p>

              {/* Button */}
              <button
                className={`mt-1 px-2 py-1 rounded text-xs ${isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 cursor-not-allowed"
                  }`}
              >
                {isActive ? "Submit" : isCompleted ? "Done" : "Waiting..."}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default SubmissionStages;
