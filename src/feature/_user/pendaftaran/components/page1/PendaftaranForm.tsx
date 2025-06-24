// src/feature/_user/pendaftaran/components/page1/PendaftaranForm.tsx
import React from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
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
    if (selectedCompetition) {
      onNext();
    }
  };

  return (
    <section className="flex flex-col items-center justify-between h-full">
      <PageIndex index={1} title="Pilih Lomba" />
      <ChooseLomba 
        selectedCompetition={selectedCompetition}
        onCompetitionSelect={onCompetitionSelect}
      />
      <Button
        type="button"
        size={"normal"}
        className="w-full text-base sm:text-base disabled:opacity-50"
        disabled={!selectedCompetition}
        onClick={handleNext}
      >
        Lanjut
      </Button>
    </section>
  );
};

export default PendaftaranForm;