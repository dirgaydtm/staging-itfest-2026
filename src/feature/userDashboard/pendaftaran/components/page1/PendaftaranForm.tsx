"use client";

import React from "react";
import ChooseLomba from "./ChooseLomba";
import FormChipHeader from "../shared/FormChipHeader";

interface PendaftaranFormProps {
  selectedCompetition: number | null;
  onCompetitionSelect: (competitionId: number) => void;
  onNext: () => void;
}

const PendaftaranForm: React.FC<PendaftaranFormProps> = ({
  selectedCompetition,
  onCompetitionSelect,
  onNext,
}) => {
  const handleNext = () => {
    if (selectedCompetition) onNext();
  };

  const baseBtn =
    "w-full max-w-xs md:max-w-sm py-2.5 rounded-xl border font-leaguespartan font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-md";

  return (
    <div className="flex-1 flex flex-col gap-8">
      <FormChipHeader title="SELECT COMPETITION" />

      <ChooseLomba
        selectedCompetition={selectedCompetition}
        onCompetitionSelect={onCompetitionSelect}
      />

      <div className="mt-auto pt-4 flex justify-center">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedCompetition}
          className={`${baseBtn} ${
            selectedCompetition
              ? "bg-white/15 border-white/30 hover:bg-white/25 text-white active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer"
              : "bg-white/5 border-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PendaftaranForm;