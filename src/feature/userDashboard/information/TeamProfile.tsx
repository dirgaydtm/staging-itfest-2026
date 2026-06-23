"use client";

import { useEffect, useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastTouchY = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollTop += e.deltaY;
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const delta = lastTouchY - y;
      lastTouchY = y;
      e.preventDefault();
      el.scrollTop += delta;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <DashboardCard title="Team Profile">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto overscroll-none touch-pan-y pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
      >
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
      </div>
    </DashboardCard>
  );
};

export default TeamProfile;
