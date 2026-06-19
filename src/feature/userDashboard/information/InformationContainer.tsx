"use client";

import { motion } from "framer-motion";
import { useCountdown } from "../hooks/useCountdown";
import { stackUpStagger } from "../lib/motionVarians";
import { useDashboardTheme } from "../layout/DashboardThemeContext";
import { TeamProfileResponse } from "../types/teamProfile";
import Deadline from "./Deadline";
import Guidebook from "./Guidebook";
import TeamProfile from "./TeamProfile";
import Announcement from "./Announcement";

// DUMMY DATA — ganti dengan useTeamProfile() saat integrasi backend
const DUMMY_PROFILE: TeamProfileResponse = {
  team_name: "Tim Hebat",
  leader_name: "Budi Santoso",
  student_number: "225150400111001",
  competition_category: "UI/UX",
  deadline: "2026-12-31T23:59:59+07:00",
  members: [
    { full_name: "Andi Pratama", student_number: "225150400111002" },
    { full_name: "Citra Dewi", student_number: "225150400111003" },
  ],
};

const InformationContainer = () => {
  const { isRegistered, selectedCompetition } = useDashboardTheme();

  const profile: TeamProfileResponse = {
    ...DUMMY_PROFILE,
    competition_category: isRegistered
      ? selectedCompetition === "bp"
        ? "BP"
        : selectedCompetition === "dml"
        ? "DML"
        : "UI/UX"
      : "Not Registered",
  };

  const countdown = useCountdown(profile.deadline);
  const isDeadlinePassed =
    countdown.days === "00" &&
    countdown.hours === "00" &&
    countdown.minutes === "00" &&
    countdown.seconds === "00";

  return (
    <motion.div
      key={isRegistered ? "registered" : "unregistered"}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex w-full flex-col gap-4 sm:gap-5 lg:gap-6"
    >
      {/* Row 1: Deadline + Guidebook */}
      <div className="flex w-full flex-col gap-4 sm:gap-5 lg:gap-6 lg:flex-row">
        <motion.section
          className="w-full lg:w-1/2"
          variants={stackUpStagger}
          custom={1}
        >
          <Deadline
            title={isRegistered ? "Submission Deadline" : "Registration Deadline"}
            countdown={countdown}
          />
        </motion.section>

        <motion.section
          className="w-full lg:w-1/2"
          variants={stackUpStagger}
          custom={2}
        >
          <Guidebook
            competitionCategory={profile.competition_category}
            isDeadlinePassed={isDeadlinePassed}
          />
        </motion.section>
      </div>

      {/* Row 2: TeamProfile + Announcement (hanya saat registered) */}
      {isRegistered && (
        <div className="flex w-full flex-col gap-4 sm:gap-5 lg:gap-6 lg:flex-row lg:items-start">
          <motion.section
            className="w-full lg:w-1/2"
            variants={stackUpStagger}
            custom={3}
          >
            <TeamProfile profile={profile} />
          </motion.section>

          <motion.section
            className="w-full lg:w-1/2"
            variants={stackUpStagger}
            custom={4}
          >
            <Announcement />
          </motion.section>
        </div>
      )}
    </motion.div>
  );
};

export default InformationContainer;