import React from "react";
import ButtonChoose from "./ButtonChoose";

interface ChooseLombaProps {
  selectedCompetition: number | null;
  onCompetitionSelect: (competitionId: number) => void;
}

const ChooseLomba: React.FC<ChooseLombaProps> = ({
  selectedCompetition,
  onCompetitionSelect,
}) => {
  const competitions = [
    { id: 2, title: "UI/UX DESIGN" },
    { id: 3, title: "BUSINESS PLAN" },
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full space-y-2">
      <h3 className="font-bold font-changa text-xl">Cabang Lomba</h3>
      <p className="font-normal text-center text-base">
        Pilih diantara 2 cabang lomba yang ingin kamu daftarkan
      </p>
      <div className="w-full flex flex-col items-center justify-center gap-2 md:mt-2 lg:mt-4">
        {competitions.map((competition) => (
          <ButtonChoose
            key={competition.id}
            title={competition.title}
            isActive={selectedCompetition === competition.id}
            onClick={() => onCompetitionSelect(competition.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ChooseLomba;