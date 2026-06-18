"use client";

import React from "react";
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
  const isFormValid = teamName.trim() !== "" && ktmFile !== null;

  const handleNext = () => {
    if (isFormValid) onNext();
  };

  return (
    <>
      <FormChipHeader title="File" />

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          label="Team Name"
          name="teamName"
          value={teamName}
          onChange={(e) => onTeamNameChange(e.target.value)}
          placeholder="Enter Team Name"
          required
        />
        <FormFileInput
          label="Scan KTM"
          file={ktmFile}
          onFileChange={onKtmFileChange}
          placeholder="Upload Here"
        />
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