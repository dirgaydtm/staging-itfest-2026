import { TeamInformationData } from "@/api/services/admin";
import { IdCardIcon } from "lucide-react";

interface TeamDetailsCardProps {
  teamInfo: TeamInformationData;
  onCheckStudentCard?: () => void;
}

const TeamInformationCard = ({
  teamInfo,
  onCheckStudentCard,
}: TeamDetailsCardProps) => {
  const members = Array(2)
    .fill({ full_name: null, student_number: null })
    .map((defaultMember, index) => {
      if (teamInfo.members && teamInfo.members[index]) {
        return teamInfo.members[index];
      }
      return defaultMember;
    });
  return (
    <div className="p-8 bg-blue-500 rounded-4xl text-white border-2 border-purple-300 h-full">
      <h2 className="text-xl font-bold mb-2">Team Name</h2>
      <p className="text-2xl font-semibold text-cyan-400 mb-6">
        {teamInfo.team_name || "[Team Name]"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <h3 className="font-bold text-lg">Team Leader</h3>
          <p className="text-gray-300">Name: {teamInfo.leader_name || "-"}</p>
          <p className="text-gray-300">
            Student ID: {teamInfo.student_number || "-"}
          </p>
        </div>

        {/* Mapping untuk anggota tim */}
        {members.map((member, index) => (
          <div
            key={index}
            className={`${!member.full_name ? "opacity-50" : ""}`}
          >
            <h3 className="font-bold text-lg">Team Member {index + 1}</h3>
            <p className="text-gray-300">Name: {member.full_name || "-"}</p>
            <p className="text-gray-300">
              Student ID: {member.student_number || "-"}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-xl font-bold my-2">Check Student Card</h4>
        <div
          onClick={onCheckStudentCard}
          title="Check Student Card"
          className="group p-2.5 w-fit border-2 border-purple-300  dark:bg-slate-800 rounded-lg  dark:border-slate-700 shadow-sm cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 hover:border-purple-100 dark:hover:border-blue-600"
        >
          <IdCardIcon
            size={32}
            className="text-purple-100  dark:text-slate-400 group-hover:text-purple-200 dark:group-hover:text-blue-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamInformationCard;
