"use client";

import React, { useState } from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

interface TeamKTMFormProps {
  teamName: string;
  onTeamNameChange: (name: string) => void;
  ktmFile: File | null;
  onKtmFileChange: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const TeamKTMForm: React.FC<TeamKTMFormProps> = ({
  teamName,
  onTeamNameChange,
  ktmFile,
  onKtmFileChange,
  onNext,
  onBack,
}) => {
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("File harus berupa gambar (JPG, PNG) atau PDF");
        onKtmFileChange(null);
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("Ukuran file maksimal 5MB");
        onKtmFileChange(null);
        return;
      }

      onKtmFileChange(file);
      setError("");
    }
  };

  const handleNext = () => {
    // Validate team name
    if (!teamName.trim()) {
      setError("Nama tim harus diisi");
      return;
    }

    // Validate file selection
    if (!ktmFile) {
      setError("Pilih file KTM terlebih dahulu");
      return;
    }

    // Just proceed to next step, no upload yet
    onNext();
  };

  const isFormValid = teamName.trim() !== "" && ktmFile !== null;

  return (
    <section className="flex flex-col items-center justify-center gap-4 md:gap-0  md:justify-between h-screen md:h-full">
      <PageIndex index={3} title="Berkas Ketua" />

      <div className="w-full max-w-md space-y-6">
        <h3 className="font-bold font-changa text-xl text-center text-white">
          Nama Tim & Upload KTM
        </h3>

        {error && (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Nama Tim"
            type="text"
            value={teamName}
            onChange={(e) => onTeamNameChange(e.target.value)}
            placeholder="Masukkan nama tim"
            required
          />

          <div className="space-y-2">
            <label className="block text-white font-medium text-sm mb-1">
              Upload KTM (Kartu Tanda Mahasiswa)
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 bg-white text-blue-400 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <p className="text-xs text-purple-200">
              Format: JPG, PNG, PDF (Max 5MB)
            </p>

            {/* File preview */}
            {ktmFile && (
              <div className="bg-green-500/20 border border-green-400 p-2 rounded-lg">
                <p className="text-green-200 text-sm">
                  ✓ File terpilih: {ktmFile.name}
                </p>
                <p className="text-green-300 text-xs">
                  Ukuran: {(ktmFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
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

export default TeamKTMForm;
