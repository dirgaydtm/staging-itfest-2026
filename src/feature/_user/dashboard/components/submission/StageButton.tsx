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
}

export const StageActionButton = ({
  isCurrent,
  status,
  stageName,
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
    if (["diproses", "tidak lolos", "lolos"].includes(status)) {
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
      {status || "waiting.."}
    </Button>
  );
};
