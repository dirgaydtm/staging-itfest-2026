"use client";

import React from "react";
import Image from "next/image";
import Sparkle from "@/assets/img/shared/sparkle.webp";

const BackgroundSparkles: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <Image
        src={Sparkle}
        alt=""
        aria-hidden
        priority
        className="absolute -left-10 top-1/2 -translate-y-1/2 h-auto opacity-90 scale-x-[-1]
                   w-[220px] sm:w-[300px] md:w-[400px] lg:w-[480px] xl:w-[560px]"
      />
      <Image
        src={Sparkle}
        alt=""
        aria-hidden
        priority
        className="absolute -right-10 top-1/2 -translate-y-1/2 h-auto opacity-90
                   w-[220px] sm:w-[300px] md:w-[400px] lg:w-[480px] xl:w-[560px]"
      />
    </div>
  );
};

export default BackgroundSparkles;