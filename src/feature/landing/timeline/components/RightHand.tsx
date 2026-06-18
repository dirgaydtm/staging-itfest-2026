"use client";

import Image from "next/image";
import RightHandImg from "@/assets/img/landing/rightHand.webp";
import { motion } from "framer-motion";

const RightHand = () => {
  return (
    <motion.div
      variants={{
        hidden: { x: "50vw", rotate: 20 },
        visible: {
          x: 0,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 50,
            damping: 15,
            duration: 1.5,
            delay: 0.2,
          },
        },
      }}
      className="absolute right-[-10%] md:right-[0%] top-[60%] md:top-1/2 w-48 sm:w-72 md:w-96 lg:w-150 z-0 pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -3, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Image
          src={RightHandImg}
          alt="Right Hand"
          className="w-full h-auto object-contain opacity-70 md:opacity-90"
        />
      </motion.div>
    </motion.div>
  );
};

export default RightHand;
