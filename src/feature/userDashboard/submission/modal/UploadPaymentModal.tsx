"use client";

import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { useUploadPayment } from "../../hooks/useUploadPayment";
import Image from "next/image";
import { useState } from "react";
import { useDashboardTheme } from "../../layout/DashboardThemeContext";
import QrisImage from "@/assets/img/userDashboard/submit/qrisitfest.jpeg"; 

interface UploadPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
  isLoading?: boolean;
}

const PaymentInfoSection = () => {
  const { theme } = useDashboardTheme();

  // Logika dinamis untuk harga berdasarkan tema/kategori lomba
  const getPaymentAmount = () => {
    switch (theme.key) {
      case "dml":
        return "Rp50.000,00";
      case "bp":
        return "Rp70.000,00";
      case "uiux":
      default:
        return "Rp60.000,00";
    }
  };

  // Mapping warna background dan border yang sesuai dengan tema lomba
  const modalThemeClass = {
    uiux: "bg-gradient-to-r from-darker-blue to-dark-hover-blue shadow-[0_0_18px_rgba(102,155,188,0.35)]",
    bp: "bg-gradient-to-r from-darker-red2 to-dark-hover-red2 shadow-[0_0_18px_rgba(193,18,31,0.35)]",
    dml: "bg-gradient-to-r from-darker-yellow to-dark-hover-yellow shadow-[0_0_18px_rgba(190,180,160,0.35)]",
  }[theme.key];

  return (
    <div className={` ${modalThemeClass} rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}>
      <div className="text-center mb-3 sm:mb-4">
        <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
          Informasi Pembayaran
        </h3>
        <div className="text-yellow-200 text-xs sm:text-sm">
          Biaya Pendaftaran:{" "}
          <span className="font-bold text-white text-base">{getPaymentAmount()}</span>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3 flex flex-col items-center">
        <div className="text-white text-xs sm:text-sm font-medium text-center mb-2">
          Scan QRIS berikut untuk melakukan pembayaran:
        </div>

        <div className="bg-white p-2 rounded-xl w-48 sm:w-56 shadow-lg">
          <Image
            src={QrisImage}
            alt="QRIS IT Fest"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="text-gray-200 text-xs text-center mt-2 font-medium">
          a.n. NICHOLAS RAVAEL ONDIHON GULTOM, IT FEST
        </div>
      </div>

      <div className="mt-4 sm:mt-5 p-2 sm:p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
        <div className="flex items-start justify-center space-x-2">
          <div className="text-yellow-200 text-xs">
            <div className="font-medium mb-1">Langkah pembayaran:</div>
            <div className="space-y-1">
              <div>1. Buka aplikasi m-banking atau e-wallet Anda</div>
              <div>2. Scan QRIS di atas dan pastikan nama penerima sesuai</div>
              <div>3. Masukkan nominal <span className="font-bold">{getPaymentAmount()}</span></div>
              <div>4. Screenshot bukti transfer yang berhasil</div>
              <div>5. Upload gambar pada form di bawah ini</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      const fileInput = document.getElementById(
        "payment-file-input"
      ) as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

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
      <div className="font-leaguespartan w-full max-w-md mx-auto p-4 sm:p-6 max-h-[90vh] overflow-y-auto hidden-scrollbar">
        <h2 className="text-white text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4">
          Upload Bukti Pembayaran
        </h2>

        <PaymentInfoSection />

        <p className="text-white text-xs text-center font-normal mb-3 sm:mb-4 opacity-70 px-2">
          Pastikan bukti pembayaran jelas dan dapat terbaca
        </p>

        <input
          id="payment-file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <div
          className={`
              relative border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all duration-200 mb-3 sm:mb-4
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
            <div className="space-y-2 sm:space-y-3">
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={150}
                className="rounded-lg max-h-24 sm:max-h-32 object-contain mx-auto"
              />
              <div className="text-green-400 text-xs sm:text-sm font-medium">
                ✓ File berhasil dipilih
              </div>
              <div className="text-gray-300 text-xs">
                Klik untuk mengganti file
              </div>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              <div className="mx-auto w-8 h-8 sm:w-10 sm:h-10 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

              <div className="text-white font-medium text-xs sm:text-sm">
                {isDragOver
                  ? "Lepaskan file di sini"
                  : "Pilih Gambar atau drag & drop"}
              </div>

              <div className="text-gray-400 text-xs space-y-1">
                <div>Format: JPG, PNG</div>
                <div>Maksimal: 1MB</div>
              </div>

              <div className="mt-2 sm:mt-3">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-normal-blue text-white">
                  Pilih File
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
            <p className="text-red-400 text-xs"> {error}</p>
          </div>
        )}

        <Button
          variant={!preview ? "disabled" : "forauth"}
          size="small"
          className="w-full h-10 sm:h-12 mt-3 sm:mt-4 text-xs sm:text-sm"
          onClick={handleSubmit}
          disabled={isLoading || isDisabled || !preview}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span className="text-xs sm:text-sm">Mengupload...</span>
            </div>
          ) : !preview ? (
            "Pilih File Terlebih Dahulu"
          ) : (
            "Kirim Bukti Pembayaran"
          )}
        </Button>

        <p className="text-yellow-300 text-xs text-center mt-2 sm:mt-3 opacity-90 px-2">
          Gambar akan diverifikasi dalam 1-2 jam kerja
        </p>
      </div>
    </Modal>
  );
};

export default UploadPaymentModal;