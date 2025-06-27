"use client";
import React from "react";
import { motion } from "framer-motion";
import Stars from "@/feature/hero/components/Stars";
import Planets from "@/assets/img/planets.svg";
import Image from "next/image";
import Mobil from "@/assets/img/mobil.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-gradient-to-b from-slate-900 to-indigo-900 relative min-h-screen">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars component dengan z-index rendah */}
      <div className="absolute inset-0 z-0">
        <Stars />
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="relative w-[380px] h-[280px] md:w-[480px] md:h-[360px] will-change-transform"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 0.5, -0.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[160%] z-50 will-change-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h1
              className="text-[60px] md:text-[100px] font-extrabold text-white font-mono select-none pointer-events-none"
              style={{
                textShadow: `
                  0 0 8px #00ffff,
                  0 0 16px #00cccc`,
              }}
            >
              404
            </h1>
          </motion.div>

          <Image
            src={Planets}
            alt="Floating Planets"
            className="pointer-events-none select-none"
            priority
          />

          {/* Subtitle */}
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-40"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span
              className="text-sm md:text-base font-mono text-cyan-300 tracking-widest"
              style={{
                textShadow: `
                  0 0 4px #00ffff,
                  0 0 8px #00cccc`,
              }}
            >
              planet not found
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Link component dengan z-index tinggi dan positioning yang diperbaiki */}
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 2,
          duration: 1.5,
          type: "spring",
          stiffness: 60,
          damping: 12,
        }}
        className="fixed bottom-6 sm:bottom-10 right-6 sm:right-1/4 z-[9999] flex flex-col items-center will-change-transform"
      >
        <Link href="/home" className="block cursor-pointer">
          {/* Mobil animasi loop */}
          <motion.div
            className="will-change-transform"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={Mobil}
              alt="Go Home"
              className="w-16 sm:w-20 md:w-28 drop-shadow-[0_0_6px_#00ffff] hover:drop-shadow-[0_0_12px_#00ffff] transition-all duration-300"
              priority
            />
          </motion.div>

          {/* Hologram teks: animasi sekali saat masuk */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.6, ease: "easeOut" }}
            className="relative mt-2 sm:mt-3 text-center bg-black/10 px-4 py-2 sm:p-4 rounded backdrop-blur-sm max-w-[90vw] sm:max-w-xs hover:bg-black/20 transition-all duration-300"
          >
            <p className="text-cyan-200 text-xs sm:text-sm font-mono tracking-wide select-none pointer-events-none">
              you are lost
            </p>
            <p className="text-cyan-300 font-semibold text-xs sm:text-sm font-mono tracking-wide select-none pointer-events-none">
              let&apos;s go home →
            </p>
          </motion.div>
        </Link>
      </motion.div>
    </main>
  );
}
