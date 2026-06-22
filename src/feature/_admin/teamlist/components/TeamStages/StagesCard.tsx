import { TeamInformationData, TeamStagesData } from "@/api/services/admin";
import { getCurrentStagesStyle } from "@/shared/utils/currentStagesStyle";
import { formatDate } from "@/shared/utils/formatDate";
import { Calendar, Flag } from "lucide-react";

interface StagesCardProps {
  teamInfo: TeamInformationData;
  stageData: TeamStagesData;
}

const StagesCard = ({ teamInfo, stageData }: StagesCardProps) => {
  return (
    // Menggunakan pakem figma asli: bg-[#B0BFC7]/10 dengan border tipis transparan dan h-full
    <div className="p-6 sm:p-8 bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl text-white h-full flex flex-col gap-6">
      
      {/* Header Bagian Status Tahapan */}
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Section</span>
          <h2 className="text-lg font-bold tracking-wide">Timeline & Progress</h2>
        </div>
      </div>

      {/* Grid Layout Pembagian Area Status Kelolosan & Detail Tenggat Waktu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-2 flex-1">
        
        {/* Sisi Kiri: Status Alur Kelolosan */}
        <div className="flex flex-col gap-2 text-left bg-white/5 border border-white/5 p-4 rounded-xl h-full justify-center">
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-1">
            Status Progression
          </span>
          {stageData && (
            teamInfo.progress.stage_name === "Final" ? (
              <p className="text-green-400 font-bold text-sm leading-relaxed">
                Sudah lolos ke tahap final (terakhir)
              </p>
            ) : (
              <p className={`text-sm font-semibold leading-relaxed ${getCurrentStagesStyle(teamInfo.progress.stage_status)}`}>
                {teamInfo.progress.stage_status || "Belum ada status"}{" "}
              </p>
            )
          )}
        </div>

        {/* Sisi Kanan: Detail Nama Stage & Deadline Card */}
        <div className="flex flex-col gap-4 text-left h-full justify-center pl-0 md:pl-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">
              Active Phase
            </span>
            <div className="flex items-center gap-2.5 text-sm font-semibold tracking-wide text-white">
              <Flag size={16} className="text-[#B0BFC7]" />
              <span>{teamInfo.progress.stage_name || "-"}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">
              Closing Deadline
            </span>
            <div className="flex items-center gap-2.5 text-sm font-medium tracking-wide text-white/80">
              <Calendar size={16} className="text-[#B0BFC7]" />
              <span>Until {formatDate(teamInfo.progress.deadline)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StagesCard;