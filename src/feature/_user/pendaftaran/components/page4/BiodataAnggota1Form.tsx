"use client";

import React, { useState } from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { TeamMember } from "@/api/services/pendaftaran";

interface BiodataAnggota1FormProps {
  member1: TeamMember;
  onMember1Change: (member: TeamMember) => void;
  onNext: () => void;
  onBack: () => void;
}

const BiodataAnggota1Form: React.FC<BiodataAnggota1FormProps> = ({
  member1,
  onMember1Change,
  onNext,
  onBack,
}) => {
  const [error, setError] = useState("");

  const handleInputChange = (field: keyof TeamMember, value: string) => {
    onMember1Change({
      ...member1,
      [field]: value,
    });
    setError("");
  };

  const handleNext = () => {
    if (!member1.name.trim() || !member1.student_number.trim()) {
      setError("Nama dan NIM anggota harus diisi");
      return;
    }
    onNext();
  };

  // Removed unused handleSkip function

  const isFormValid =
    member1.name.trim() !== "" && member1.student_number.trim() !== "";

  return (
    <section className="flex flex-col items-center justify-between h-full">
      <PageIndex index={4} title="Biodata Anggota 1" />

      <div className="w-full max-w-md space-y-3">
        <div className="text-center">
          <h3 className="font-bold font-changa text-xl text-white">
            Biodata Anggota 1
          </h3>
          <p className="text-base font-changa text-white mt-2 md:px-4">
            Jika tidak ada Anggota 1, maka kosongkan dan klik &quot;Lanjut&quot;
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Nama Anggota 1"
            type="text"
            value={member1.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Masukkan nama anggota (opsional)"
          />

          <Input
            label="NIM Anggota 1"
            type="text"
            value={member1.student_number}
            onChange={(e) =>
              handleInputChange("student_number", e.target.value)
            }
            placeholder="Masukkan NIM anggota (opsional)"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:justify-between lg:justify-center gap-2">
        <Button
          type="button"
          size="normal"
          variant="tertiary"
          className="w-full md:w-[48%] text-lg h-12 py-2"
          onClick={onBack}
        >
          Kembali
        </Button>
        <Button
          type="button"
          size="normal"
          variant={"primary"}
          className="w-full md:w-[48%] disabled:opacity-50 text-lg h-12 py-2"
          disabled={!isFormValid}
          onClick={handleNext}
        >
          Lanjut
        </Button>
      </div>
    </section>
  );
};

export default BiodataAnggota1Form;