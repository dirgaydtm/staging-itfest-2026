"use client";

import React, { useState } from "react";
import FormChipHeader from "../shared/FormChipHeader";
import FormInput from "../shared/FormInput";
import FormNavButtons from "../shared/FormNavButtons";
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
  const [extra, setExtra] = useState({ university: "", phone_number: "" });

  const handleMemberChange = (field: keyof TeamMember, value: string) => {
    onMember1Change({ ...member1, [field]: value });
  };

  const handleExtraChange = (field: keyof typeof extra, value: string) => {
    setExtra((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    member1.name.trim() !== "" &&
    member1.student_number.trim() !== "" &&
    extra.university.trim() !== "" &&
    extra.phone_number.trim() !== "";

  const handleNext = () => {
    if (isFormValid) onNext();
  };

  return (
    <>
      <FormChipHeader title="Member Biodata 1" />

      <p className="text-center font-leaguespartan text-xs md:text-sm text-light-blue">
        If you don&apos;t have Member 1, fill all fields with &quot;-&quot; and click Next.
      </p>

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          label="Full name"
          name="full_name"
          value={member1.name}
          onChange={(e) => handleMemberChange("name", e.target.value)}
          placeholder="Enter Full Name"
          required
        />
        <FormInput
          label="NIM"
          name="student_number"
          value={member1.student_number}
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
        onNext={handleNext}
        nextDisabled={!isFormValid}
      />
    </>
  );
};

export default BiodataAnggota1Form;