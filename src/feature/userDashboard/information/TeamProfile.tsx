"use client";

import { TeamProfileResponse } from "../types/teamProfile";
import DashboardCard from "../layout/DashboardCard";

interface Props {
  profile: TeamProfileResponse;
}

const MemberBlock = ({
  title,
  name,
  studentId,
}: {
  title: string;
  name: string;
  studentId: string;
}) => (
  <div className="space-y-1">
    <p className="font-bold text-base sm:text-lg">{title}</p>
    <div className="flex gap-2 text-sm sm:text-base text-light-blue/80">
      <span className="w-20 shrink-0">Name</span>
      <span>:</span>
      <span>{name || "-"}</span>
    </div>
    <div className="flex gap-2 text-sm sm:text-base text-light-blue/80">
      <span className="w-20 shrink-0">Student ID</span>
      <span>:</span>
      <span>{studentId || "-"}</span>
    </div>
  </div>
);

const TeamProfile = ({ profile }: Props) => {
  return (
    <DashboardCard title="Team Profile">
      <p className="font-bold text-base sm:text-lg mb-6">
        [ {profile.team_name || "Team Name"} ]
      </p>
      <div className="flex flex-col gap-6">
        <MemberBlock
          title="Team Leader"
          name={profile.leader_name}
          studentId={profile.student_number}
        />
        <MemberBlock
          title="Team Member 1"
          name={profile.members?.[0]?.full_name ?? ""}
          studentId={profile.members?.[0]?.student_number ?? ""}
        />
        <MemberBlock
          title="Team Member 2"
          name={profile.members?.[1]?.full_name ?? ""}
          studentId={profile.members?.[1]?.student_number ?? ""}
        />
      </div>
    </DashboardCard>
  );
};

export default TeamProfile;