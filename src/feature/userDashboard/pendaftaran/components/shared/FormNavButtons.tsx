"use client";

import React from "react";
import { buttonDisabledClass } from "@/feature/userDashboard/layout/themes";

interface FormNavButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

const FormNavButtons: React.FC<FormNavButtonsProps> = ({
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = "Next",
  backLabel = "Back",
}) => {
  const baseBtn =
    "flex-1 py-3 rounded-2xl border-[0.5px] border-light-blue transition-all duration-300 font-leaguespartan font-bold text-base text-light-green";

  return (
    <div className="flex gap-3 w-full">
      <button
        type="button"
        onClick={onBack}
        className={`${baseBtn} bg-light-active-green/20 hover:scale-[1.02] active:scale-95`}
      >
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`${baseBtn} ${
          nextDisabled
            ? buttonDisabledClass
            : "bg-light-active-green/20 hover:scale-[1.02] active:scale-95"
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default FormNavButtons;