import { useState } from "react";
import { userService } from "@/api/services/user";

export const useStageSubmission = (stageName: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleSubmit = async (data: string | File) => {
    setIsLoading(true);
    try {
      if (stageName === "Payment") {
        const file = data as File;
        if (!file) throw new Error("No file selected");

        if (file.size > 5 * 1024 * 1024) {
          throw new Error("File too large");
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
          throw new Error("Invalid file type");
        }

        const formData = new FormData();
        formData.append("payment", file);
        await userService.postPayment(formData);
      } else {
        await userService.postSubmission(data as string);
      }

      setSubmissionSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmissionSuccess(false);
    } finally {
      setIsLoading(false);
      setShowStatusModal(true);
    }
  };

  return {
    isLoading,
    submissionSuccess,
    showStatusModal,
    setShowStatusModal,
    handleSubmit,
  };
};
