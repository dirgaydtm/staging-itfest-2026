import { cn } from "@/shared/utils/cn";
import { useDashboardTheme } from "../layout/DashboardThemeContext"; // Sesuaikan path titik-titiknya jika error

interface StageConnectorProps {
  isPast: boolean;
  isCurrent: boolean;
  isDeadlineOver: boolean | string;
  orientation: "vertical" | "horizontal";
}

export const StageConnector = ({
  isPast,
  orientation,
  isCurrent,
  isDeadlineOver,
}: StageConnectorProps) => {
  const isHorizontal = orientation === "horizontal";
  
  // 1. Panggil tema saat ini
  const { theme } = useDashboardTheme();
  
  const isActive = isCurrent || isPast;

  return (
    <div
      className={cn(
        "rounded-full transition-all duration-500 lg:-translate-y-25",
        {
          "w-1 h-12 mt-6": !isHorizontal,
          "h-1 w-12 mx-6": isHorizontal,
        },
        
        !isActive && !isDeadlineOver && cn(theme.accentText, "bg-current opacity-60"),

        isActive && !isDeadlineOver && "bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]",

        isDeadlineOver && "bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
      )}
    />
  );
};