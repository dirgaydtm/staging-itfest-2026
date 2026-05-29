"use client";
import { useState, useEffect } from "react";

const useScroll = (threshold: number = 20) => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > threshold);
    };

    // Set initial value
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isScroll };
};

export default useScroll;
