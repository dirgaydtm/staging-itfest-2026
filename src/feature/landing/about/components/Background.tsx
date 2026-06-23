"use client";

import Union from "@/assets/img/landing/Union.svg";
import Image from "next/image";

export const Background = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
      <div
        className="absolute top-[5%] right-[5%] z-0"
        style={{ animation: "float-sway 6s ease-in-out infinite", willChange: "transform" }}
      >
        <Image src={Union} alt="Flower" className="w-32 h-32 blur-sm" priority />
      </div>

      <div
        className="absolute bottom-[0%] left-[0%] z-0"
        style={{ animation: "float-sway 7s ease-in-out infinite 1s", willChange: "transform" }}
      >
        <Image src={Union} alt="Flower" className="w-48 h-48 blur-sm" priority />
      </div>
    </div>
  );
};
