"use client";

import React from "react";
import ChooseLomba from "./ChooseLomba";

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

  return (
    <div className="flex-1 flex flex-col gap-8">
      {/* Header chip */}
      <div className="w-full text-center py-3 px-4 rounded-xl border-[0.5px] border-light-blue bg-light-active-green/50">
        <span className="font-changa font-bold text-base md:text-lg text-light-green">
          Select Competition
        </span>
      </div>

      {/* Competition branch picker */}
      <ChooseLomba
        selectedCompetition={selectedCompetition}
        onCompetitionSelect={onCompetitionSelect}
      />

      {/* Next button */}
      <div className="mt-auto pt-4 flex justify-center">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedCompetition}
          className="w-full max-w-xs md:max-w-sm py-3 rounded-2xl border-[0.5px] border-light-blue bg-light-active-green/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="font-changa font-bold text-base md:text-lg text-light-green">
            Next
          </span>
        </button>
      </div>
    </div>
  );
};

export default PendaftaranForm;
