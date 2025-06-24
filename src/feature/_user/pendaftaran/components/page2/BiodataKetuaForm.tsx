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
    <section className="flex flex-col items-center justify-between h-full">
      <PageIndex index={2} title="Biodata Ketua" />

      <div className="w-full max-w-md space-y-2">
        <h3 className="font-bold font-changa text-xl text-center text-white">
          Isi Biodata Ketua Tim
        </h3>

        {error && (
          <div className="bg-red-500/20 border border-red-400 p-3 rounded-xl text-center text-white text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            label="Nama Lengkap"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Masukkan nama lengkap"
            required
            disabled={loading}
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
          />
        </form>
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
          {loading ? "Menyimpan..." : "Lanjut"}
        </Button>
      </div>
    </section>
  );
};

export default BiodataKetuaForm;
