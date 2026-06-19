"use client";

import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { useUploadPayment } from "../../hooks/useUploadPayment";
import Image from "next/image";
import { useState } from "react";

interface UploadPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
  isLoading?: boolean;
}

const PaymentInfoSection = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const paymentData = {
    amount: "Rp60.000,00",
    website: "itfest-filkom.com",
    accounts: [
      {
        bank: "BNI",
        number: "1923919257",
        name: "MUTHIA KHALISHA",
      },
      {
        bank: "MANDIRI",
        number: "1560024894356",
        name: "ALYA HAMIDAH",
      },
    ],
  };

  const copyToClipboard = async (text: string, accountType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(accountType);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.warn("Clipboard API gagal, menggunakan fallback:", err);
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "-9999px";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedAccount(accountType);
        setTimeout(() => setCopiedAccount(null), 2000);
      } catch (copyErr) {
        console.error("Fallback: Gagal menyalin teks", copyErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="text-center mb-3 sm:mb-4">
        <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
          Informasi Pembayaran
        </h3>
        <div className="text-yellow-200 text-xs sm:text-sm">
          Biaya Pendaftaran:{" "}
          <span className="font-bold text-white">{paymentData.amount}</span>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="text-white text-xs sm:text-sm font-medium text-center mb-2 sm:mb-3">
          Transfer ke salah satu rekening:
        </div>

        {paymentData.accounts.map((account, index) => (
          <div
            key={index}
            className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-2 sm:p-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="flex-shrink-0 bg-blue-600 text-white text-xs px-2 py-1 min-w-[60px] text-center rounded font-bold">
                    {account.bank}
                  </span>
                  <span className="text-white font-mono text-xs sm:text-sm break-all">
                    {account.number}
                  </span>
                </div>
                <div className="text-gray-300 text-left text-xs">
                  a.n. {account.name}
                </div>
              </div>

              <button
                className={`
                  w-full sm:w-auto sm:ml-2 h-8 px-3 text-xs rounded transition-all flex-shrink-0
                  ${
                    copiedAccount === account.bank
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }
                `}
                onClick={() => copyToClipboard(account.number, account.bank)}
                disabled={copiedAccount === account.bank}
              >
                {copiedAccount === account.bank ? (
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1.5 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tersalin!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1.5 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Salin
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
        <div className="flex items-start justify-center space-x-2">
          <div className="text-yellow-200 text-xs">
            <div className="font-medium mb-1">Langkah pembayaran:</div>
            <div className="space-y-1">
              <div>1. Transfer ke salah satu rekening di atas</div>
              <div>2. Screenshot bukti transfer yang jelas</div>
              <div>3. Upload di form di bawah ini</div>
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
      <div className="font-changa w-full max-w-md mx-auto p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
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
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-600 text-white">
                  Pilih File
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
            <p className="text-red-400 text-xs">⚠️ {error}</p>
          </div>
        )}

        <Button
          variant={!preview ? "disabled" : "primary"}
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
