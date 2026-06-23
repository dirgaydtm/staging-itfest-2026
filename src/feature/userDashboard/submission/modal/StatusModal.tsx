"use client";

import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSubmissionStatus } from "../../hooks/useSubmissionStatus";

interface SubmissionStatusModalProps {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
  timeout?: number;
}

const StatusModal = ({
  isOpen,
  isSuccess,
  onClose,
  timeout,
}: SubmissionStatusModalProps) => {
  const { handleClose } = useSubmissionStatus({ isOpen, timeout, onClose });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center font-changa p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          {isSuccess ? (
            <CheckCircle2 size={90} className="text-green-400 stroke-1" />
          ) : (
            <XCircle size={90} className="text-red-400 stroke-1" />
          )}
        </motion.div>

        <h2 className="text-white text-2xl font-bold mb-2">
          {isSuccess ? "Sukses!" : "Gagal!"}
        </h2>

        <p className="text-sm text-white opacity-80 mb-6 leading-relaxed">
          {isSuccess
            ? `Pengisian berhasil. Silahkan hubungi kami di grup WhatsApp IT FEST apabila ada kendala.`
            : "Pengisian gagal. Silakan periksa koneksi atau ulangi lagi nanti."}
        </p>

        <Button variant="tertiary" className="w-full" onClick={handleClose}>
          Kembali
        </Button>
      </div>
    </Modal>
  );
};

export default StatusModal;
