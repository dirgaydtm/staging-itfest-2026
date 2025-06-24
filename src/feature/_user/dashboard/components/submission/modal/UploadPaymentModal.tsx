"use client";

import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { useUploadPayment } from "../../../hooks/useUploadPayment";

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
  const {
    preview,
    error,
    handleImageChange,
    handleSubmit,
    isDisabled,
  } = useUploadPayment(onSubmit);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="font-changa">
        <h2 className="text-white text-xl font-semibold text-center mb-4">
          Upload Bukti Pembayaran
        </h2>
        <p className="text-white text-xs text-center font-normal mb-6 opacity-70">
          Pastikan bukti pembayaran jelas dan dapat terbaca
        </p>

        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleImageChange}
          className="text-sm text-white mb-4 text-start"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg max-h-48 object-contain mb-4 w-full"
          />
        )}

        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

        <Button
          variant="primary"
          size="small"
          className="w-full h-12 mt-4"
          onClick={handleSubmit}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? "Mengupload..." : "Kirim"}
        </Button>
      </div>
    </Modal>
  );
};

export default UploadPaymentModal;
