"use client";

import React from "react";

interface FormChipHeaderProps {
  title: string;
}

const FormChipHeader: React.FC<FormChipHeaderProps> = ({ title }) => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 py-2.5 px-6 rounded-xl text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
      <span className="text-sm lg:text-base font-bold tracking-widest font-leaguespartan text-slate-200">
        {title}
      </span>
    </div>
  );
};

export default FormChipHeader;