import { useState } from "react";

export const useUploadPayment = (onSubmit: (file: File) => void) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString() || "";
      setPreview(result);
      setError(null);
    };
    reader.onerror = () => {
      setError("Gagal membaca gambar");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError("Pilih gambar terlebih dahulu");
      return;
    }

    onSubmit(selectedFile);
  };

  return {
    preview,
    selectedFile,
    error,
    handleImageChange,
    handleSubmit,
    isDisabled: !selectedFile,
  };
};
