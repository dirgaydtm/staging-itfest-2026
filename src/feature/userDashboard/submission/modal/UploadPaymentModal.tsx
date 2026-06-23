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

const UploadPaymentModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: UploadPaymentModalProps) => {
  const { preview, error, handleImageChange, handleSubmit, isDisabled } =
    useUploadPayment(onSubmit);

  const { theme } = useDashboardTheme();
  const [isDragOver, setIsDragOver] = useState(false);

  // Logika dinamis biaya pendaftaran
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="font-leaguespartan w-full text-white">
        <h2 className="text-white text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 tracking-wide">
          Selesaikan Pembayaran
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          
          <div className="w-full lg:w-5/12 flex flex-col items-center justify-center bg-black/30 rounded-2xl p-6 border border-white/5 shadow-inner">
            <div className="bg-white p-3.5 rounded-2xl w-full aspect-square flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src={QrisImage}
                alt="QRIS IT Fest Pembayaran"
                className="w-full h-full object-contain rounded-lg"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white/60 text-xs uppercase tracking-widest font-medium mb-1">Penyedia Jasa Pembayaran</p>
              <p className="text-white font-bold text-sm lg:text-base tracking-wide">
                a.n. NICHOLAS RAVAEL ONDIHON GULTOM, IT FEST
              </p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col justify-between gap-5">
            
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-sm lg:text-base">Kategori Lomba: {theme.label}</h3>
                <p className="text-white/50 text-xs mt-0.5">Biaya kontribusi pendaftaran tim</p>
              </div>
              <div className="text-right">
                <span className="text-white font-bold text-xl lg:text-2xl text-yellow-200">{getPaymentAmount()}</span>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl text-xs sm:text-sm text-yellow-200/90 leading-relaxed">
              <span className="font-bold block mb-1 text-yellow-300">Panduan Transfer:</span>
              <ol className="list-decimal list-inside space-y-1 opacity-95">
                <li>Pindai QRIS di kolom kiri menggunakan m-banking / e-wallet.</li>
                <li>Pastikan nama penerima sesuai dan masukkan nilai konfirmasi sebesar <span className="font-bold text-white">{getPaymentAmount()}</span>.</li>
                <li>Unggah berkas tangkapan layar (*screenshot*) tanda bukti sukses di bawah ini.</li>
              </ol>
            </div>

            <div>
              <input
                id="payment-file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div
                className={`
                  relative border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[200px]
                  ${
                    isDragOver
                      ? "border-blue-400 bg-blue-400/10"
                      : preview
                      ? "border-green-400 bg-green-400/10"
                      : "border-white/10 hover:border-white/30 bg-black/10 hover:bg-black/20"
                  }
                `}
                onClick={handleUploadAreaClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {preview ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Image
                      src={preview}
                      alt="Pratinjau Bukti Transfer"
                      width={280}
                      height={160}
                      className="rounded-xl max-h-36 object-contain shadow-md"
                    />
                    <div className="text-green-400 text-xs font-semibold bg-green-400/10 px-3 py-1 rounded-full">
                      ✓ Dokumen Siap Dikirim
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="w-10 h-10 text-white/30 mb-1">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-white/80 font-medium text-sm">Seret & lepas bukti transfer di sini</p>
                    <p className="text-white/40 text-xs">Mendukung format JPG, PNG (Maks. 1MB)</p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-red-400 text-xs font-medium">⚠️ {error}</p>
              </div>
            )}

            <div>
              <Button
                variant={!preview ? "disabled" : "forauth"}
                size="normal"
                className="w-full h-12 text-sm font-semibold rounded-xl tracking-wide transition-all"
                onClick={handleSubmit}
                disabled={isLoading || isDisabled || !preview}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Memproses Dokumen...</span>
                  </div>
                ) : !preview ? (
                  "Unggah Bukti Transaksi Terlebih Dahulu"
                ) : (
                  "Konfirmasi Pembayaran Selesai"
                )}
              </Button>
              <p className="text-white/40 text-center text-xs mt-2">
                Verifikasi administrasi membutuhkan waktu sekitar 1-2 jam kerja.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadPaymentModal;