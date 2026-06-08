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
      <div
        className="w-full text-center py-3 px-4"
        style={{
          borderRadius: "12px",
          border: "0.5px solid #F0F5F8",
          background: "rgba(176, 191, 199, 0.50)",
        }}
      >
        <span
          className="font-changa font-bold text-base md:text-lg"
          style={{ color: "#E6EAED" }}
        >
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
          className="w-full max-w-xs md:max-w-sm py-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            borderRadius: "16px",
            border: "0.5px solid #F0F5F8",
            background: "rgba(176, 191, 199, 0.20)",
          }}
        >
          <span
            className="font-changa font-bold text-base md:text-lg"
            style={{ color: "#E6EAED" }}
          >
            Next
          </span>
        </button>
      </div>
    </div>
  );
};

export default PendaftaranForm;