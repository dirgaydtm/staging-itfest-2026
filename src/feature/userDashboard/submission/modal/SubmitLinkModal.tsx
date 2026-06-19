"use client";

import Modal from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { useSubmitLink } from "../../hooks/useSubmitLink";

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
          Kirim Link Submission
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
        <p className="text-xs font-normal text-yellow-300 opacity-70 text-left flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Reminder: Link tidak boleh mengandung spasi
        </p>
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
