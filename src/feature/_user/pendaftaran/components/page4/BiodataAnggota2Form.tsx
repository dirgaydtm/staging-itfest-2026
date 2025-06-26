"use client";

import React, { useState } from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { TeamMember, pendaftaranService } from "@/api/services/pendaftaran";

interface BiodataAnggota2FormProps {
  teamName: string;
  member1: TeamMember;
  member2: TeamMember;
  onMember2Change: (member: TeamMember) => void;
  onNext: () => void;
  onBack: () => void;
}

const BiodataAnggota2Form: React.FC<BiodataAnggota2FormProps> = ({
  teamName,
  member1,
  member2,
  onMember2Change,
  onNext,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: keyof TeamMember, value: string) => {
    onMember2Change({
      ...member2,
      [field]: value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    // Prepare members array - only include members with data
    const members: TeamMember[] = [];

    if (member1.name.trim() && member1.student_number.trim()) {
      members.push(member1);
    }

    if (member2.name.trim() && member2.student_number.trim()) {
      members.push(member2);
    }

    const teamData = {
      team_name: teamName,
      members: members,
    };

    setLoading(true);
    setError("");

    try {
      const response = await pendaftaranService.upsertTeam(teamData);

      if (response.status.isSuccess) {
        onNext();
      } else {
        setError(response.message || "Gagal menyimpan data tim");
      }
    } catch (err) {
      console.error("Error submitting team data:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // Removed unused handleSkipAndSubmit function

  const isFormValid =
    member2.name.trim() !== "" && member2.student_number.trim() !== "";

  return (
    <section className="flex flex-col items-center justify-between h-full">
      <PageIndex index={5} title="Biodata Anggota 2" />

      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h3 className="font-bold font-changa text-xl text-white">
            Biodata Anggota 2
          </h3>
          <p className="text-base font-changa text-white mt-2 md:px-4">
            {`Jika tidak ada Anggota 1, maka isi dengan "-" dan klik `}
            Lanjut
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Nama Anggota 2"
            type="text"
            value={member2.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Masukkan nama anggota (opsional)"
            disabled={loading}
          />

          <Input
            label="NIM Anggota 2"
            type="text"
            value={member2.student_number}
            onChange={(e) =>
              handleInputChange("student_number", e.target.value)
            }
            placeholder="Masukkan NIM anggota (opsional)"
            disabled={loading}
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
          disabled={loading}
        >
          Kembali
        </Button>
        <Button
          type="button"
          size="normal"
          variant={"primary"}
          className="w-full md:w-[48%] disabled:opacity-50 text-lg h-12 py-2"
          disabled={!isFormValid || loading}
          onClick={handleSubmit}
        >
          {loading ? "Menyimpan..." : "Selesaikan"}
        </Button>
      </div>
    </section>
  );
};

export default BiodataAnggota2Form;
