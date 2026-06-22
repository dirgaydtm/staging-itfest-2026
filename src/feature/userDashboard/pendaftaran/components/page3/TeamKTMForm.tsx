"use client";

import React, { useState } from "react";
import FormChipHeader from "../shared/FormChipHeader";
import FormInput from "../shared/FormInput";
import FormFileInput from "../shared/FormFileInput";
import FormNavButtons from "../shared/FormNavButtons";

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

  const handleFileChange = (file: File | null) => {
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setError("File harus berupa gambar (JPG, PNG)");
        onKtmFileChange(null);
        return;
      }

      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("Maximum file size is 1MB");
        onKtmFileChange(null);
        return;
      }

      onKtmFileChange(file);
      setError("");
    } else {
      onKtmFileChange(null);
    }
  };

  const handleNext = () => {
    if (!teamName.trim()) {
      setError("Nama tim harus diisi");
      return;
    }
    if (!ktmFile) {
      setError("Pilih file KTM terlebih dahulu");
      return;
    }
    onNext();
  };

  const isFormValid = teamName.trim() !== "" && ktmFile !== null;

  return (
    <>
      <FormChipHeader title="File" />

      {error && (
        <div
          role="alert"
          className="rounded-xl border-2 border-red-500 bg-red-500/25 p-3 text-center font-leaguespartan font-semibold text-sm text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.45)]"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          label="Team Name"
          name="teamName"
          value={teamName}
          onChange={(e) => onTeamNameChange(e.target.value)}
          placeholder="Enter Team Name"
          required
        />

        <div className="flex flex-col gap-1.5">
          <FormFileInput
            label="Scan KTM"
            file={ktmFile}
            onFileChange={handleFileChange}
            placeholder="Upload Here"
            accept=".jpg,.jpeg,.png"
          />
          <p className="font-leaguespartan text-xs text-light-blue/70 px-1">
            Format: JPG, PNG (Max 1MB)
          </p>

          {ktmFile && (
            <div className="rounded-lg border border-light-active-green/40 bg-light-active-green/10 p-2 mt-1">
              <p className="font-leaguespartan text-sm text-light-green">
                ✓ File selected: {ktmFile.name}
              </p>
              <p className="font-leaguespartan text-xs text-light-green/80">
                Size: {(ktmFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      </div>

      <FormNavButtons
        onBack={onBack}
        onNext={handleNext}
        nextDisabled={!isFormValid}
      />
    </>
  );
};

export default TeamKTMForm;
