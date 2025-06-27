"use client";

import React, { useState } from "react";
import PageIndex from "../PageIndex";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import {
  pendaftaranService,
  BiodataKetuaRequest,
} from "@/api/services/pendaftaran";

interface BiodataKetuaFormProps {
  competitionId: number;
  onNext: () => void;
  onBack: () => void;
}

const BiodataKetuaForm: React.FC<BiodataKetuaFormProps> = ({
  competitionId,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState<BiodataKetuaRequest>({
    full_name: "",
    student_number: "",
    university: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.student_number ||
      !formData.university ||
      !formData.phone_number
    ) {
      setError("Semua field harus diisi");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await pendaftaranService.registerBiodataKetua(
        competitionId,
        formData
      );

      if (response.status.isSuccess) {
        onNext();
      } else {
        setError(response.message || "Gagal menyimpan biodata");
      }
    } catch (err) {
      console.error("Error submitting biodata ketua:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <section className="flex flex-col lg:-mt-4 xl:mt-0 items-center justify-between h-full px-4 py-4">
      <PageIndex index={2} title="Biodata Ketua" />

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-md 2xl:max-w-lg space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-2 xl:space-y-3">
        <h3 className="font-bold font-changa text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-center text-white">
          Isi Biodata Ketua Tim
        </h3>

        {error && (
          <div className="bg-red-500/20 border border-red-400 p-2 sm:p-3 rounded-xl text-center text-white text-xs sm:text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
          <Input
            label="Nama Lengkap"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Masukkan nama lengkap"
            required
            disabled={loading}
            className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          />

          <Input
            label="NIM"
            type="number"
            name="student_number"
            value={formData.student_number}
            onChange={handleInputChange}
            placeholder="Masukkan NIM"
            required
            disabled={loading}
            className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          />

          <Input
            label="Universitas"
            type="text"
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            placeholder="Masukkan nama universitas"
            required
            disabled={loading}
            className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          />

          <Input
            label="No Telepon"
            type="number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Masukkan nomor telepon"
            required
            disabled={loading}
            className="text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          />
        </form>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-md 2xl:max-w-lg flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-3 lg:mt-3 xl:mt-4">
        <Button
          type="button"
          size="normal"
          variant="tertiary"
          className="w-full sm:w-[48%] text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          onClick={onBack}
          disabled={loading}
        >
          Kembali
        </Button>

        <Button
          type="button"
          size="normal"
          variant={"primary"}
          className="w-full sm:w-[48%] disabled:opacity-50 text-xs sm:text-sm md:text-xs lg:text-xs xl:text-sm 2xl:text-base h-9 sm:h-10 md:h-9 lg:h-9 xl:h-10 2xl:h-11 py-1 sm:py-2"
          disabled={!isFormValid || loading}
          onClick={handleSubmit}
        >
          {loading ? "Menyimpan..." : "Lanjut"}
        </Button>
      </div>
    </section>
  );
};

export default BiodataKetuaForm;
