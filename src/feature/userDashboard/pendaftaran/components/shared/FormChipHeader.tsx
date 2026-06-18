"use client";

import React from "react";

interface FormChipHeaderProps {
  title: string;
}

const FormChipHeader: React.FC<FormChipHeaderProps> = ({ title }) => {
  return (
    <div className="w-full text-center py-3 px-4 rounded-xl border-[0.5px] border-light-blue bg-light-active-green/50">
      <span className="font-leaguespartan font-bold text-base md:text-lg text-light-green">
        {title}
      </span>
    </div>
  );
};

export default FormChipHeader;