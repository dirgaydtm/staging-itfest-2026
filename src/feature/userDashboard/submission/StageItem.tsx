import { cn } from "@/shared/utils/cn";
import { IStage } from "../types/submission";
import { StageActionButton } from "./StageButton";
import { PuzzleIcon } from "../layout/PuzzleIcon"; 
import { PUZZLES_ITEMS } from "../layout/puzzles"; 
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

  const currentDate = new Date();
  const deadline = stage.stage_deadline ? new Date(stage.stage_deadline) : null;
  const isManuallyOverdue = deadline ? currentDate > deadline : false;

  const isActuallyOverdue =
    isCurrent &&
    isManuallyOverdue && 
    (!stage.status_submission ||
      ![
        "diproses",
        "lolos",
        "terverifikasi",
        "tidak lolos",
        "ditolak",
      ].includes(stage.status_submission));

  const puzzleData = PUZZLES_ITEMS[stageIndex % PUZZLES_ITEMS.length];

  return (
    <div
      className={cn("relative flex flex-col items-center justify-center", isDesktop && "w-24")}
    >
      <PuzzleIcon
        icon={puzzleData.icon}
        isActive={isPast || isCurrent}
        isOverdue={isActuallyOverdue}
        themeColorClass={theme.accentText}
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