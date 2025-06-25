import { cn } from "@/shared/utils/cn";
import { IStage } from "../../types/submission";
import { StageActionButton } from "./StageButton";

interface StageItemProps {
  stage: IStage;
  isCurrent: boolean;
  isPast: boolean;
  isLast: boolean;
  isDesktop: boolean;
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
}: StageItemProps) => {
  const stageName =
    stage.stage_name === "" ? stage.status_submission : stage.stage_name;

  return (
    <div className={cn("flex flex-col items-center", isDesktop && "w-24")}>
      <div
        className={cn(
          "cursor-pointer rotate-45 transition-all duration-300 overflow-x-auto w-full",
          isCurrent || isPast || stage.status_submission === "lolos"
            ? "bg-white glow-white"
            : "bg-purple-200",
          stage.status_submission === "lolos" && isLast
            ? "bg-yellow-400 glow-yellow"
            : "",
          stage.status_submission === "tidak lolos"
            ? "bg-red-400 glow-red"
            : "",
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
          />
        </div>
      </div>
    </div>
  );
};
