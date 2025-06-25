"use client";

import { motion } from "framer-motion";
import { TeamProfileResponse } from "../types/teamProfile";
import { SubmissionsResponse } from "../types/submission";
import SubmissionHeader from "./submission/SubmissionHeader";
import { floatDownSoft, stackUpStagger } from "../lib/motionVarians";
import SubmissionStages from "./submission/SubmissionStages";
import SubmissionBottom from "./submission/SubmissionBottom";
interface SubmissionViewProps {
  teamData: TeamProfileResponse;
  submissionsData: SubmissionsResponse | null;
}

export const SubmissionView = ({
  teamData,
  submissionsData,
}: SubmissionViewProps) => {
  let currentStatus = "Loading Status...";
  if (submissionsData) {
    if (submissionsData.current_stageID === 0) {
      currentStatus = submissionsData.payment_status;
    } else {
      const activeStage = submissionsData.stages.find(
        (stage) => stage.stage_name === submissionsData.current_stage
      );
      currentStatus = activeStage?.status_submission || "Waiting...";
    }
  }

  return (
    <motion.div key="submit" initial="hidden" animate="visible" exit="hidden">
      <motion.section className="w-full mb-8" variants={floatDownSoft}>
        <SubmissionHeader
          competitionCategory={teamData.competition_category}
          status={currentStatus}
        />
      </motion.section>

      <motion.section
        className="w-full mb-8"
        variants={stackUpStagger}
        custom={1}
      >
        {submissionsData && (
          <SubmissionStages submissionsData={submissionsData} />
        )}
      </motion.section>

      <motion.section className="w-full" variants={stackUpStagger} custom={2}>
        <SubmissionBottom />
      </motion.section>
    </motion.div>
  );
};
