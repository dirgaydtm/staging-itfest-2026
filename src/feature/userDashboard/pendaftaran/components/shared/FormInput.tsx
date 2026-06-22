"use client";

import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  maxLength,
  inputMode,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className="font-leaguespartan font-semibold text-sm text-slate-200 mb-1.5 tracking-wide"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        inputMode={inputMode}
        className="w-full h-11 px-4 rounded-xl bg-slate-950/30 border border-white/10 text-white placeholder:text-slate-400 font-leaguespartan text-sm md:text-base backdrop-blur-md transition-all duration-300 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
};

export default FormInput;