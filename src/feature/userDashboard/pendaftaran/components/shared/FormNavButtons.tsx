"use client";

import React from "react";

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
    "flex-1 py-2.5 rounded-xl border font-leaguespartan font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-md";

  const activeBtn =
    "bg-white/15 border-white/30 hover:bg-white/25 text-white active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer";

  const disabledBtn =
    "bg-white/5 border-white/5 text-white/30 cursor-not-allowed";

  return (
    <div className="flex gap-3 w-full">
      <button
        type="button"
        onClick={onBack}
        className={`${baseBtn} ${activeBtn}`}
      >
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={`${baseBtn} ${nextDisabled ? disabledBtn : activeBtn}`}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default FormNavButtons;