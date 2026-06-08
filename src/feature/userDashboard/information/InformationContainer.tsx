"use client";

import { motion } from "framer-motion";
// import { useTeamProfile } from "../hooks/useTeamProfile";
import { useCountdown } from "../hooks/useCountdown";
import { stackUpStagger } from "../lib/motionVarians";
import Deadline from "./Deadline";
import Guidebook from "./Guidebook";

const InformationContainer = () => {
  // === MOCK DATA (preview tanpa backend) ===
  const data = {
    competition_category: "Not Registered" as const,
    deadline: "2026-06-31T15:11:39+07:00",
  };
  const loading = false;
  const error = null;
  // === END MOCK ===

  // const { data, loading, error } = useTeamProfile();

  const countdown = useCountdown(data?.deadline ?? "");
  const isDeadlinePassed =
    countdown.days === "00" &&
    countdown.hours === "00" &&
    countdown.minutes === "00" &&
    countdown.seconds === "00";

  if (loading) {
    return (
      <div className="font-leaguespartan text-light-blue text-center py-16 sm:py-20">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="font-leaguespartan text-light-blue text-center py-16 sm:py-20">
        Gagal memuat data tim.
      </div>
    );
  }

  const isNotRegistered = data.competition_category === "Not Registered";

  return (
    <motion.div
      key="info"
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex w-full flex-col gap-4 sm:gap-5 lg:gap-6 lg:flex-row"
    >
      <motion.section
        className="w-full lg:w-1/2"
        variants={stackUpStagger}
        custom={1}
      >
        <Deadline
          title={isNotRegistered ? "Registration Deadline" : "Submission Deadline"}
          countdown={countdown}
        />
      </motion.section>

      <motion.section
        className="w-full lg:w-1/2"
        variants={stackUpStagger}
        custom={2}
      >
        <Guidebook
          competitionCategory={data.competition_category}
          isDeadlinePassed={isDeadlinePassed}
        />
      </motion.section>
    </motion.div>
  );
};

export default InformationContainer;