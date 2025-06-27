"use client";

import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { useUploadPayment } from "../../../hooks/useUploadPayment";
import Image from "next/image";
import { useState } from "react";

interface UploadPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
  isLoading?: boolean;
}

const UploadPaymentModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: UploadPaymentModalProps) => {
  const { preview, error, handleImageChange, handleSubmit, isDisabled } =
    useUploadPayment(onSubmit);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Set the file directly to the hidden input and trigger change
      const fileInput = document.getElementById(
        "payment-file-input"
      ) as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        // Trigger the change event
        const changeEvent = new Event("change", { bubbles: true });
        fileInput.dispatchEvent(changeEvent);
      }
    }
  };

  const handleUploadAreaClick = () => {
    const fileInput = document.getElementById(
      "payment-file-input"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="font-changa">
        <h2 className="text-white text-xl font-semibold text-center mb-4">
          Upload Bukti Pembayaran
        </h2>
        <p className="text-white text-xs text-center font-normal mb-6 opacity-70">
          Pastikan bukti pembayaran jelas dan dapat terbaca
        </p>

        {/* Hidden file input */}
        <input
          id="payment-file-input"
          type="file"
          accept="image/*,application/pdf"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Upload Area */}
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 mb-4
            ${
              isDragOver
                ? "border-blue-400 bg-blue-400/10"
                : preview
                ? "border-green-400 bg-green-400/10"
                : "border-gray-400 hover:border-gray-300 hover:bg-gray-800/20"
            }
          `}
          onClick={handleUploadAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="space-y-3">
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={200}
                className="rounded-lg max-h-48 object-contain mx-auto"
              />
              <div className="text-green-400 text-sm font-medium">
                ✓ File berhasil dipilih
              </div>
              <div className="text-gray-300 text-xs">
                Klik untuk mengganti file
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Upload Icon */}
              <div className="mx-auto w-12 h-12 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <div className="text-white font-medium">
                {isDragOver
                  ? "Lepaskan file di sini"
                  : "Pilih Gambar atau drag & drop"}
              </div>

              <div className="text-gray-400 text-xs space-y-1">
                <div>Format yang didukung: JPG, PNG (Gambar)</div>
                <div>Maksimal ukuran file: 1MB</div>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-600 text-white">
                  Pilih File
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-xs">⚠️ {error}</p>
          </div>
        )}

        <Button
          variant={!preview ? "disabled" : "primary"}
          size="small"
          className="w-full h-12 mt-4"
          onClick={handleSubmit}
          disabled={isLoading || isDisabled || !preview}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Mengupload...</span>
            </div>
          ) : !preview ? (
            "Pilih File Terlebih Dahulu"
          ) : (
            "Kirim Bukti Pembayaran"
          )}
        </Button>

        <p className="text-yellow-300 text-xs text-center mt-3 opacity-90">
          Gambar akan diverifikasi dalam 1-2 jam kerja
        </p>
      </div>
    </Modal>
  );
};

export default UploadPaymentModal;
