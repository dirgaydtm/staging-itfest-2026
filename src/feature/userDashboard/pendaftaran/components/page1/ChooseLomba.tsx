"use client";

import React from "react";
import ButtonChoose from "./ButtonChoose";
import { COMPETITIONS } from "../../constants";

interface ChooseLombaProps {
  selectedCompetition: number | null;
  onCompetitionSelect: (competitionId: number) => void;
}

const ChooseLomba: React.FC<ChooseLombaProps> = ({
  selectedCompetition,
  onCompetitionSelect,
}) => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="text-center space-y-1">
        <h3 className="font-leaguespartan font-bold text-xl md:text-2xl text-slate-200 tracking-wide drop-shadow-md">
          Competition Branch
        </h3>
        <p className="font-leaguespartan text-xs md:text-sm text-slate-300/90 leading-relaxed">
          Choose between 3 competition branches that you want to register for
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-3 mt-2">
        {COMPETITIONS.map((c) => (
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
