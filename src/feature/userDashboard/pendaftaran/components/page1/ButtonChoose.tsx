"use client";

import React from "react";

interface ButtonChooseProps {
  title?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ButtonChoose: React.FC<ButtonChooseProps> = ({
  title,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full max-w-xs md:max-w-sm py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 active:scale-95 ${
        isActive
          ? "border-cyan-400/80 bg-white/15 shadow-[0_0_20px_rgba(34,211,238,0.25),inset_0_1px_2px_rgba(255,255,255,0.2)] scale-[1.02]"
          : "border-white/10 bg-slate-950/20 hover:bg-white/5 hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:scale-[1.02]"
      }`}
    >
      <span
        className={`font-leaguespartan font-medium text-sm md:text-base tracking-wide transition-colors ${
          isActive ? "text-cyan-300" : "text-slate-300"
        }`}
      >
        {title}
      </span>
    </button>
  );
};

export default ButtonChoose;