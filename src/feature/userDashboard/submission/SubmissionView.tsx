"use client";

import { motion } from "framer-motion";
import { TeamProfileResponse } from "../types/teamProfile";
import { SubmissionsResponse } from "../types/submission";
import SubmissionHeader from "../submission/SubmissionHeader";
import { floatDownSoft, stackUpStagger } from "../lib/motionVarians";
import SubmissionStages from "../submission/SubmissionStages";
import SubmissionBottom from "../submission/SubmissionBottom";

interface SubmissionViewProps {
  teamData: TeamProfileResponse;
  submissionsData: SubmissionsResponse | null;
}

export const SubmissionView = ({
  teamData,
  submissionsData,
}: SubmissionViewProps) => {
  let currentStatus = "Loading Status...";
  let isDeadlineOver: boolean | string = false;
  let currentStage: string | undefined = undefined;
  let nextDeadline: string | null = null;
  console.log(submissionsData);
  if (submissionsData) {
    const now = new Date();

    if (submissionsData.current_stageID === 0) {
      currentStatus = submissionsData.payment_status;
      isDeadlineOver = false;
    } else {
      // Set current stage
      currentStage = submissionsData.current_stage;

      const activeStage = submissionsData.stages.find(
        (stage) => stage.stage_name === submissionsData.current_stage
      );

      if (activeStage) {
        currentStatus = activeStage.status_submission || "Waiting...";
        nextDeadline = activeStage.stage_deadline || null;

        const completedStatuses = [
          "lolos",
          "diproses",
          "terverifikasi",
          "selesai",
        ];
        const hasDeadline = activeStage.stage_deadline;
        const isOverdue =
          hasDeadline && new Date(activeStage.stage_deadline) < now;
        const isNotCompleted = !completedStatuses.includes(
          activeStage.status_submission?.toLowerCase() || ""
        );

        isDeadlineOver = isOverdue && isNotCompleted;
      }
    }
  }

  return (
    <motion.div key="submit" initial="hidden" animate="visible" exit="hidden">
      <motion.section className="w-full mb-8" variants={floatDownSoft}>
        <SubmissionHeader
          competitionCategory={teamData.competition_category}
          status={currentStatus}
          isDeadlineOver={isDeadlineOver}
          currentStage={currentStage}
          nextDeadline={nextDeadline}
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
