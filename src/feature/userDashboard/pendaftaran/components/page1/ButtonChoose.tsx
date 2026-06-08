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
      className={`w-full max-w-xs md:max-w-sm py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
        isActive
          ? "bg-gradient-to-r from-darker-blue to-dark-hover-blue border-[0.5px] border-transparent"
          : "border-[0.5px] border-light-blue bg-light-active-green/20"
      }`}
    >
      <span className="font-changa font-bold text-base md:text-lg text-light-blue">
        {title}
      </span>
    </button>
  );
};

export default ButtonChoose;
