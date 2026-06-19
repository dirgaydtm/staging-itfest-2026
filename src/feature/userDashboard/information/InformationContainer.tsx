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

interface InformationContainerProps {
  teamData: TeamProfileResponse | null;
}

const InformationContainer = ({ teamData }: InformationContainerProps) => {
  const { isRegistered } = useDashboardTheme();

  const countdown = useCountdown(teamData?.deadline ?? "");
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
            competitionCategory={teamData?.competition_category ?? "Not Registered"}
            isDeadlinePassed={isDeadlinePassed}
          />
        </motion.section>
      </div>

      {/* Row 2: TeamProfile + Announcement (only when registered) */}
      {isRegistered && teamData && (
        <div className="flex w-full flex-col gap-4 sm:gap-5 lg:gap-6 lg:flex-row lg:items-start">
          <motion.section
            className="w-full lg:w-1/2"
            variants={stackUpStagger}
            custom={3}
          >
            <TeamProfile profile={teamData} />
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