// components/modal/SubmitLinkModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/Button";

interface SubmitLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string) => void;
}

const SubmitLinkModal = ({ isOpen, onClose, onSubmit }: SubmitLinkModalProps) => {
  const [link, setLink] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!link.trim()) return;
    onSubmit(link.trim());
    setLink("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="backdrop-blur-2xs bg-blue-500 border-2 border-purple-300 rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 text-center">
          Kirim Link Bukti Pembayaran
        </h2>

        <p className="text-sm text-white opacity-70 mb-2 text-center">
          Link bisa dari Google Drive, pastikan public access.
        </p>

        <input
          type="text"
          placeholder="Link Google Drive"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full px-4 py-2 rounded-md mb-4 bg-white text-sm focus:outline-none"
        />

        <div className="flex justify-center gap-2">
          <Button variant="primary" size="small" onClick={handleSubmit}>
            Kirim
          </Button>
          <Button variant="secondary" size="small" onClick={onClose}>
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitLinkModal;
