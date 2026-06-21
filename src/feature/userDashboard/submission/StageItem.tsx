import { cn } from "@/shared/utils/cn";
import { IStage } from "../types/submission";
import { StageActionButton } from "./StageButton";
import { PuzzleIcon } from "../layout/PuzzleIcon"; // Sesuaikan path import
import { PUZZLES_ITEMS } from "../layout/puzzles"; // Sesuaikan path import
import { useDashboardTheme } from "../layout/DashboardThemeContext";

interface StageItemProps {
  stage: IStage;
  isCurrent: boolean;
  isPast: boolean;
  isLast: boolean;
  isDesktop: boolean;
  isDeadlineOver: boolean | string;
  stageIndex: number;
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
  isDesktop,
  isDeadlineOver,
  stageIndex,

}: StageItemProps) => {
  const { theme } = useDashboardTheme();

  const stageName =
    stage.stage_name === "" ? stage.status_submission : stage.stage_name;

  const showFinalistText =
    stage.stage_name === "Proposal" && stage.status_submission === "lolos";

  // Manual deadline check for debugging
  const currentDate = new Date();
  const deadline = stage.stage_deadline ? new Date(stage.stage_deadline) : null;
  const isManuallyOverdue = deadline ? currentDate > deadline : false;

  // Check if this stage is truly overdue (deadline passed AND no progress made)
  const isActuallyOverdue =
    isCurrent &&
    isManuallyOverdue && // Use manual check instead of prop
    (!stage.status_submission ||
      ![
        "diproses",
        "lolos",
        "terverifikasi",
        "tidak lolos",
        "ditolak",
      ].includes(stage.status_submission));

  // Debug logging

  const puzzleData = PUZZLES_ITEMS[stageIndex % PUZZLES_ITEMS.length];

  return (
    <div
      className={cn("relative flex flex-col items-center justify-center", isDesktop && "w-24")}
    >
      {showFinalistText && (
        <p
          className={cn(
            "absolute text-glow-yellow font-bold whitespace-nowrap",
            isDesktop ? "text-xl -top-12" : "text-lg bottom-30",
            "left-1/2 -translate-x-1/2"
          )}
        >
          Congrats, You are a finalist
        </p>
      )}
      <PuzzleIcon
        icon={puzzleData.icon}
        isActive={isPast || isCurrent}
        isOverdue={isActuallyOverdue}
        themeColorClass={theme.accentText} // Mengambil warna tema (merah/kuning/biru pudar)
      />

      <div className="mt-8 text-center">
        <div className="h-14 md:h-16 flex items-center justify-center mb-2">
        <p
          className={cn(
            "text-white font-bold mb-2",
            isDesktop ? "text-base" : "text-lg"
          )}
        >
          {stageName}
        </p>
        </div>
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
