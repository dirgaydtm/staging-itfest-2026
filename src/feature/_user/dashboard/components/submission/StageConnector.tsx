import { cn } from "@/shared/utils/cn";

interface StageConnectorProps {
  isPast: boolean;
  orientation: "vertical" | "horizontal";
}

export const StageConnector = ({ isPast, orientation }: StageConnectorProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "rounded-full transition-all duration-300 lg:-translate-y-22",
        isPast ? "bg-white" : "bg-purple-200",
        {
          "w-1 h-12 mt-6": !isHorizontal,
          "h-1 w-20 lg:w-24 mx-6": isHorizontal,
        }
      )}
    />
  );
};