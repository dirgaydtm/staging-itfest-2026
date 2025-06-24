import React from "react";

interface ButtonChooseProps {
  title?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ButtonChoose: React.FC<ButtonChooseProps> = ({ 
  title, 
  isActive = false, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full border-2 py-2 rounded-xl text-center transition-all duration-300 cursor-pointer hover:scale-105 ${
        isActive
          ? "bg-purple-300 border-purple-300 text-white shadow-lg"
          : "border-purple-300 bg-transparent hover:bg-purple-300/20"
      }`}
    >
      <h5 className={`font-changa font-bold ${
        isActive ? "text-white" : "text-[#C3B8EA]"
      }`}>
        {title}
      </h5>
    </button>
  );
};

export default ButtonChoose;