"use client";

import React from "react";
import Image from "next/image";
import UnionLeft from "@/assets/img/auth/unionLeft.png";
import UnionRight from "@/assets/img/auth/unionRight.png";
import Ellipse2 from "@/assets/img/landing/Ellipse2.svg";
import BackgroundSparkles from "./BackgroundSparkles";

const RegistrationBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Desktop (lg+): sparkle bintang kiri & kanan */}
      <div className="hidden lg:block">
        <BackgroundSparkles />
      </div>

      {/* Tablet & Mobile: union assets — kanan-atas & kiri-bawah */}
      <Image
        src={UnionRight}
        alt=""
        aria-hidden
        priority
        className="lg:hidden absolute right-0 top-20 sm:top-24 w-24 sm:w-32 md:w-44 opacity-80 select-none"
      />
      <Image
        src={UnionLeft}
        alt=""
        aria-hidden
        priority
        className="lg:hidden absolute left-0 bottom-24 sm:bottom-28 w-24 sm:w-32 md:w-44 opacity-80 select-none"
      />

      {/* Semua mode: setengah ellipse cahaya di bawah (reuse Ellipse2 dari halaman Prize) */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-full flex justify-center select-none">
        <Image
          src={Ellipse2}
          alt=""
          aria-hidden
          priority
          draggable={false}
          className="w-[140%] sm:w-[120%] md:w-[110%] lg:w-[100%] xl:scale-110 max-w-none opacity-90"
        />
      </div>
    </div>
  );
};

export default RegistrationBackground;