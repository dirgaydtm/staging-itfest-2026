"use client";
import PrizeCount from "./PrizeCount";
import RocketAnimation from "./RocketAnimation";
import { motion } from "framer-motion";
import Image from "next/image";
import eclipse2 from "@/assets/img/landing/Ellipse2.svg";

export default function Prize() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="relative grid place-items-center min-h-[70vh] lg:min-h-[125vh] w-full"
    >
      {/* Rockets */}
      <RocketAnimation className="left-0 md:left-[10%] lg:left-[15%]" />
      <RocketAnimation className="right-0 md:right-[10%] lg:right-[15%]" />

      <div className="mycontainer relative z-10 gap-4 md:gap-8 flex flex-col items-center justify-center pb-20">
        <Image
          src={eclipse2}
          alt="just fucking circle, i hate this project, so many assets"
          className="absolute scale-150 select-none z-0"
          draggable={false}
          priority
        />
        <h4 className="text-center z-10 font-anton font-normal text-4xl lg:text-[48px] leading-[115%] tracking-[-0.48px] text-white uppercase mb-2 md:mb-4">
          SPECIAL PRIZE
        </h4>
        <PrizeCount />
      </div>
    </motion.div>
  );
}
