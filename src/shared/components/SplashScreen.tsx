"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoITFest from "@/assets/img/shared/logoITFest.png";
import FloatSway from "@/shared/animations/FloatSway";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasShown = sessionStorage.getItem("splashShown");

    if (hasShown) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem("splashShown", "true");

      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash-screen"
          initial={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{
            clipPath: "circle(0% at 100% 0%)",
            transition: { duration: 1.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-9999 bg-dark-active-green flex flex-col items-center justify-center shadow-2xl overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100vw", y: "100vh", scale: 0.5, opacity: 0 }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            }}
            exit={{
              x: "100vw",
              y: "-100vh",
              scale: 0.8,
              opacity: 0,
              transition: { duration: 1.5, ease: "easeIn" },
            }}
            transition={{
              duration: 3,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute flex flex-col items-center justify-center scale-150"
          >
            <FloatSway duration={3.5}>
              <Image
                src={logoITFest}
                alt="IT FEST Logo"
                className="w-64"
                priority
              />
            </FloatSway>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
