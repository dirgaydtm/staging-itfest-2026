"use client";

import React, { useRef } from "react";
import { Folder } from "lucide-react";

interface FormFileInputProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  placeholder?: string;
  accept?: string;
}

const FormFileInput: React.FC<FormFileInputProps> = ({
  label,
  file,
  onFileChange,
  placeholder = "Upload Here",
  accept,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileChange(selected);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="font-leaguespartan font-bold text-sm md:text-base text-light-blue mb-1.5">
        {label}
      </label>

      <button
        type="button"
        onClick={handleClick}
        className="w-full h-11 px-4 rounded-[12px] bg-[#F0F5F8] flex items-center justify-between font-leaguespartan text-sm md:text-base text-darker-blue focus:outline-none focus:ring-2 focus:ring-light-blue/50"
      >
        <span className={file ? "truncate" : "text-darker-blue/50"}>
          {file ? file.name : placeholder}
        </span>
        <Folder className="w-5 h-5 text-darker-blue shrink-0" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default FormFileInput;