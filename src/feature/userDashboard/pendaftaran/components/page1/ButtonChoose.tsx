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
  const activeStyle: React.CSSProperties = {
    borderRadius: "12px",
    background: "linear-gradient(90deg, #243642 0%, #3D5D71 100%)",
    border: "0.5px solid transparent",
  };

  const inactiveStyle: React.CSSProperties = {
    borderRadius: "12px",
    border: "0.5px solid #F0F5F8",
    background: "rgba(176, 191, 199, 0.20)",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full max-w-xs md:max-w-sm py-3 transition-all duration-300 hover:scale-[1.02] active:scale-95"
      style={isActive ? activeStyle : inactiveStyle}
    >
      <span
        className="font-changa font-bold text-base md:text-lg"
        style={{ color: "#F0F5F8" }}
      >
        {title}
      </span>
    </button>
  );
};

export default ButtonChoose;