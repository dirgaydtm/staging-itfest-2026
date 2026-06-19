"use client";

import Image from "next/image";
import LeftHandImg from "@/assets/img/landing/leftHand.webp";
import { motion } from "framer-motion";

const LeftHand = () => {
  return (
    <motion.div
      variants={{
        hidden: { x: "-50vw", rotate: -20 },
        visible: {
          x: 0,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 50,
            damping: 15,
            duration: 1.5,
          },
        },
      }}
      className="absolute left-[-10%] md:left-[0%] top-[15%] md:top-0 w-48 sm:w-72 md:w-96 lg:w-xl z-0 pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={LeftHandImg}
          alt="Left Hand"
          className="w-full h-auto object-contain opacity-70 md:opacity-90"
        />
      </motion.div>
    </motion.div>
  );
};

export default LeftHand;
