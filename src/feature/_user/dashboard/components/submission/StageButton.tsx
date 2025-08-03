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
  isDeadlineOver: boolean | string;
}

export const StageActionButton = ({
  isCurrent,
  status,
  stageName,
  isDeadlineOver,
}: StageActionButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    isLoading,
    handleSubmit,
    submissionSuccess,
    showStatusModal,
    setShowStatusModal,
  } = useStageSubmission(stageName);

  if (isCurrent) {
    // If status shows progress/completion, show the actual status regardless of deadline
    if (
      ["diproses", "tidak lolos", "ditolak", "lolos", "terverifikasi"].includes(
        status
      )
    ) {
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

    // Only show "Late" if deadline is over AND no progress has been made
    if (
      isDeadlineOver &&
      (!status || status === "waiting.." || status === "")
    ) {
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

    if (stageName === "Final") {
      const currentDate = new Date();
      const submissionStart = new Date("2025-07-17");
      const submissionEnd = new Date("2025-07-20");

      if (currentDate < submissionStart) {
        return (
          <Button
            variant="disabled"
            size="small"
            className="text-xs w-32 h-12"
            disabled
          >
            tunggu submission dibuka
          </Button>
        );
      }

      if (currentDate >= submissionEnd) {
        return (
          <Button
            variant="disabled"
            size="small"
            className="text-xs w-32 h-12"
            disabled
          >
            submission ditutup
          </Button>
        );
      }
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

  // For non-current stages, always show the actual status
  return (
    <Button variant="disabled" size="small" className="text-lg w-32 h-12">
      {status || "waiting.."}
    </Button>
  );
};
