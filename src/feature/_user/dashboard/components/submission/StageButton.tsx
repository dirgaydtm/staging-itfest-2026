"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { IStage } from "../../types/submission";
import SubmitLinkModal from "./modal/SubmitLinkModal";
import SubmitPaymentModal from "./modal/UploadPaymentModal";
import StatusModal from "./modal/StatusModal";
import { useStageSubmission } from "../../hooks/useStageSubmission";

interface StageActionButtonProps {
  isCurrent: boolean;
  isPast: boolean;
  status: IStage["status_submission"];
  stageName: string;
  submission_deadline: string;
}

export const StageActionButton = ({
  isCurrent,
  status,
  stageName,
  submission_deadline,
}: StageActionButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    isLoading,
    handleSubmit,
    submissionSuccess,
    showStatusModal,
    setShowStatusModal,
  } = useStageSubmission(stageName);

  const isDeadlineOver = submission_deadline
    ? new Date(submission_deadline) < new Date()
    : false;

  if (isCurrent) {
    if (["diproses", "tidak lolos", "ditolak"].includes(status)) {
      return (
        <Button
          variant="disabled"
          size="small"
          className="text-lg w-32 h-12"
          disabled
        >
          {status}
        </Button>
      );
    }
    if (isDeadlineOver) {
      return (
        <Button
          variant="disabled"
          size="small"
          className="text-lg w-32 h-12"
          disabled
        >
          Late..
        </Button>
      );
    }

    return (
      <>
        <Button
          variant="primary"
          size="small"
          className="text-lg w-32 h-12"
          onClick={() => setModalOpen(true)}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>

        {stageName === "Payment" ? (
          <SubmitPaymentModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ) : (
          <SubmitLinkModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}

        <StatusModal
          isOpen={showStatusModal}
          isSuccess={submissionSuccess === true}
          onClose={() => setShowStatusModal(false)}
        />
      </>
    );
  }

  return (
    <Button variant="disabled" size="small" className="text-lg w-32 h-12">
      {isDeadlineOver ? "late.." : status || "waiting.."}
    </Button>
  );
};
