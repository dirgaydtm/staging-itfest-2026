"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Rocket from "@/assets/img/landing/rocket.webp";
import { motion, Variants } from "framer-motion";

const rocketVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: (delay: number) => ({
    y: [100, 0, 0, 0, 0, 0, -1500],
    x: [0, 0, -5, 5, -5, 0, 0],
    opacity: [0, 1, 1, 1, 1, 1, 1],
    transition: {
      duration: 3,
      delay,
      times: [0, 0.1, 0.15, 0.2, 0.25, 0.3, 1],
      ease: "easeIn",
    },
  }),
};

const COLORS = ["bg-orange-500", "bg-yellow-400", "bg-red-500"];

const RocketAnimation = ({ className, delay = 0 }: { className: string; delay?: number }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        scale: Math.random() + 5,
        x: (Math.random() - 0.5) * 60,
        y: Math.random() * 80 + 30,
        duration: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 0.5,
      }))
    );
  }, []);

  return (
    <motion.div
      custom={delay}
      variants={rocketVariants}
      className={`absolute bottom-[5%] flex flex-col items-center pointer-events-none z-20 ${className}`}
    >
      <Image
        src={Rocket}
        alt="Rocket"
        className="w-32 md:w-48 lg:w-72 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,165,0,0.4)]"
      />
      {/* Particles Engine */}
      <div className="relative w-full h-32 -mt-6 md:-mt-8 lg:-mt-12 flex justify-center">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: p.scale, y: 0, x: 0 }}
            animate={{ opacity: 0, scale: 0, y: p.y, x: p.x }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            className={`absolute top-0 w-3 h-3 md:w-4 md:h-4 rounded-full blur-[2px] ${p.color}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default RocketAnimation;
