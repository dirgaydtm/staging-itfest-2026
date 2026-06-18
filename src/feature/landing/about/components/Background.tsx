"use client";

import Union from "@/assets/img/landing/Union.svg";
import Image from "next/image";
import { motion } from "framer-motion";

export const Background = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[5%] z-0"
      >
        <Image src={Union} alt="Flower" className="w-32 h-32 blur-sm" priority/>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[0%] left-[0%] z-0"
      >
        <Image src={Union} alt="Flower" className="w-48 h-48 blur-sm" priority/>
      </motion.div>
    </div>
  );
};
