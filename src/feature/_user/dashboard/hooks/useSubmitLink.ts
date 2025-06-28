import { useState } from "react";

export const useSubmitLink = (onSubmit: (link: string) => void) => {
  const [link, setLink] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateGoogleDriveLink = (url: string): boolean => {
    const driveRegex =
      /^(https?:\/\/)?(drive\.google\.com\/(file\/d\/|open\?id=|folderview\?id=|drive\/folders\/))[a-zA-Z0-9_-]+(\/view(\?usp=[a-zA-Z_]+)?)?$/;
    return driveRegex.test(url);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value;
    setLink(newLink);

    if (newLink.trim() === "") {
      setError("Link tidak boleh kosong.");
    } else if (!validateGoogleDriveLink(newLink)) {
      setError("Link harus berupa tautan Google Drive yang valid.");
    } else {
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (link.trim() === "") {
      setError("Link tidak boleh kosong.");
      return;
    }

    if (!validateGoogleDriveLink(link)) {
      setError("Link harus berupa tautan Google Drive yang valid.");
      return;
    }

    setError(null);
    onSubmit(link);
    setLink("");
  };

  return {
    link,
    error,
    handleLinkChange,
    handleSubmit,
    isDisabled: !link.trim() || !!error,
  };
};
