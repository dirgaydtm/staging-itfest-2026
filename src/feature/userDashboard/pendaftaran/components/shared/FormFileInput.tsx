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
      <label className="font-leaguespartan font-semibold text-sm text-slate-200 mb-1.5 tracking-wide">
        {label}
      </label>

      <button
        type="button"
        onClick={handleClick}
        className="w-full h-11 px-4 rounded-xl bg-slate-950/30 border border-white/10 backdrop-blur-md flex items-center justify-between font-leaguespartan text-sm md:text-base text-white transition-all duration-300 hover:bg-slate-950/40 hover:border-white/20 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
      >
        <span className={file ? "truncate" : "text-slate-400"}>
          {file ? file.name : placeholder}
        </span>
        <Folder className="w-5 h-5 text-slate-300 shrink-0" />
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