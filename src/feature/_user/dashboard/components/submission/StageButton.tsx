import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { IStage } from "../../types/submission";
import SubmitLinkModal from "./SubmitLinkModal";

interface StageActionButtonProps {
  isCurrent: boolean;
  isPast: boolean;
  status: IStage["status_submission"];
}

export const StageActionButton = ({
  isCurrent,
  isPast,
  status,
}: StageActionButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (link: string) => {
    console.log("Link yang dikirim:", link);
    // TODO: kirim ke API
  };

  if (isCurrent) {
    return (
      <>
        <Button
          variant={"primary"}
          size={"small"}
          className="text-xl w-32"
          onClick={() => setIsModalOpen(true)}
        >
          Submit
        </Button>

        <SubmitLinkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </>
    );
  }

  if (isPast) {
    return (
      <Button variant={"disabled"} size={"small"} className="text-xl w-32">
        {status}
      </Button>
    );
  }

  return (
    <Button variant={"disabled"} size={"small"} className="text-xl w-32">
      Waiting...
    </Button>
  );
};
