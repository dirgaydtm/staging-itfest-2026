"use client";

import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { useSubmitLink } from "../../../hooks/useSubmitLink";

interface SubmitLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string) => void;
  isLoading?: boolean;
}

const SubmitLinkModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: SubmitLinkModalProps) => {
  const { link, error, handleLinkChange, handleSubmit, isDisabled } =
    useSubmitLink(onSubmit);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="font-changa">
        <h2 className="text-white text-xl font-semibold text-center mb-4">
          Kirim Link Bukti Pembayaran
        </h2>
        <p className="text-white text-xs text-center font-normal mb-12 opacity-70">
          Link tidak bisa dirubah setelah dikirim
        </p>

        <label className="text-start">
          <p className="text-xs font-normal opacity-70 mb-2">
            Link (Google Drive, pastikan public access)
          </p>
          <input
            type="url"
            placeholder="Link Google Drive"
            value={link}
            onChange={handleLinkChange}
            className={`w-full px-4 py-2 rounded-lg bg-white text-black placeholder-gray-400 focus:outline ${
              error
                ? "border focus:ring focus:ring-red-500"
                : "focus:ring focus:ring-purple-200"
            } transition mb-2`}
          />
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
        </label>

        <Button
          variant="primary"
          size="small"
          className="w-full h-12 mt-4"
          onClick={handleSubmit}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? "Mengirim..." : "Kirim"}
        </Button>
      </div>
    </Modal>
  );
};

export default SubmitLinkModal;
