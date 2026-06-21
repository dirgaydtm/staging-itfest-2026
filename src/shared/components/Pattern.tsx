import Image from "next/image";
import React from "react";
import pattern from "@/assets/img/background/bg1.webp";

const Pattern = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none comingsoonpattern">
      <Image
        alt="pattern"
        src={pattern}
        className="w-full h-full object-cover animate-pulse mix-blend-screen opacity-40"
        draggable={false}
        priority
      />
    </div>
  );
};

export default Pattern;