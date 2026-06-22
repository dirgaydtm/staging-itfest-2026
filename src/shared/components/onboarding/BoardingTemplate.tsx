// "use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Star from "@/assets/img/onboarding/star.webp";
import Bg from "@/assets/img/background/bg1.webp";

interface BoardingTemplateProps {
  children: React.ReactNode;
}

const slideInLeft: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.8, ease: "easeOut", delay: 0.1 },
  },
};

const slideInRight: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

const fadeInUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "tween", duration: 0.6, ease: "easeOut", delay: 0.8 },
  },
};

const starBreathing: Variants = {
  animate: {
    filter: [
      "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
      "drop-shadow(0 0 25px rgba(255, 255, 255, 0.85))",
      "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
    ],
    scale: [1, 1.04, 1],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const bgGlow: Variants = {
  animate: {
    opacity: [0.75, 1, 0.85, 1, 0.75],
    filter: [
      "brightness(0.9) contrast(1)",
      "brightness(1.1) contrast(1.05)",
      "brightness(0.95) contrast(1)",
      "brightness(1.1) contrast(1.05)",
      "brightness(0.9) contrast(1)",
    ],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const BoardingTemplate: React.FC<BoardingTemplateProps> = ({ children }) => {
  return (
    <section className="bg-darker-blue relative min-h-screen z-0 overflow-x-hidden flex items-center justify-center py-6 lg:py-10">
      <motion.img
        variants={bgGlow}
        animate="animate"
        src={Bg.src}
        className="absolute inset-0 w-full h-full object-cover -z-10"
        draggable={false}
      />

      <div className="mycontainer px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch justify-center relative z-10 w-full max-w-5xl mx-auto">

        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="w-full lg:flex-1 relative overflow-hidden
                     rounded-2xl border-2 border-white/10
                     shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)] lg:shadow-[-4px_0_24px_-4px_rgba(0,0,0,0.4),_0_8px_24px_-4px_rgba(0,0,0,0.3)]
                     flex items-center justify-center p-5 sm:p-6
                     min-h-[360px] sm:min-h-[420px] lg:min-h-0 lg:max-h-[600px]"
        >
          <div className="absolute inset-0 bg-light-active-green/5 backdrop-blur-xl z-0" />
          <div className="w-full h-full relative z-10 flex items-center justify-center">
            {children}
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex lg:flex-1 relative overflow-hidden
                     rounded-2xl border-2 border-white/10
                     flex-col items-center justify-center gap-4 p-6
                     lg:max-h-[600px]
                     shadow-[4px_0_24px_-4px_rgba(0,0,0,0.4),_0_8px_24px_-4px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute inset-0 bg-light-active-green/5 backdrop-blur-xl z-0" />

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full gap-6">
            <motion.div
              variants={starBreathing}
              animate="animate"
              className="flex items-center justify-center"
            >
              <Image
                className="w-28 sm:w-32 lg:w-36 xl:w-44 2xl:w-52 h-auto"
                width={300}
                height={300}
                alt="star center"
                src={Star}
                draggable={false}
                priority
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="space-y-1 lg:space-y-2 text-center px-4"
            >
              <h2 className="text-lg lg:text-xl xl:text-2xl font-bold font-leaguespartan text-white tracking-wide drop-shadow-md">
                Welcome to ITFEST!
              </h2>
              <p className="text-xs lg:text-sm xl:text-base font-leaguespartan leading-relaxed text-slate-200">
                Compete, Collaborate, and Win <br /> Together!
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BoardingTemplate;