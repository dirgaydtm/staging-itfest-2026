"use client";

import React, { useState } from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
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
  // State specifically for the phone number error
  const [phoneError, setPhoneError] = useState("");
  // General error for the final submission check
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // --- Real-time validation for the Phone Number field ---
    if (name === "phone_number") {
      // 1. Enforce max length of 15
      if (value.length > 15) {
        value = value.slice(0, 15);
      }

      // 2. Check for starting with "0"
      if (value.length > 0 && !value.startsWith("0")) {
        setPhoneError("Nomor telepon harus diawali dengan angka 0.");
      }
      // 3. Check for minimum length
      else if (value.length > 0 && value.length < 10) {
        setPhoneError("Nomor telepon minimal harus 10 digit.");
      }
      // 4. Clear error if valid
      else {
        setPhoneError("");
      }
    }

    // Clear general submission error when user starts typing
    setSubmitError("");

    onBiodataKetuaChange({
      ...biodataKetua,
      [name]: value,
    });
  };

  const handleNext = () => {
    // Final check before allowing user to proceed
    if (
      !isFormValid ||
      phoneError ||
      !biodataKetua.full_name ||
      !biodataKetua.student_number ||
      !biodataKetua.university
    ) {
      setSubmitError("Harap perbaiki semua error dan isi semua field.");
      return;
    }
    onNext();
  };

  // The form is valid only when all fields are filled AND the phone number meets all criteria
  const isFormValid =
    Object.values(biodataKetua).every((value) => value.trim() !== "") &&
    biodataKetua.phone_number.startsWith("0") &&
    biodataKetua.phone_number.length >= 10 &&
    biodataKetua.phone_number.length <= 15;

  return (
    <section className="flex flex-col lg:-mt-4 xl:mt-0 items-center  gap-4 md:gap-0 justify-center md:justify-between h-screen px-4 py-4 md:h-full">
      <PageIndex index={2} title="Biodata Ketua" />

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-md 2xl:max-w-lg space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-2 xl:space-y-3">
        <h3 className="font-bold font-changa text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-center text-white">
          Isi Biodata Ketua Tim
        </h3>

        {/* General error message on final submit attempt */}
        {submitError && (
          <div className="bg-red-500/20 border border-red-400 p-2 sm:p-3 rounded-xl text-center text-white text-xs sm:text-sm">
            {submitError}
          </div>
        )}

        <div className="space-y-2 sm:space-y-3">
          <Input
            label="Nama Lengkap"
            type="text"
            name="full_name"
            value={biodataKetua.full_name}
            onChange={handleInputChange}
            placeholder="Masukkan nama lengkap"
            required
            className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          />

          <Input
            label="NIM"
            type="number"
            name="student_number"
            value={biodataKetua.student_number}
            onChange={handleInputChange}
            placeholder="Masukkan NIM"
            required
            className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          />

          <Input
            label="Universitas"
            type="text"
            name="university"
            value={biodataKetua.university}
            onChange={handleInputChange}
            placeholder="Masukkan nama universitas"
            required
            className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          />

          <div>
            <Input
              label="No Telepon"
              type="number"
              name="phone_number"
              value={biodataKetua.phone_number}
              onChange={handleInputChange}
              placeholder="Masukkan nomor telepon"
              required
              className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
            />
            {phoneError && (
              <p className="text-red-400 font-medium text-xs mt-1.5 px-1">
                {phoneError}
              </p>
            )}
            <p className="text-xs text-purple-200 mt-1.5 px-1">
              *Wajib diisi, min 10 & maks 15 digit, diawali 0. Contoh:
              081234567890
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-md 2xl:max-w-lg flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-3 lg:mt-3 xl:mt-4">
        <Button
          type="button"
          size="normal"
          variant="tertiary"
          className="w-full sm:w-[48%] text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          onClick={onBack}
        >
          Kembali
        </Button>

        <Button
          type="button"
          size="normal"
          variant={"primary"}
          className="w-full sm:w-[48%] disabled:opacity-50 text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          disabled={!isFormValid}
          onClick={handleNext}
        >
          Lanjut
        </Button>
      </div>
    </section>
  );
};

export default BiodataKetuaForm;
