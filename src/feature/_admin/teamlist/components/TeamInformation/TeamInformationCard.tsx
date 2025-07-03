import { TeamInformationData } from "@/api/services/admin";
import { IdCardIcon, PhoneCall } from "lucide-react";
import Link from "next/link";

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
        <h4 className="text-xl font-bold my-2">Leader Contact Information</h4>
        <div className="flex gap-4  w-1/2 ">
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
          <Link
            href={`https://wa.me/${
              teamInfo.phone_number && teamInfo.phone_number.startsWith("0")
                ? "62" + teamInfo.phone_number.slice(1)
                : teamInfo.phone_number || ""
            }`}
            title="Contact WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative gap-2  p-3  flex justify-center items-center border-2 border-green-300 dark:bg-slate-800 rounded-lg dark:border-slate-700 shadow-sm cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 hover:border-green-100 dark:hover:border-green-600"
          >
            <PhoneCall />
            <span className=" ">{teamInfo.phone_number}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamInformationCard;
