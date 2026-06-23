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
    // Menggunakan pakem figma asli: bg-[#B0BFC7]/10 dengan border tipis transparan
    <div className="p-6 sm:p-8 bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl text-white h-full flex flex-col gap-6">
      
      <div>
        <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-1">
          Team Name
        </span>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          {teamInfo.team_name || "-"}
        </h2>
      </div>

      {/* Grid Informasi Inti Anggota Tim */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-white/5 py-6">
        <div>
          <h3 className="font-bold text-base text-white mb-2">Team Leader</h3>
          <div className="space-y-1 text-sm text-white/70">
            <p><span className="text-white/40 font-medium">Name:</span> {teamInfo.leader_name || "-"}</p>
            <p><span className="text-white/40 font-medium">NIM:</span> {teamInfo.student_number || "-"}</p>
          </div>
        </div>

        {members.map((member, index) => (
          <div
            key={index}
            className={`transition-opacity duration-200 ${!member.full_name ? "opacity-40" : ""}`}
          >
            <h3 className="font-bold text-base text-white mb-2">Team Member {index + 1}</h3>
            <div className="space-y-1 text-sm text-white/70">
              <p><span className="text-white/40 font-medium">Name:</span> {member.full_name || "-"}</p>
              <p><span className="text-white/40 font-medium">NIM:</span> {member.student_number || "-"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bagian Bawah: Kontak Pemimpin Tim */}
      <div className="flex flex-col gap-3 mt-auto">
        <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">
          Leader Contact Information
        </h4>
        
        <div className="flex flex-wrap gap-4 w-full">
          {/* Tombol Cek Kartu Mahasiswa (KTM) */}
          <button
            type="button"
            onClick={onCheckStudentCard}
            title="Check Student Card"
            className="group p-3 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-all duration-300"
          >
            <IdCardIcon
              size={20}
              className="text-white/70 group-hover:text-white transition-colors"
            />
          </button>

          {/* Tombol Akses WhatsApp Link */}
          <Link
            href={`https://wa.me/${
              teamInfo.phone_number && teamInfo.phone_number.startsWith("0")
                ? "62" + teamInfo.phone_number.slice(1)
                : teamInfo.phone_number || ""
            }`}
            title="Contact WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-4 py-2.5 flex items-center justify-center gap-2.5 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40 text-green-400 font-bold text-xs rounded-xl transition-all duration-300"
          >
            <PhoneCall size={16} className="transition-transform group-hover:scale-110" />
            <span className="tracking-wide">{teamInfo.phone_number || "No Phone Number"}</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default TeamInformationCard;