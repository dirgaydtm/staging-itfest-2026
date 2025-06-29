import { cn } from "@/shared/utils/cn";
import { IStage } from "../../types/submission";
import { StageActionButton } from "./StageButton";

interface StageItemProps {
  stage: IStage;
  isCurrent: boolean;
  isPast: boolean;
  isLast: boolean;
  isDesktop: boolean;
  isDeadlineOver: boolean;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const StageItem = ({
  stage,
  isCurrent,
  isPast,
  isLast,
  isDesktop,
  isDeadlineOver,
}: StageItemProps) => {
  const stageName =
    stage.stage_name === "" ? stage.status_submission : stage.stage_name;

  const showFinalistText =
    stage.stage_name === "Proposal" && stage.status_submission === "lolos";

  return (
    <div
      className={cn("relative flex flex-col items-center", isDesktop && "w-24")}
    >
      {showFinalistText && (
        <p
          className={cn(
            "absolute text-glow-yellow   font-bold whitespace-nowrap",
            isDesktop ? "text-xl -top-12" : "text-lg  bottom-30",
            "left-1/2 -translate-x-1/2"
          )}
        >
          Congrats, You are a finalist
        </p>
      )}

      <div
        className={cn(
          "cursor-pointer rotate-45 transition-all duration-300 overflow-x-auto w-full",
          "bg-purple-200",
          isCurrent && "bg-white glow-white",
          isPast &&
            (stage.status_submission === "lolos" ||
              stage.status_submission === "terverifikasi") &&
            "bg-white glow-whites",
          isCurrent &&
            stage.status_submission === "diproses" &&
            "bg-white glow-whites animate-pulse",
          (stage.stage_name === "Proposal" &&
            stage.status_submission === "lolos") ||
            (stage.stage_name === "Final" && isCurrent)
            ? "glow-yellow"
            : "",
          stage.status_submission === "lolos" && isLast ? "" : "",
          (stage.status_submission === "tidak lolos" ||
            stage.status_submission === "ditolak") &&
            "bg-red-400 glow-red",
          isDeadlineOver && "glow-blackhole-box purple-particles",
          isDesktop ? "w-12 h-12" : "w-16 h-16"
        )}
      />

      <div className="mt-8 text-center">
        <p
          className={cn(
            "text-white font-bold mb-2",
            isDesktop ? "text-xl" : "text-lg"
          )}
        >
          {stageName}
        </p>

        <p
          className={cn(
            "text-white font-normal opacity-75 mb-4",
            isDesktop ? "text-lg" : "text-md"
          )}
        >
          {formatDate(stage.stage_deadline)}
        </p>

        <div className="flex justify-center">
          <StageActionButton
            isCurrent={isCurrent}
            isPast={isPast}
            status={stage.status_submission}
            stageName={stage.stage_name}
            submission_deadline={stage.stage_deadline}
            isDeadlineOver={isDeadlineOver}
          />
        </div>
      </div>
    </div>
  );
};
