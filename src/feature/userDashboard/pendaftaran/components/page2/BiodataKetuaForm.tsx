"use client";

import React, { useState } from "react";
import FormChipHeader from "../shared/FormChipHeader";
import FormInput from "../shared/FormInput";
import FormNavButtons from "../shared/FormNavButtons";
import { BiodataKetuaRequest } from "@/api/services/pendaftaran";

interface BiodataKetuaFormProps {
  competitionId: number;
  biodataKetua: BiodataKetuaRequest;
  onBiodataKetuaChange: (data: BiodataKetuaRequest) => void;
  onNext: () => void;
  onBack: () => void;
}

const BiodataKetuaForm: React.FC<BiodataKetuaFormProps> = ({
  biodataKetua,
  onBiodataKetuaChange,
  onNext,
  onBack,
}) => {
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    const { name } = e.target;

    if (name === "phone_number") {
      if (value.length > 15) value = value.slice(0, 15);

      if (value.length > 0 && !value.startsWith("0")) {
        setPhoneError("Phone number must start with 0.");
      } else if (value.length > 0 && value.length < 10) {
        setPhoneError("Phone number must be at least 10 digits.");
      } else {
        setPhoneError("");
      }
    }

    onBiodataKetuaChange({
      ...biodataKetua,
      [name]: value,
    });
  };

  const isFormValid =
    Object.values(biodataKetua).every((v) => v.trim() !== "") &&
    biodataKetua.phone_number.startsWith("0") &&
    biodataKetua.phone_number.length >= 10 &&
    biodataKetua.phone_number.length <= 15;

  const handleNext = () => {
    if (isFormValid) onNext();
  };

  return (
    <>
      <FormChipHeader title="Leader Biodata" />

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          label="Full name"
          name="full_name"
          value={biodataKetua.full_name}
          onChange={handleInputChange}
          placeholder="Enter Full Name"
          required
        />
        <FormInput
          label="NIM"
          name="student_number"
          value={biodataKetua.student_number}
          onChange={handleInputChange}
          placeholder="Enter NIM"
          required
        />
        <FormInput
          label="Institution Name"
          name="university"
          value={biodataKetua.university}
          onChange={handleInputChange}
          placeholder="Enter Institution Name"
          required
        />
        <div className="flex flex-col w-full">
          <FormInput
            label="Phone Number (WhatsApp)"
            name="phone_number"
            type="tel"
            inputMode="numeric"
            value={biodataKetua.phone_number}
            onChange={handleInputChange}
            placeholder="Enter Phone Number"
            maxLength={15}
            required
          />
          {phoneError && (
            <p className="text-light-red text-xs mt-1.5 px-1 font-leaguespartan">
              {phoneError}
            </p>
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

export default BiodataKetuaForm;