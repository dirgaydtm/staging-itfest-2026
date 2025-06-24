import { TeamInformationData, TeamStagesData } from "@/api/services/admin";
import { getCurrentStagesStyle } from "@/shared/utils/currentStagesStyle";
import { formatDate } from "@/shared/utils/formatDate";

interface StagesCardProps {
  teamInfo: TeamInformationData;
  stageData: TeamStagesData; // Adjust type as needed based on your data structure
}

const StagesCard = ({ teamInfo, stageData }: StagesCardProps) => {
  return (
    <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 text-center">
      <h2 className="text-xl font-bold mb-2">Stages</h2>
      <div className="text-center py-2 rounded-lg mb-4">
        {stageData && (
          teamInfo.progress.stage_name === "Final" ? (
            <p className="text-green-400 font-bold">
              Sudah lolos ke tahap final (terakhir)
            </p>
          ) : (
            <p className={getCurrentStagesStyle(teamInfo.progress.stage_status)}>
              {teamInfo.progress.stage_status || "Belum ada status"} ke{" "}
              {stageData.next_stage ? stageData.next_stage : "(tidak ada)"}
            </p>
          )
        )}
      </div>
      <div className="text-center">
        <p className="text-lg font-bold">{teamInfo.progress.stage_name}</p>
        <p className="text-gray-200 text-sm">
          Until {formatDate(teamInfo.progress.deadline)}
        </p>
      </div>
    </div>
  );
};

export default StagesCard;