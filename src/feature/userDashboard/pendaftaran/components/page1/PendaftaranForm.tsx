"use client";

import React from "react";
import ChooseLomba from "./ChooseLomba";
import { buttonDisabledClass } from "@/feature/userDashboard/layout/themes";

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
      <div className="w-full text-center py-3 px-4 rounded-xl border-[0.5px] border-light-blue bg-light-active-green/50">
        <span className="font-leaguespartan font-bold text-base md:text-lg text-light-green">
          Select Competition
        </span>
      </div>

      <ChooseLomba
        selectedCompetition={selectedCompetition}
        onCompetitionSelect={onCompetitionSelect}
      />

      <div className="mt-auto pt-4 flex justify-center">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedCompetition}
          className={`w-full max-w-xs md:max-w-sm py-3 rounded-2xl border-[0.5px] border-light-blue transition-all duration-300 ${
            selectedCompetition
              ? "bg-light-active-green/20 hover:scale-[1.02] active:scale-95"
              : `${buttonDisabledClass}`
          }`}
        >
          <span className="font-leaguespartan font-bold text-base md:text-lg text-light-green">
            Next
          </span>
        </button>
      </div>
    </div>
  );
};

export default PendaftaranForm;
