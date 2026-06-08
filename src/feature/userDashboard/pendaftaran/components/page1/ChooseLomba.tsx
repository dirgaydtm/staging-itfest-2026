"use client";

import React from "react";
import ButtonChoose from "./ButtonChoose";

interface ChooseLombaProps {
  selectedCompetition: number | null;
  onCompetitionSelect: (competitionId: number) => void;
}

const competitions = [
  { id: 2, title: "UI/UX Design" },
  { id: 3, title: "Business Plan" },
  // TODO: ganti ID DML setelah backend confirm (placeholder = 4)
  { id: 4, title: "Digital Media Learning" },
];

const ChooseLomba: React.FC<ChooseLombaProps> = ({
  selectedCompetition,
  onCompetitionSelect,
}) => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="text-center space-y-1">
        <h3 className="font-changa font-bold text-xl md:text-2xl text-light-blue">
          Competition Branch
        </h3>
        <p className="font-changa text-sm md:text-base text-light-blue">
          Choose between 3 competition branches that you want to register for
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-3 mt-2">
        {competitions.map((c) => (
          <ButtonChoose
            key={c.id}
            title={c.title}
            isActive={selectedCompetition === c.id}
            onClick={() => onCompetitionSelect(c.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseLomba;
