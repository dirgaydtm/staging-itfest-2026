// src/features/submissions/components/StageItem.tsx

import { cn } from "@/shared/utils/cn";
import { IStage } from "../../types/submission";
import { StageActionButton } from "./StageButton";


interface StageItemProps {
  stage: IStage;
  isCurrent: boolean;
  isPast: boolean;
  isDesktop: boolean;
}

// Helper untuk format tanggal agar JSX lebih bersih
const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const StageItem = ({ stage, isCurrent, isPast, isDesktop }: StageItemProps) => {
  const stageName = stage.stage_name === "" ? stage.status_submission : stage.stage_name;

  return (
    <div className={cn("flex flex-col items-center", isDesktop && "w-32")}>
      <div
        className={cn(
          "cursor-pointer rotate-45 transition-all duration-300",
          isCurrent || isPast ? "bg-white glow-white" : "bg-purple-200",
          isDesktop ? "w-16 h-16" : "w-14 h-14"
        )}
      />

      <div className="mt-8 text-center">
        <p className={cn("text-white font-bold mb-2", isDesktop ? "text-2xl" : "text-lg")}>
          {stageName}
        </p>

        <p className={cn("text-white font-normal opacity-75 mb-4", isDesktop ? "text-xl" : "text-md")}>
          {formatDate(stage.stage_deadline)}
        </p>

        <div className="flex justify-center">
          <StageActionButton isCurrent={isCurrent} isPast={isPast} status={stage.status_submission} />
        </div>
      </div>
    </div>
  );
};