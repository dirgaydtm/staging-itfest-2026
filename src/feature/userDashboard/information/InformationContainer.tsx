"use client";

import { motion } from "framer-motion";
import { useTeamProfile } from "../hooks/useTeamProfile";
import { stackUpStagger } from "../lib/motionVarians";
import Deadline from "./Deadline";
import Guidebook from "./Guidebook";

const InformationContainer = () => {
  const { data, loading, error } = useTeamProfile();

  if (loading) {
    return (
      <div className="font-leaguespartan text-light-blue text-center py-20">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="font-leaguespartan text-light-blue text-center py-20">
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
      className="flex w-full flex-col gap-6 lg:flex-row"
    >
      <motion.section
        className="w-full lg:w-1/2"
        variants={stackUpStagger}
        custom={1}
      >
        <Deadline
          title={
            isNotRegistered ? "Registration Deadline" : "Submission Deadline"
          }
          deadline={data.deadline}
        />
      </motion.section>

      <motion.section
        className="w-full lg:w-1/2"
        variants={stackUpStagger}
        custom={2}
      >
        <Guidebook competitionCategory={data.competition_category} />
      </motion.section>
    </motion.div>
  );
};

export default InformationContainer;
