"use client";

import React, { useState } from "react";
import FormChipHeader from "../shared/FormChipHeader";
import FormInput from "../shared/FormInput";
import FormNavButtons from "../shared/FormNavButtons";
import {
  TeamMember,
  BiodataKetuaRequest,
  pendaftaranService,
} from "@/api/services/pendaftaran";

interface BiodataAnggota2FormProps {
  teamName: string;
  member1: TeamMember;
  member2: TeamMember;
  onMember2Change: (member: TeamMember) => void;
  biodataKetua: BiodataKetuaRequest;
  ktmFile: File | null;
  competitionId: number;
  onNext: () => void;
  onBack: () => void;
  setIsLoading: (loading: boolean) => void;
}

const BiodataAnggota2Form: React.FC<BiodataAnggota2FormProps> = ({
  teamName,
  member1,
  member2,
  onMember2Change,
  biodataKetua,
  ktmFile,
  competitionId,
  onNext,
  onBack,
  setIsLoading,
}) => {
  const [extra, setExtra] = useState({ university: "", phone_number: "" });
  const [submitError, setSubmitError] = useState("");

  const handleMemberChange = (field: keyof TeamMember, value: string) => {
    onMember2Change({ ...member2, [field]: value });
  };

  const handleExtraChange = (field: keyof typeof extra, value: string) => {
    setExtra((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    member2.name.trim() !== "" &&
    member2.student_number.trim() !== "" &&
    extra.university.trim() !== "" &&
    extra.phone_number.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      const biodataResponse = await pendaftaranService.registerBiodataKetua(
        competitionId,
        biodataKetua,
      );
      if (!biodataResponse.status.isSuccess) {
        throw new Error(
          biodataResponse.message || "Failed to save leader biodata",
        );
      }

      if (ktmFile) {
        const ktmResponse = await pendaftaranService.uploadKTM(ktmFile);
        if (!ktmResponse.status.isSuccess) {
          throw new Error(ktmResponse.message || "Failed to upload KTM");
        }
      }

      const members: TeamMember[] = [];
      if (member1.name.trim() && member1.student_number.trim()) {
        members.push(member1);
      }
      if (member2.name.trim() && member2.student_number.trim()) {
        members.push(member2);
      }

      const teamResponse = await pendaftaranService.upsertTeam({
        team_name: teamName,
        members,
      });
      if (!teamResponse.status.isSuccess) {
        throw new Error(teamResponse.message || "Failed to save team data");
      }

      onNext();
    } catch (err) {
      console.error("Error submitting registration:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormChipHeader title="Member Biodata 2" />

      <p className="text-center font-leaguespartan text-xs md:text-sm text-light-blue">
        If you don&apos;t have Member 2, fill all fields with &quot;-&quot; and
        click Next.
      </p>

      {submitError && (
        <div
          role="alert"
          className="rounded-xl border-2 border-red-500 bg-red-500/25 p-3 text-center font-leaguespartan font-semibold text-sm text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.45)]"
        >
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          label="Full name"
          name="full_name"
          value={member2.name}
          onChange={(e) => handleMemberChange("name", e.target.value)}
          placeholder="Enter Full Name"
          required
        />
        <FormInput
          label="NIM"
          name="student_number"
          value={member2.student_number}
          onChange={(e) => handleMemberChange("student_number", e.target.value)}
          placeholder="Enter NIM"
          required
        />
        <FormInput
          label="Institution Name"
          name="university"
          value={extra.university}
          onChange={(e) => handleExtraChange("university", e.target.value)}
          placeholder="Enter Institution Name"
          required
        />
        <FormInput
          label="Phone Number (WhatsApp)"
          name="phone_number"
          type="tel"
          inputMode="numeric"
          value={extra.phone_number}
          onChange={(e) => handleExtraChange("phone_number", e.target.value)}
          placeholder="Enter Phone Number"
          required
        />
      </div>

      <FormNavButtons
        onBack={onBack}
        onNext={handleSubmit}
        nextDisabled={!isFormValid}
        nextLabel="Submit"
      />
    </>
  );
};

export default BiodataAnggota2Form;
