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
        className="font-leaguespartan font-bold text-sm md:text-base text-light-blue mb-1.5"
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
        className="w-full h-11 px-4 rounded-[12px] bg-[#F0F5F8] text-darker-blue placeholder:text-darker-blue/50 font-leaguespartan text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light-blue/50"
      />
    </div>
  );
};

export default FormInput;