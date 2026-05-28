"use client";

import React, { useState } from "react";
import { useTeamProfile } from "../hooks/useTeamProfile";
import { useSubmissions } from "../hooks/useSubmission";
import SideButtons from "../components/information/SideButton";
import { motion, AnimatePresence } from "framer-motion";
import { stackUpStagger } from "../lib/motionVarians";
import { InformationView } from "../components/InformationView";
import { SubmissionView } from "../components/SubmissionView";

const DashboardContainer = () => {
  const { data: teamData, error: teamError } = useTeamProfile();
  const { data: submissionsData, error: submissionsError } = useSubmissions();

  const [active, setActive] = useState<"info" | "submit">("info");
  const isNotRegistered = teamData?.competition_category === "Not Registered";

  if (teamError || (active === "submit" && submissionsError)) {
    return <div className="relative mycontainer h-screen"></div>;
  }
  if (!teamData) {
    return <div className="relative mycontainer h-screen"></div>;
  }

  return (
    <div className="mycontainer relative min-h-screen pt-40 pb-10 ">
      <motion.div
        className="flex flex-col lg:flex-row gap-8 lg:items-start items-center"
        initial="hidden"
        animate="visible"
        variants={stackUpStagger}
      >
        <motion.section
          className="lg:w-2xs w-full"
          variants={stackUpStagger}
          custom={1}
        >
          <SideButtons
            active={active}
            onChange={setActive}
            disabledSubmit={isNotRegistered}
          />
        </motion.section>

        <motion.main className="flex flex-col gap-6 w-full">
          <AnimatePresence mode="wait">
            {active === "info" ? (
              <InformationView
                teamData={teamData}
                isNotRegistered={isNotRegistered}
              />
            ) : (
              <SubmissionView
                teamData={teamData}
                submissionsData={submissionsData}
              />
            )}
          </AnimatePresence>
        </motion.main>
      </motion.div>
    </div>
  );
};

export default DashboardContainer;
