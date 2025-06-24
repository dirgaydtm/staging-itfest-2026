import React from "react";

interface ChooseLombaProps {
  title?: string;
}

const ButtonChoose = ({title} : ChooseLombaProps) => {
  return (
    <div className="w-full border-2 py-2 border-purple-300 active:bg-purple-300 transition-all duration-300 rounded-xl text-center ">
      <h5 className="font-changa font-bold text-[#C3B8EA]">{title}</h5>
    </div>
  );
};

export default ButtonChoose;
