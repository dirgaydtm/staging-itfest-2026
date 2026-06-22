import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import { competitionData } from "../../../shared/data/competitionData";

interface SubmissionHeaderProps {
  competitionCategory: "BP" | "UI/UX" | "DML" | "Not Registered";
  status: string;
  isDeadlineOver: boolean | string;
  currentStage?: string; // Optional: to show current stage name
  nextDeadline?: string | null; // Optional: to show next deadline
}

const SubmissionHeader = ({
  competitionCategory,
  status,
  isDeadlineOver,
  currentStage,
}: SubmissionHeaderProps) => {
  const content =
    competitionData[competitionCategory as keyof typeof competitionData];

  // Check if this is actually overdue (deadline passed AND no progress made)
  const isActuallyOverdue =
    isDeadlineOver &&
    (!status ||
      ![
        "diproses",
        "lolos",
        "terverifikasi",
        "tidak lolos",
        "ditolak",
      ].includes(status));

  // Special status checks
  const isProcessing = status === "diproses";
  const isPassed = status === "lolos" || status === "terverifikasi";
  const isFailed = status === "tidak lolos" || status === "ditolak";
  const isFinalist =
    status === "Waiting..." && currentStage === "Final Pitch Deck";
  console.log(isFinalist);
  // Determine display status
  const displayStatus = isFinalist
    ? "Lolos Final"
    : isActuallyOverdue
    ? "Terlambat"
    : status;

  return (
    <header className="flex flex-col lg:flex-row lg:justify-between items-center bg-white/[0.06] backdrop-blur-lg border border-white/20 shadow-lg z-0 mycontainer p-4 rounded-4xl gap-4 lg:gap-8 mr-10 font-leaguespartan">
      {/* Left section - Icon and Title */}
      <section className="flex items-center gap-4 text-center lg:text-left flex-shrink-0">

        <div className="relative">
          <h2 className="text-3xl lg:text-5xl font-leaguespartan text-white font-bold leading-tight">
            {content.title}
          </h2>
        </div>
      </section>

      {/* Right section - Stage, Deadline, Status */}
      <section className="lg:flex justify-end items-center gap-4 ">
        {/* Current Stage Display */}
        {currentStage && (
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 lg:gap-1">
            <span className="text-base lg:text-base font-bold text-white whitespace-nowrap">
              Stage:
            </span>
            <span className="text-sm lg:text-sm font-normal text-white text-center lg:text-right">
              {currentStage}
            </span>
          </div>
        )}

        {/* Status Display */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 lg:gap-1">
          <span className="text-base lg:text-base font-bold text-white whitespace-nowrap">
            Status:
          </span>
          <span
            className={cn(
              "text-sm lg:text-sm font-normal text-center lg:text-right transition-all duration-300",

              // Default styling
              "text-white",

              // Processing status
              isProcessing &&
                "text-white animate-pulse font-semibold",

              // Success statuses
              isPassed && "text-white font-semibold",

              // Finalist special styling
              isFinalist && "font-semibold text-glow-yellow",

              // Failed statuses
              isFailed && "text-red-400  font-semibold",

              // Actually overdue (deadline passed with no progress)
              isActuallyOverdue &&
                "text-red-400 font-semibold animate-pulse glow-blackhole-box"
            )}
          >
            {displayStatus}
          </span>
        </div>
      </section>
    </header>
  );
};

export default SubmissionHeader;
